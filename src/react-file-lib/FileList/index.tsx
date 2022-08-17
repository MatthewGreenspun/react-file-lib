import Box from "@mui/material/Box";
import { useContext } from "react";
import { filesContext } from "../context/filesContext";
import { DisplayFile } from "../types";
import File from "./File";

interface Props {
  files: DisplayFile[];
}

const FileList: React.FC<Props> = ({ files }) => {
  const { setFileIdx, setShowFileViewer } = useContext(filesContext);
  return (
    <Box display="flex" flexWrap="wrap">
      {files.map((file, idx) => (
        <div
          key={idx}
          onClick={() => {
            setFileIdx!(idx);
            setShowFileViewer!(true);
          }}
        >
          <File file={file} />
        </div>
      ))}
    </Box>
  );
};

export default FileList;
