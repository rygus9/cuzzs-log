export interface PostElemType {
  postInfo: {
    title: string;
    tags: string[];
    uploadDate: string;
    description: string;
  };
  postContent: string;
  path: string;
}
