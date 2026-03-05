/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PDFPageInfo {
  pageNumber: number;
  thumbnailUrl: string;
}

export interface PDFState {
  file: File;
  arrayBuffer: ArrayBuffer;
  pageCount: number;
}
