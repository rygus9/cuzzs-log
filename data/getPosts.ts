import getPost from "./getPost";
import getPostsLocation from "./getPostsLocation";
import { PostElemType } from "./PostsElemType";

const posts = getPostsLocation()
  .map((elem) => ({ ...getPost(elem.path, true), path: elem.path }))
  .sort((a, b) => (a.postInfo.uploadDate > b.postInfo.uploadDate ? -1 : 1));

const getPosts = () => {
  return posts as PostElemType[];
};

export default getPosts;
