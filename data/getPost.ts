import fs from "fs";
import matter from "gray-matter";

const getPost = (path: string, summary: boolean = false) => {
  const fileTexts = fs.readFileSync(path, "utf8");
  const { data: postInfo, content: postContent } = matter(fileTexts);

  const returnObject = summary
    ? { postInfo, postContent: postContent.substring(0, 80).replaceAll("\n", "") + "..." }
    : { postInfo, postContent };

  return returnObject;
};

export default getPost;
