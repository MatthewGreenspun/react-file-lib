import Box from "@mui/material/Box";
import File from "./File/File";
import { DisplayFile } from "../types";
import { useContext } from "react";
import Fade from "@mui/material/Fade";
import Controls from "./Controls";
import "./file-viewer.css";
import { filesContext } from "../context/filesContext";

interface Props {
  files?: DisplayFile[];
  open: boolean;
  onClose: () => void;
  fadeTime?: number;
  nativeAudio?: boolean;
}

const FileViewer: React.FC<Props> = ({
  files: propsFiles,
  open,
  onClose,
  fadeTime,
  nativeAudio,
}) => {
  const { files: contextFiles, showFileViewer, setShowFileViewer, fileIdx, setFileIdx } =
    useContext(filesContext);

  const files = contextFiles || propsFiles || []

  return (
    <Fade
      timeout={{
        appear: fadeTime ?? 150,
        enter: fadeTime ?? 150,
        exit: fadeTime ?? 100,
      }}
      in={open || showFileViewer}
    >
      <div
        onClick={() => {
          onClose();
          setShowFileViewer!(false);
        }}
      >
        <Box
          className="file-viewer"
          position="fixed"
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
          top={0}
          left={0}
          bottom={0}
          p={2}
          zIndex={1000}
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
            background:
              "linear-gradient(180deg, rgba(0,0,0,1) 1%, rgba(0,0,0,0.7) 99%)",
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Controls
              {...{
                files,
                fileIdx: fileIdx!,
                setFileIdx: setFileIdx!,
                onClose,
              }}
            />
            <Box
              width={Math.max(300, window.innerWidth - 200)}
              mx="auto"
              flex={1}
            >
              <File
                type={files[fileIdx].type}
                fileData={files[fileIdx].fileData}
                metaData={{
                  fileName:
                    files[fileIdx].metaData?.fileName ??
                    files[fileIdx].fileData,
                  nativeAudio,
                }}
              />
            </Box>
          </div>
        </Box>
      </div>
    </Fade>
  );
};

export default FileViewer;
