export interface DisplayFile {
  type: FILE_TYPE;
  fileData: string;
  metaData: {
    fileName: string;
    alt?: string;
    rtl?: string;
    nativeAudio?: boolean;
  };
}

export enum FILE_TYPE {
  IMAGE,
  PDF,
  CSV,
  MICROSOFT,
  TXT,
  AUDIO,
  VIDEO,
}
