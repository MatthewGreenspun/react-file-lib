import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useAsync } from "../../hooks";
import { DisplayFile } from "../../types";
import styled from "@emotion/styled";

const Image = styled.img<{
  _width: number;
}>`
  width: min(${(props) => props._width}px, calc(100vw - 200px));

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

interface Props {
  file: DisplayFile;
}

const ImageFile: React.FC<Props> = ({ file }) => {
  const [imgWidth, setImgWidth] = useState(0);
  const { isLoading, data } = useAsync(
    () =>
      fetch(file.fileData)
        .then((res) => res.blob())
        .then((data) => URL.createObjectURL(data)),
    [file.fileData]
  );

  useEffect(() => {
    if (data) {
      const img = new window.Image();
      img.src = data.toString();
      img.onload = () => {
        setImgWidth(img.width);
      };
    }
  }, [data]);

  return (
    <>
      {isLoading && <CircularProgress color="info" />}
      {!isLoading && (
        <Image
          src={isLoading ? "" : (data as string)}
          alt={file.metaData?.alt}
          _width={imgWidth}
        />
      )}
    </>
  );
};

export default ImageFile;
