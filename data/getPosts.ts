import getPost from "./getPost";
import getPostLocations from "./getPostLocations";
import { PostElemType } from "./PostsElemType";

const posts = getPostLocations()
  .map((elem) => ({ ...getPost(elem.path, true), path: elem.path }))
  .sort((a, b) => (a.postInfo.uploadDate > b.postInfo.uploadDate ? -1 : 1));

const getPosts = () => {
  return posts as PostElemType[];
};

export default getPosts;
