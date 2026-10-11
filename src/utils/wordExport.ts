import { convertSvgOrImageToPng } from './imageExportUtils';

/**
 * Professional Microsoft Word (.doc) Export Utility
 * Guarantees A4 page size and exact official school margins:
 * - Top: 2.0 cm (56.7 pt)
 * - Bottom: 2.0 cm (56.7 pt)
 * - Left: 2.5 cm (70.9 pt - standard binding margin)
 * - Right: 2.0 cm (56.7 pt)
 * Converts all SVG diagrams to high-resolution PNG images so they render inside Word.
 */

export async function exportHtmlToWordDoc(elementId: string, documentTitle: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for Word export.`);
    return;
  }

  // Clone element and strip all interactive / non-printable elements
  const clone = element.cloneNode(true) as HTMLElement;
  const noPrintEls = clone.querySelectorAll('.no-print, button, input[type="file"], input, nav, header');
  noPrintEls.forEach((el) => el.remove());

  // Convert SVGs to PNG data URIs so Microsoft Word can render them
  const svgs = Array.from(clone.querySelectorAll('svg'));
  await Promise.all(
    svgs.map(async (svg) => {
      try {
        const svgString = new XMLSerializer().serializeToString(svg);
        const imgData = await convertSvgOrImageToPng(svgString, 500, 260);
        if (imgData && imgData.pngUrl) {
          const img = document.createElement('img');
          img.src = imgData.pngUrl;
          img.setAttribute('width', '380');
          img.setAttribute('style', 'display: block; margin: 8pt auto; max-width: 90%; border: 1px solid #e2e8f0; border-radius: 4px;');
          svg.parentNode?.replaceChild(img, svg);
        }
      } catch (err) {
        console.warn('SVG to PNG for Word failed:', err);
      }
    })
  );

  const contentHtml = clone.innerHTML;

  // Complete Word MSO XML Print Layout Template
  const wordDocumentHtml = `
<html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${documentTitle}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
      <w:ValidateAgainstSchemas/>
      <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
      <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
      <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
      <w:Compatibility>
        <w:BreakWrappedTables/>
        <w:SnapToGridInCell/>
        <w:WrapTextWithPunct/>
        <w:UseAsianBreakRules/>
        <w:DontGrowAutofit/>
      </w:Compatibility>
      <w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    /* Strict A4 Paper: 21.0cm x 29.7cm (595.3pt x 841.9pt) */
    @page Section1 {
      size: 595.3pt 841.9pt;
      margin: 56.7pt 56.7pt 56.7pt 70.9pt; /* Top: 2cm, Right: 2cm, Bottom: 2cm, Left: 2.5cm */
      mso-header-margin: 35.4pt;
      mso-footer-margin: 35.4pt;
      mso-paper-source: 0;
    }
    div.Section1 {
      page: Section1;
    }
    body {
      font-family: 'Times New Roman', 'Book Antiqua', serif;
      font-size: 11pt;
      line-height: 1.25;
      color: #000000;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    h1, h2, h3, h4, h5 {
      font-family: 'Times New Roman', serif;
      font-weight: bold;
      color: #000000;
      text-align: center;
      margin: 2pt 0;
    }
    p {
      margin: 2pt 0 4pt 0;
      text-align: justify;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      margin: 6pt 0;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: center;
      padding: 4pt 6pt;
      font-size: 10pt;
      border: 1pt solid #000000;
    }
    td {
      padding: 4pt 6pt;
      font-size: 10.5pt;
      vertical-align: top;
      border: 1pt solid #000000;
    }
    /* Exclude borders for Kop Surat layout tables */
    .border-none, .border-none td, .border-none th {
      border: none !important;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 6pt auto;
    }
    .no-print {
      display: none !important;
    }
  </style>
</head>
<body>
  <div class="Section1">
    ${contentHtml}
  </div>
</body>
</html>
  `;

  // Download file as .doc
  const blob = new Blob(['\ufeff' + wordDocumentHtml], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeFilename = `${documentTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.doc`;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
