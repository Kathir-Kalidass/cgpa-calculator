import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

async function captureElement(element) {
  return html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false,
    allowTaint: false,
    useCORS: true,
  });
}

export async function exportElementToPdf(element, filename = 'cgpa-report.pdf') {
  if (!element) return;

  const canvas = await captureElement(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;

  const contentWidth = pageWidth - margin * 2;
  const contentHeight = (canvas.height * contentWidth) / canvas.width;
  const usablePageHeight = pageHeight - margin * 2;

  if (contentHeight <= usablePageHeight) {
    pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, contentHeight);
  } else {
    let remainingHeight = contentHeight;
    let sourceY = 0;
    let pageNum = 0;

    while (remainingHeight > 0) {
      if (pageNum > 0) pdf.addPage();
      const pageContentHeight = Math.min(remainingHeight, usablePageHeight);
      const srcHeight = (pageContentHeight / contentHeight) * canvas.height;
      const srcY = (sourceY / contentHeight) * canvas.height;

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = srcHeight;
      const ctx = pageCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, srcY, canvas.width, srcHeight, 0, 0, canvas.width, srcHeight);

      const pageImgData = pageCanvas.toDataURL('image/png');
      pdf.addImage(pageImgData, 'PNG', margin, margin, contentWidth, pageContentHeight);

      sourceY += pageContentHeight;
      remainingHeight -= pageContentHeight;
      pageNum++;
    }
  }

  pdf.save(filename);
}
