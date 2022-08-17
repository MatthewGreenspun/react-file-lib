import { DisplayFile } from "../../types";

interface Props {
  file: DisplayFile;
}

const MicrosoftFile: React.FC<Props> = ({ file }) => {
  const req = new Request(file.fileData);
  return (
    <iframe
      width="100%"
      height={window.innerHeight - 100}
      title="microsoft-embed"
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        req.url
      )}`}
    />
  );
};

export default MicrosoftFile;
