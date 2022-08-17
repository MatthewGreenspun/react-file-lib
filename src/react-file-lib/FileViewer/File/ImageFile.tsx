import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useResizeValue, useFetch } from "../../hooks";
import { DisplayFile } from "../../types";
import styled from "@emotion/styled";

const Image = styled.img<{
  maxWidth: number;
  // maxHeight: number;
}>`
  max-width: ${(props) => props.maxWidth}px;
  /* max-height: ${(props) => props.height}; */
`;

interface Props {
  file: DisplayFile;
}

const ImageFile: React.FC<Props> = ({ file }) => {
  const [showLoading, setShowLoading] = useState(true);
  const { isLoading, data } = useFetch(file.fileData, {
    dataType: "blob",
  });
  const imageWidth = useResizeValue(() =>
    window.innerWidth < 768 ? window.innerWidth : window.innerWidth - 300
  );

  useEffect(() => {
    setShowLoading(true);
    if (!isLoading) setShowLoading(false);
  }, [isLoading, file.metaData.fileName, data]);

  console.log(file.metaData.fileName, showLoading);
  return (
    <>
      {showLoading && <CircularProgress color="info" />}
      {!showLoading && (
        <Image
          src={isLoading ? "" : (data as string)}
          alt={file.metaData?.alt}
          maxWidth={imageWidth}
          // maxHeight={window.innerHeight - 200}
        />
      )}
    </>
  );
};

export default ImageFile;
