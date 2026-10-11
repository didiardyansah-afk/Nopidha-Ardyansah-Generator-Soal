import { QuestionItem } from '../types';

/**
 * Universal Image & SVG Export Utility
 * Converts SVG strings, DOM SVGs, and image data into high-resolution PNG data URLs.
 * Guarantees crisp output for PDF downloads, printing, and Word document export.
 */

export interface ConvertedImageData {
  pngUrl: string;
  width: number;
  height: number;
  aspect: number;
}

/**
 * Converts any SVG string or raster URL into a sharp PNG Data URL.
 */
export async function convertSvgOrImageToPng(
  svgOrUrl: string,
  targetWidth = 500,
  targetHeight = 250
): Promise<ConvertedImageData | null> {
  if (!svgOrUrl || typeof svgOrUrl !== 'string') return null;
  const trimmed = svgOrUrl.trim();

  // 1. If already a raster data URL (PNG, JPEG, WebP)
  if (
    trimmed.startsWith('data:image/png') ||
    trimmed.startsWith('data:image/jpeg') ||
    trimmed.startsWith('data:image/webp')
  ) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth || targetWidth;
        const h = img.naturalHeight || targetHeight;
        resolve({
          pngUrl: trimmed,
          width: w,
          height: h,
          aspect: w / (h || 1),
        });
      };
      img.onerror = () => {
        resolve({
          pngUrl: trimmed,
          width: targetWidth,
          height: targetHeight,
          aspect: targetWidth / targetHeight,
        });
      };
      img.src = trimmed;
    });
  }

  // 2. If HTTP/HTTPS URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const w = img.naturalWidth || targetWidth;
          const h = img.naturalHeight || targetHeight;
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            resolve({
              pngUrl: canvas.toDataURL('image/png'),
              width: w,
              height: h,
              aspect: w / (h || 1),
            });
            return;
          }
        } catch (e) {
          console.warn('Canvas rasterize error:', e);
        }
        resolve(null);
      };
      img.onerror = () => resolve(null);
      img.src = trimmed;
    });
  }

  // 3. SVG String processing
  return new Promise((resolve) => {
    try {
      let cleanSvg = trimmed;

      // Extract viewBox dimensions
      const vbMatch = cleanSvg.match(
        /viewBox\s*=\s*["']\s*([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s*["']/i
      );
      let intrinsicW = targetWidth;
      let intrinsicH = targetHeight;
      if (vbMatch) {
        intrinsicW = parseFloat(vbMatch[3]) || targetWidth;
        intrinsicH = parseFloat(vbMatch[4]) || targetHeight;
      }

      // Ensure xmlns
      if (!cleanSvg.includes('xmlns=')) {
        cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      // Ensure explicit width and height attributes in root <svg>
      if (!cleanSvg.match(/<svg[^>]*\bwidth\s*=/i)) {
        cleanSvg = cleanSvg.replace('<svg', `<svg width="${intrinsicW}" height="${intrinsicH}"`);
      } else {
        cleanSvg = cleanSvg.replace(/(<svg[^>]*)\bwidth=["'][^"']*["']/i, `$1 width="${intrinsicW}"`);
        cleanSvg = cleanSvg.replace(/(<svg[^>]*)\bheight=["'][^"']*["']/i, `$1 height="${intrinsicH}"`);
      }

      // Inject solid background rect if not present to avoid transparent/black artifacts in PDF
      const svgTagEnd = cleanSvg.indexOf('>');
      if (svgTagEnd !== -1) {
        const bgRect = `<rect width="100%" height="100%" fill="#ffffff" fill-opacity="1"/>`;
        cleanSvg = cleanSvg.slice(0, svgTagEnd + 1) + bgRect + cleanSvg.slice(svgTagEnd + 1);
      }

      // Encode as Base64 Data URI for instant browser rendering
      const base64Svg =
        'data:image/svg+xml;base64,' +
        btoa(unescape(encodeURIComponent(cleanSvg)));

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          // Scale 2x for high DPI print clarity
          const canvasW = Math.round(intrinsicW * 2);
          const canvasH = Math.round(intrinsicH * 2);
          canvas.width = canvasW;
          canvas.height = canvasH;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvasW, canvasH);
            ctx.drawImage(img, 0, 0, canvasW, canvasH);
            const pngData = canvas.toDataURL('image/png', 0.95);
            resolve({
              pngUrl: pngData,
              width: intrinsicW,
              height: intrinsicH,
              aspect: intrinsicW / (intrinsicH || 1),
            });
            return;
          }
        } catch (canvasErr) {
          console.warn('Canvas export failed:', canvasErr);
        }
        resolve({
          pngUrl: base64Svg,
          width: intrinsicW,
          height: intrinsicH,
          aspect: intrinsicW / (intrinsicH || 1),
        });
      };

      img.onerror = () => {
        // Fallback using Blob URL
        try {
          const blob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
          const blobUrl = URL.createObjectURL(blob);
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = intrinsicW * 2;
            canvas.height = intrinsicH * 2;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(fallbackImg, 0, 0, canvas.width, canvas.height);
              URL.revokeObjectURL(blobUrl);
              resolve({
                pngUrl: canvas.toDataURL('image/png'),
                width: intrinsicW,
                height: intrinsicH,
                aspect: intrinsicW / (intrinsicH || 1),
              });
              return;
            }
            URL.revokeObjectURL(blobUrl);
            resolve(null);
          };
          fallbackImg.onerror = () => {
            URL.revokeObjectURL(blobUrl);
            resolve(null);
          };
          fallbackImg.src = blobUrl;
        } catch {
          resolve(null);
        }
      };

      img.src = base64Svg;
    } catch (e) {
      console.warn('convertSvgOrImageToPng error:', e);
      resolve(null);
    }
  });
}

/**
 * Retrieves the image for a QuestionItem, checking live DOM first then question fields.
 */
export async function getQuestionImagePng(q: QuestionItem): Promise<ConvertedImageData | null> {
  // 1. If user uploaded custom image
  if (q.gambarUrl) {
    const res = await convertSvgOrImageToPng(q.gambarUrl);
    if (res) return res;
  }

  // 2. If question has SVG string
  if (q.gambarSvg) {
    // Check if element is mounted in DOM for exact dimensions
    const domSvg = typeof document !== 'undefined'
      ? document.querySelector(`[data-question-id="${q.id}"] svg`)
      : null;

    let svgSource = q.gambarSvg;
    let width = 400;
    let height = 220;

    if (domSvg) {
      try {
        const rect = domSvg.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          width = Math.round(rect.width);
          height = Math.round(rect.height);
        }
        svgSource = new XMLSerializer().serializeToString(domSvg);
      } catch {
        // use q.gambarSvg
      }
    } else {
      const vbMatch = q.gambarSvg.match(
        /viewBox\s*=\s*["']\s*([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s*["']/i
      );
      if (vbMatch) {
        width = parseFloat(vbMatch[3]) || 400;
        height = parseFloat(vbMatch[4]) || 220;
      }
    }

    const res = await convertSvgOrImageToPng(svgSource, width, height);
    if (res) return res;
  }

  return null;
}
