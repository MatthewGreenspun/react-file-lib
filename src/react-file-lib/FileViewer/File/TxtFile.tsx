import { DisplayFile } from "../../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  file: DisplayFile;
}

const TxtFile: React.FC<Props> = ({ file }) => {
  return (
    <Box
      width="100%"
      height="100%"
      color="black"
      sx={{ backgroundColor: "white" }}
      p={4}
      borderRadius={1}
    >
      <Typography
        variant="body2"
        fontSize="large"
        whiteSpace="pre-wrap"
        textAlign={file.metaData?.rtl ? "right" : "left"}
      >
        {file.fileData}
      </Typography>
    </Box>
  );
};

export default TxtFile;
