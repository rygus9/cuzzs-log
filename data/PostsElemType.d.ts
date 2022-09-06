export interface PostElemType {
  id: number;
  postInfo: {
    title: string;
    tags: string[];
    uploadDate: string;
    description: string;
  };
  postContent: string;
  path: string;
}
