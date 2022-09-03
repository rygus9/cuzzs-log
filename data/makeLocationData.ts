import getPostsLocation from "./getPostsLocation";
import fs from "fs";
import getPostData from "./getPostData";

const filesData = getPostsLocation()
  .map((elem) => ({ ...getPostData(elem.path, true), path: elem.path }))
  .sort((a, b) => (a.postInfo.uploadDate > b.postInfo.uploadDate ? -1 : 1));

fs.writeFileSync("data/posts.json", JSON.stringify(filesData));

export {};
