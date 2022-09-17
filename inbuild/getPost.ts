import fs from "fs";
import matter from "gray-matter";

const getPost = (path: string, summary: boolean = false) => {
  const fileTexts = fs.readFileSync(path, "utf8");
  const { data: postInfo, content: postContent } = matter(fileTexts);

  const returnObject = summary ? { postInfo } : { postInfo, postContent };

  return returnObject;
};

export default getPost;