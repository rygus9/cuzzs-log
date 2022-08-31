export interface PostElemType {
  fileInfo: {
    title: string;
    tags: string[];
    uploadDate: string;
  };
  fileContents: string;
  path: string;
}
