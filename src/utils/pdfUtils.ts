import { PDFDocument } from 'pdf-lib';

export async function removePagesFromPdf(
  arrayBuffer: ArrayBuffer,
  pagesToRemove: number[] // 0-indexed
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Sort pages to remove in descending order to avoid index shifting
  const sortedPagesToRemove = [...pagesToRemove].sort((a, b) => b - a);
  
  for (const pageIndex of sortedPagesToRemove) {
    pdfDoc.removePage(pageIndex);
  }
  
  return await pdfDoc.save();
}

export async function getPdfPageCount(arrayBuffer: ArrayBuffer): Promise<number> {
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  return pdfDoc.getPageCount();
}
