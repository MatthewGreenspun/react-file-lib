import { filesContext } from "./context/filesContext";
import React, { ReactNode, useState } from "react";
import { DisplayFile } from "./types";

interface Props {
  files: DisplayFile[];
  children?: ReactNode;
}

const FilesProvider: React.FC<Props> = ({ files, children }) => {
  const [fileIdx, setFileIdx] = useState(0);
  const [showFileViewer, setShowFileViewer] = useState(false);
  return (
    <filesContext.Provider
      value={{ showFileViewer, setShowFileViewer, files, fileIdx, setFileIdx }}
    >
      {children}
    </filesContext.Provider>
  );
};

export default FilesProvider;
