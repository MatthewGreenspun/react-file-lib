import { useState } from "react";
import "./App.css";
import FileViewer from "./react-file-lib/FileViewer";
import FilesProvider from "./react-file-lib/FilesProvider";
import FileList from "./react-file-lib/FileList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import { FILE_TYPE } from "./react-file-lib/types";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blue[50],
    },
  },
});

function App() {
  const files = [
    {
      type: FILE_TYPE.IMAGE,
      fileData: "test-files/logo512.png",
      metaData: { fileName: "logo512.png" },
    },
    {
      type: FILE_TYPE.IMAGE,
      fileData: "test-files/kitchen_img.jpeg",
      metaData: { fileName: "kitchen_img_refrigerator.jpeg" },
    },
    {
      type: FILE_TYPE.IMAGE,
      fileData: "test-files/large_img.png",
      metaData: { fileName: "large_img.png" },
    },
    {
      type: FILE_TYPE.VIDEO,
      fileData:
        "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3e4e2fef-4e29-4fa7-9d15-59bbe23debcd/bandicam_2021-10-19_13-20-14-460.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220825%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220825T001357Z&X-Amz-Expires=86400&X-Amz-Signature=92f24cd060a871788ef82a7c323d6b2d283153ecd8aa77051f52b10b4fff8cdb&X-Amz-SignedHeaders=host&x-id=GetObject",
      metaData: { fileName: "video_test.mov" },
    },
    {
      type: FILE_TYPE.PDF,
      fileData: "test-files/alg2-2019.pdf",
      metaData: { fileName: "alg2-2019.pdf" },
    },
    {
      type: FILE_TYPE.PDF,
      fileData: "test-files/geo_notes.pdf",
      metaData: { fileName: "geo_notes.pdf" },
    },
    {
      type: FILE_TYPE.MICROSOFT,
      fileData: "test-files/excel_test.xlsx",
      metaData: { fileName: "excel_test.xlsx" },
    },
    {
      type: FILE_TYPE.MICROSOFT,
      fileData: "test-files/docx_test.docx",
      metaData: { fileName: "docx_test.docx" },
    },
    {
      type: FILE_TYPE.AUDIO,
      fileData: "test-files/audio_test.mp3",
      metaData: { fileName: "audio_test.mp3" },
    },
    {
      type: FILE_TYPE.CSV,
      fileData: "test-files/csv_test2.csv",
      metaData: { fileName: "csv_test2.csv" },
    },
    {
      type: FILE_TYPE.CSV,
      fileData: "test-files/csv_test.csv",
      metaData: { fileName: "csv_test.csv" },
    },
    {
      type: FILE_TYPE.TXT,
      fileData: "This is a text document without any new lines",
      metaData: { fileName: "test1.txt" },
    },
    {
      type: FILE_TYPE.TXT,
      fileData:
        "This is a text document with \na new line\n\n\nand three new lines\n\n\t\tand\n\ttabs",
      metaData: { fileName: "test2.txt" },
    },
  ];
  const [fileViewerOpen, setFileViewerOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <FilesProvider files={files}>
        <div className="App">
          <FileViewer
            open={fileViewerOpen}
            onClose={() => setFileViewerOpen(false)}
          />
          <Box maxWidth="800px" width="100%" mx="auto">
            <FileList files={files} />
          </Box>
        </div>
      </FilesProvider>
    </ThemeProvider>
  );
}

export default App;
