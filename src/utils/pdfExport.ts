import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Convert OKLCH to sRGB mathematically
export function oklchToRgb(l: number, c: number, h: number): string {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const rLinear = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const gLinear = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLinear = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  const toSRGB = (cVal: number) => {
    const clamped = Math.max(0, Math.min(1, cVal));
    return clamped <= 0.0031308
      ? Math.round(clamped * 12.92 * 255)
      : Math.round((1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255);
  };

  return `rgb(${toSRGB(rLinear)}, ${toSRGB(gLinear)}, ${toSRGB(bLinear)})`;
}

// Convert any CSS color string to standard sRGB format
export function safeColorToRgb(colorStr: string): string {
  if (!colorStr || colorStr === 'transparent' || colorStr === 'inherit') {
    return colorStr;
  }

  if (!colorStr.includes('oklch') && !colorStr.includes('color(')) {
    return colorStr;
  }

  // 1. Try native canvas context
  if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillStyle = colorStr;
        const res = ctx.fillStyle;
        if (res && !res.includes('oklch') && !res.includes('color(')) {
          return res;
        }
      }
    } catch {
      // fallback
    }
  }

  // 2. Math fallback
  const match = colorStr.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/);
  if (match) {
    let l = parseFloat(match[1]);
    if (match[1].endsWith('%')) l = l / 100;
    const c = parseFloat(match[2]);
    const h = parseFloat(match[3]);
    const alpha = match[4] ? (match[4].endsWith('%') ? parseFloat(match[4]) / 100 : parseFloat(match[4])) : 1;

    const rgb = oklchToRgb(l, c, h);
    if (alpha < 1) {
      return rgb.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
    }
    return rgb;
  }

  return 'rgb(15, 23, 42)';
}

// Creates a Proxy on getComputedStyle to safely convert modern color formats
function createStyleProxy(realGetComputedStyle: typeof window.getComputedStyle, targetWindow: Window = window) {
  return function (elt: Element, pseudoElt?: string | null): CSSStyleDeclaration {
    const originalStyle = realGetComputedStyle.call(targetWindow, elt, pseudoElt);
    return new Proxy(originalStyle, {
      get(target, prop, receiver) {
        if (prop === 'getPropertyValue') {
          return function (propName: string) {
            const val = target.getPropertyValue(propName);
            if (typeof val === 'string' && (val.includes('oklch') || val.includes('color('))) {
              return safeColorToRgb(val);
            }
            return val;
          };
        }
        const val = Reflect.get(target, prop, receiver);
        if (typeof val === 'function') {
          return val.bind(target);
        }
        if (typeof val === 'string' && (val.includes('oklch') || val.includes('color('))) {
          return safeColorToRgb(val);
        }
        return val;
      },
    });
  };
}

// Sanitize cloned document before html2canvas processes it
export function sanitizeClonedDocumentForHtml2Canvas(
  clonedDoc: Document,
  origElement: HTMLElement,
  clonedElement: HTMLElement
) {
  // 1. Sanitize all <style> tags in the cloned document
  const styleNodes = clonedDoc.querySelectorAll('style');
  styleNodes.forEach((styleTag) => {
    if (styleTag.textContent && (styleTag.textContent.includes('oklch') || styleTag.textContent.includes('color('))) {
      styleTag.textContent = styleTag.textContent.replace(/oklch\([^)]+\)/g, (match) => {
        return safeColorToRgb(match);
      });
    }
  });

  // 2. Explicitly map inline RGB styles to prevent any unhandled color parsing
  const origList = [origElement, ...Array.from(origElement.querySelectorAll('*'))];
  const cloneList = [clonedElement, ...Array.from(clonedElement.querySelectorAll('*'))];

  for (let i = 0; i < origList.length && i < cloneList.length; i++) {
    const orig = origList[i] as HTMLElement;
    const clone = cloneList[i] as HTMLElement;
    if (!orig || !clone) continue;

    try {
      const computed = window.getComputedStyle(orig);

      const bg = computed.backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        clone.style.backgroundColor = safeColorToRgb(bg);
      }

      const textCol = computed.color;
      if (textCol) {
        clone.style.color = safeColorToRgb(textCol);
      }

      const bc = computed.borderColor;
      if (bc) {
        clone.style.borderColor = safeColorToRgb(bc);
      }
    } catch {
      // ignore
    }
  }
}

// Generate PDF from DOM Element safely and guarantee automated download
export async function generatePdfSafely(
  element: HTMLElement,
  documentTitle: string
): Promise<void> {
  const originalGetComputedStyle = window.getComputedStyle;

  // Intercept window.getComputedStyle during rendering
  window.getComputedStyle = createStyleProxy(originalGetComputedStyle, window) as any;

  try {
    const canvas = await html2canvas(element, {
      scale: 1.8,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      ignoreElements: (el) => el.classList.contains('no-print'),
      onclone: (clonedDoc, clonedElement) => {
        if (clonedDoc.defaultView) {
          const clonedOrigGCS = clonedDoc.defaultView.getComputedStyle;
          clonedDoc.defaultView.getComputedStyle = createStyleProxy(clonedOrigGCS, clonedDoc.defaultView) as any;
        }
        sanitizeClonedDocumentForHtml2Canvas(clonedDoc, element, clonedElement);
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add subsequent pages if content overflows A4
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    const safeFileName = `${documentTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

    // Direct Blob download to guarantee browser saves the file automatically
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = safeFileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
  } finally {
    // Restore original getComputedStyle
    window.getComputedStyle = originalGetComputedStyle;
  }
}
