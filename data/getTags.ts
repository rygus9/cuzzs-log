import getPost from "./getPost";
import getPostLocations from "./getPostLocations";

const posts = getPostLocations().map((elem) => ({ ...getPost(elem.path, true), path: elem.path }));

const getTags = () => {
  let tags = new Set<string>();
  posts.map((post) => {
    post.postInfo.tags.map((tag: string) => tags.add(tag.toUpperCase()));
  });
  return [...tags];
};

export default getTags;
