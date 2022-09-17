import fs from "fs";

interface InfoAboutFile {
  path: string;
  fileName: string;
  isDirectory: boolean;
}

const postsRoot = "public/posts";

const getPostLocations = () => {
  let id = 0;
  const posts = [];

  const stack: InfoAboutFile[] = [];
  const basefiles = fs.readdirSync(postsRoot, { withFileTypes: true });

  stack.push(
    ...basefiles.reverse().map((elem) => ({ path: postsRoot, fileName: elem.name, isDirectory: elem.isDirectory() }))
  );

  while (stack.length !== 0) {
    const now = stack.pop();
    if (now?.isDirectory) {
      if (now?.fileName === "image") continue;
      const subfiles = fs.readdirSync(`${now.path}/${now.fileName}`, { withFileTypes: true });
      stack.push(
        ...subfiles.reverse().map((elem) => ({
          path: `${now.path}/${now.fileName}`,
          fileName: elem.name,
          isDirectory: elem.isDirectory(),
        }))
      );
    } else {
      if (now?.fileName.endsWith(".md")) posts.push({ id: id++, path: `${now?.path}/${now?.fileName}` });
    }
  }

  return posts;
};

export default getPostLocations;