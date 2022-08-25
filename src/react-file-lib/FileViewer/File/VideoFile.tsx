import ReactPlayer from "react-player";
import { DisplayFile } from "../../types";
import { useResizeValue } from "../../hooks";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const VideoContainer = styled(Box)`
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

interface Props {
  file: DisplayFile;
}

const VideoFile: React.FC<Props> = ({ file }) => {
  const width = useResizeValue(() => Math.min(768, window.innerWidth));
  return (
    <VideoContainer>
      <ReactPlayer url={file.fileData} controls width={width} />
    </VideoContainer>
  );
};

export default VideoFile;
