/**
 * Robust Print-to-PDF Utility
 * Uses window.print() on an isolated document to ensure ONLY #printable-content
 * is rendered, with full CSS @media print styles, exact color adjustments,
 * and page-break rules applied.
 */

export interface PrintPdfOptions {
  elementId?: string;
  documentTitle?: string;
  pageSize?: 'A4' | 'Letter';
  orientation?: 'portrait' | 'landscape';
}

export function printElementToPdf(options: PrintPdfOptions = {}): Promise<void> {
  const {
    elementId = 'printable-content',
    documentTitle = 'Dokumen_Asesmen_IPA_SMP',
    pageSize = 'A4',
    orientation = 'portrait',
  } = options;

  return new Promise((resolve, reject) => {
    try {
      const sourceElement = document.getElementById(elementId);
      if (!sourceElement) {
        throw new Error(`Element with id "${elementId}" not found.`);
      }

      // Clone content and remove any elements marked with .no-print
      const clone = sourceElement.cloneNode(true) as HTMLElement;
      const noPrintElements = clone.querySelectorAll('.no-print');
      noPrintElements.forEach((el) => el.remove());

      // Create an invisible iframe for isolated printing
      const iframe = document.createElement('iframe');
      iframe.name = 'print_frame';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.zIndex = '-9999';

      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (!iframeDoc || !iframe.contentWindow) {
        document.body.removeChild(iframe);
        throw new Error('Failed to create print iframe context.');
      }

      // Set document title so browser uses it as default PDF filename when saving
      iframeDoc.title = documentTitle;

      // Extract existing stylesheets and font links from parent document
      const headLinks: string[] = [];
      const parentLinks = document.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]');
      parentLinks.forEach((link) => {
        headLinks.push(link.outerHTML);
      });

      // Construct professional print CSS that overrides background/color resets
      const printStyles = `
        <style>
          @page {
            size: ${pageSize} ${orientation};
            margin: 20mm 20mm 20mm 25mm; /* Atas 2cm, Kanan 2cm, Bawah 2cm, Kiri 2.5cm */
          }

          *, *::before, *::after {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #ffffff !important;
            color: #0f172a !important;
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            width: 100% !important;
          }

          /* Ensure high contrast and professional typography for education papers */
          h1, h2, h3, h4, h5, h6 {
            color: #020617 !important;
            font-family: 'Tinos', 'Times New Roman', serif !important;
          }

          /* Tables formatting */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 8px 0 !important;
            page-break-inside: auto !important;
          }

          th {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
            font-weight: 700 !important;
            border: 1px solid #475569 !important;
            padding: 6px 8px !important;
          }

          td {
            border: 1px solid #64748b !important;
            padding: 6px 8px !important;
          }

          tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Page break controls */
          .page-break-after {
            page-break-after: always !important;
            break-after: page !important;
          }

          .break-inside-avoid,
          .group,
          .page-break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Badges and colored boxes must keep their background colors */
          .bg-slate-50, .bg-slate-50\\/80, .bg-slate-50\\/70 {
            background-color: #f8fafc !important;
          }
          .bg-slate-100 {
            background-color: #f1f5f9 !important;
          }
          .bg-indigo-50, .bg-indigo-50\\/60, .bg-indigo-50\\/70 {
            background-color: #eef2ff !important;
          }
          .bg-emerald-50, .bg-emerald-50\\/60 {
            background-color: #ecfdf5 !important;
          }
          .bg-amber-50, .bg-amber-50\\/50 {
            background-color: #fffbeb !important;
          }
          .bg-blue-50 {
            background-color: #eff6ff !important;
          }
          .bg-rose-50 {
            background-color: #fff1f2 !important;
          }

          /* Borders */
          .border, .border-b, .border-t {
            border-color: #94a3b8 !important;
          }

          /* Hide UI artifacts */
          .no-print {
            display: none !important;
          }

          /* SVGs must scale crisply */
          svg {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        </style>
      `;

      // Build complete HTML document inside iframe
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>${documentTitle}</title>
          ${headLinks.join('\n')}
          ${printStyles}
        </head>
        <body>
          <div id="print-root">
            ${clone.innerHTML}
          </div>
        </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for resources (images, SVGs, fonts) to settle before triggering print
      const triggerPrint = () => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          resolve();
        } catch (printErr) {
          reject(printErr);
        } finally {
          // Remove iframe after print dialog completes
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 3000);
        }
      };

      // Check if images are loading
      const images = iframeDoc.querySelectorAll('img');
      if (images.length > 0) {
        let loadedCount = 0;
        images.forEach((img) => {
          if (img.complete) {
            loadedCount++;
            if (loadedCount === images.length) setTimeout(triggerPrint, 250);
          } else {
            img.onload = img.onerror = () => {
              loadedCount++;
              if (loadedCount === images.length) setTimeout(triggerPrint, 250);
            };
          }
        });
        // Safety timeout
        setTimeout(triggerPrint, 1000);
      } else {
        setTimeout(triggerPrint, 300);
      }
    } catch (err) {
      reject(err);
    }
  });
}
