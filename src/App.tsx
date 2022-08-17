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
      fileData: "test-files/csv_test.csv",
      metaData: { fileName: "csv_test.csv" },
    },
    {
      type: FILE_TYPE.IMAGE,
      fileData: "test-files/kitchen_img.jpeg",
      metaData: { fileName: "kitchen_img.jpeg" },
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
          <Box maxWidth="50%">
            <FileList files={files} />
          </Box>
        </div>
      </FilesProvider>
    </ThemeProvider>
  );
}

export default App;
