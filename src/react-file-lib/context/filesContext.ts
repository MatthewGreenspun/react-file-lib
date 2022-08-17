import React, { createContext } from "react";
import { DisplayFile } from "../types";

interface Context {
  showFileViewer: boolean;
  setShowFileViewer?: React.Dispatch<React.SetStateAction<boolean>>;
  files: DisplayFile[];
  fileIdx: number;
  setFileIdx?: React.Dispatch<React.SetStateAction<number>>;
}

export const filesContext = createContext<Context>({
  showFileViewer: false,
  fileIdx: 0,
  files: [],
});
