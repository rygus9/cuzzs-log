import getPost from "./getPost";
import getPostLocations from "./getPostLocations";
import { PostElemType } from "./PostsElemType";

const postsLocations = getPostLocations();
const postsLength = postsLocations.length;

const posts = postsLocations
  .map((elem) => ({ ...getPost(elem.path, true), path: elem.path }))
  .sort((a, b) => (a.postInfo.uploadDate > b.postInfo.uploadDate ? -1 : 1))
  .map((elem, index) => ({ ...elem, id: postsLength - index - 1 }));

const getPosts = () => {
  return posts as PostElemType[];
};

export default getPosts;
