import getPost from "./getPost";
import getPostLocations from "./getPostLocations";

const posts = getPostLocations().map((elem) => ({ ...getPost(elem.path, true), path: elem.path }));

const getTags = () => {
  let tags: { [key: string]: number } = {};
  posts.map((post) =>
    post.postInfo.tags
      .map((tag: string) => tag.toUpperCase())
      .map((tag: string) => (tag in tags ? (tags[tag] += 1) : (tags[tag] = 1)))
  );
  return Object.entries(tags).map(([key, value]) => ({ title: key, count: value })) as { title: string; count: number}[];
};

export default getTags;
