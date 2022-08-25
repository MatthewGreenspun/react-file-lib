import { DisplayFile } from "../../types";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Document, pdfjs, Page } from "react-pdf/dist/esm/entry.webpack";
import { useResizeValue } from "../../hooks";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  file: DisplayFile;
}

const PdfFile: React.FC<Props> = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const pageWidth = useResizeValue(() =>
    Math.min(window.innerWidth > 1200 ? 900 : 768, window.innerWidth)
  );

  function onLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function onLoadError(e: Error) {
    console.error(e);
  }

  return (
    <>
      <Document
        file={file.fileData}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={<CircularProgress color="info" />}
      >
        {Array(numPages)
          .fill(0)
          .map((_, idx) => (
            <Page
              pageNumber={idx + 1}
              key={idx}
              pageIndex={idx}
              loading={<CircularProgress color="info" />}
              width={pageWidth}
            />
          ))}
      </Document>
    </>
  );
};

export default PdfFile;
