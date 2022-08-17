import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blueGrey } from "@mui/material/colors";
import React from "react";

interface Props {}

const FileUploader: React.FC<Props> = () => {
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log("drop", e);

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === "file") {
          const file = e.dataTransfer.items[i].getAsFile();
          console.log(`… file[${i}].name = ${file?.name}`);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log(`… file[${i}].name = ${e.dataTransfer.files[i].name}`);
      }
    }
  }
  return (
    <Box
      width="100%"
      maxWidth="20rem"
      minHeight="30rem"
      borderRadius={2}
      p={3}
      border={"2px solid " + blueGrey[900]}
      display="flex"
      flexDirection="column"
    >
      <div onDrop={(e) => handleDrop(e)}>
        <input hidden type="file" style={{ flex: 1 }}></input>
      </div>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden />
      </Button>
    </Box>
  );
};

export default FileUploader;
