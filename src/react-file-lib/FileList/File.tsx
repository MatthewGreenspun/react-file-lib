import { DisplayFile, FILE_TYPE } from "../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const FileIcon: React.FC<{ type: FILE_TYPE }> = ({ type }) => {
  if (type === FILE_TYPE.AUDIO)
    return <AudioFileIcon sx={{ fontSize: "5rem" }} />;
  if (type === FILE_TYPE.IMAGE) return <ImageIcon sx={{ fontSize: "5rem" }} />;
  if (type === FILE_TYPE.PDF)
    return <PictureAsPdfIcon sx={{ fontSize: "5rem" }} />;
  if (type === FILE_TYPE.VIDEO)
    return <VideoFileIcon sx={{ fontSize: "5rem" }} />;
  return <InsertDriveFileIcon sx={{ fontSize: "5rem" }} />;
};

const FileBox = styled(Box)`
  transition: 0.1s;
  cursor: pointer;
  :hover {
    box-shadow: -1px 2px 5px 1px rgba(0, 0, 0, 0.2);
  }
`;

interface Props {
  file: DisplayFile;
}

const File: React.FC<Props> = ({ file }) => {
  return (
    <FileBox
      minWidth="10rem"
      minHeight="10rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      border={"1px solid " + grey[200]}
      borderRadius="0.5rem"
      m={1}
      p={1}
    >
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <FileIcon type={file.type} />
      </Box>
      <Typography variant="body2" sx={{ mt: "1rem" }}>
        {file.metaData.fileName}
      </Typography>
    </FileBox>
  );
};

export default File;
