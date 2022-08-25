import Box from "@mui/material/Box";

import ImageFile from "./ImageFile";
import PdfFile from "./PdfFile";
import CsvFile from "./CsvFile";
import MicrosoftFile from "./MicrosoftFile";
import TxtFile from "./TxtFile";
import AudioFile from "./AudioFile";
import { DisplayFile, FILE_TYPE } from "../../types";
import VideoFile from "./VideoFile";

const File: React.FC<DisplayFile> = (file) => {
  const { type } = file;
  return (
    <Box width="100%" pb={2} mx="auto" display="flex" justifyContent="center">
      {type === FILE_TYPE.IMAGE && <ImageFile file={file} />}
      {type === FILE_TYPE.PDF && <PdfFile file={file} />}
      {type === FILE_TYPE.CSV && <CsvFile file={file} />}
      {type === FILE_TYPE.MICROSOFT && <MicrosoftFile file={file} />}
      {type === FILE_TYPE.TXT && <TxtFile file={file} />}
      {type === FILE_TYPE.AUDIO && (
        <AudioFile
          file={file}
          nativeAudio={file.metaData.nativeAudio ?? true}
        />
      )}
      {type === FILE_TYPE.VIDEO && <VideoFile file={file} />}
    </Box>
  );
};

export default File;
