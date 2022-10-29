import fs from "fs";
import matter from "gray-matter";

const postsRoot = "posts";

export interface Category {
  categoryName: string;
}

export const getCategorys = (): Category[] =>
  fs
    .readdirSync(postsRoot, { withFileTypes: true })
    .filter((dir) => !dir.name.startsWith("."))
    .map((dir) => ({ categoryName: dir.name }));

interface PostLocation {
  path: string;
  category: string;
}

export const getPostLocations = () => {
  const posts: PostLocation[] = [];
  const baseCategorys = getCategorys();

  for (const { categoryName } of baseCategorys) {
    const subfiles = fs
      .readdirSync(`${postsRoot}/${categoryName}`, { withFileTypes: true })
      .filter((elem) => !elem.isDirectory() && elem.name.endsWith(".md"))
      .map((postFile) => ({ path: `${postsRoot}/${categoryName}/${postFile.name}`, category: categoryName }));
    posts.push(...subfiles);
  }
  return posts;
};

export interface PostInfo {
  title: string;
  category: string;
  uploadDate: string;
  description: string;
}

export const getPost = (path: string, category: string) => {
  const fileTexts = fs.readFileSync(path, "utf8");
  const { data: postInfo } = matter(fileTexts);
  postInfo["category"] = category;
  return postInfo as PostInfo;
};

export interface PostElem {
  id: number;
  postInfo: PostInfo;
  path: string;
}

export const getPosts = (): PostElem[] =>
  getPostLocations()
    .map((loc) => ({ postInfo: { ...getPost(loc.path, loc.category) }, path: loc.path }))
    .sort((a, b) => (a.postInfo.uploadDate > b.postInfo.uploadDate ? 1 : -1))
    .map((elem, index) => ({ ...elem, id: index }))
    .reverse();

export const getPostContent = (path: string) => {
  const fileTexts = fs.readFileSync(path, "utf-8");
  const { content: postContent } = matter(fileTexts);
  return postContent;
};
