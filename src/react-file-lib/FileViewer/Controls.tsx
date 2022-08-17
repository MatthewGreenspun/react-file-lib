import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DisplayFile } from "../types";
import { styled } from "@mui/material/styles";
import { useContext, useRef } from "react";
import { filesContext } from "../context/filesContext";

interface Props {
  files: DisplayFile[];
  fileIdx: number;
  setFileIdx: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  onCloudDownload?: () => void;
}

const ButtonsContainer = styled(Box)``;

const Controls: React.FC<Props> = ({
  files,
  fileIdx,
  setFileIdx,
  onClose,
  onDelete,
  onDownload,
  onCloudDownload,
}) => {
  const buttonsContainerRef = useRef<HTMLDivElement>();
  const { setShowFileViewer } = useContext(filesContext);
  return (
    <>
      <ButtonsContainer
        ref={buttonsContainerRef}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        zIndex={10000}
        maxWidth={window.innerWidth}
      >
        <Box
          display="flex"
          className="left-btn-box"
          color="white"
          alignItems="center"
        >
          <IconButton
            onClick={() => {
              onClose();
              setShowFileViewer!(false);
            }}
          >
            <CloseOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <Box mx={1}>
            <FileIcon />
          </Box>
          <Typography variant="h6" sx={{ overflowWrap: "break-word" }}>
            {files[fileIdx].metaData?.fileName ?? files[fileIdx].fileData}
          </Typography>
        </Box>

        <Box className="right-btn-box" display="flex" justifyContent="flex-end">
          <IconButton onClick={onCloudDownload}>
            <CloudDownloadIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={onDownload}>
            <FileDownloadOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </ButtonsContainer>
      <Box
        width="100%"
        display="flex"
        position="fixed"
        top="50%"
        justifyContent="space-between"
        boxSizing="border-box"
        px={4}
        zIndex={100000000}
      >
        <IconButton
          disabled={fileIdx === 0}
          onClick={() => setFileIdx(fileIdx - 1)}
          sx={{
            visibility: fileIdx === 0 ? "hidden" : "visible",
            "&:hover": {
              transform: "scale(1.5)",
            },
          }}
        >
          <KeyboardArrowLeftIcon
            color="info"
            fontSize="large"
            sx={{
              "&:active": {
                color: "white !important",
              },
            }}
          />
        </IconButton>
        <IconButton
          disabled={fileIdx === files.length - 1}
          onClick={() => setFileIdx(fileIdx + 1)}
          sx={{
            visibility: fileIdx === files.length - 1 ? "hidden" : "visible",
            "&:hover": {
              transform: "scale(1.5)",
            },
          }}
        >
          <KeyboardArrowRightIcon
            color="info"
            fontSize="large"
            sx={{
              "&:active": {
                color: "white !important",
              },
            }}
          />
        </IconButton>
      </Box>
    </>
  );
};

export default Controls;
