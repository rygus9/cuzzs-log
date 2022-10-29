const sharp = require("sharp");
const path = require("path");
const dirPath = path.dirname(__filename);
const fs = require("fs");

const getImagePaths = () => {
  const postsRoot = path.resolve(dirPath, "../posts");
  const images = [];

  const stack = [];
  const basefiles = fs.readdirSync(postsRoot, { withFileTypes: true });

  stack.push(
    ...basefiles.reverse().map((elem) => ({ path: postsRoot, fileName: elem.name, isDirectory: elem.isDirectory() }))
  );

  while (stack.length !== 0) {
    const now = stack.pop();
    if (now?.isDirectory) {
      const subfiles = fs.readdirSync(`${now.path}/${now.fileName}`, { withFileTypes: true });
      stack.push(
        ...subfiles.reverse().map((elem) => ({
          path: `${now.path}/${now.fileName}`,
          fileName: elem.name,
          isDirectory: elem.isDirectory(),
        }))
      );
    } else {
      if (now?.fileName.endsWith(".png")) images.push(`${now?.path}/${now?.fileName}`);
    }
  }
  return images;
};

const pathChange = (filepath, width, ext) => {
  let fileParseObj = path.parse(filepath);
  let name = fileParseObj.name;
  let dir = fileParseObj.dir;

  dir = path.resolve(dir, "optImage");
  !fs.existsSync(dir) && fs.mkdirSync(dir);

  return dir + "/" + name + "w" + width + "." + ext;
};

const optimizeImage = (path, width, quality) =>
  sharp(path)
    .resize({ fit: sharp.fit.contain, width })
    .webp({ quality })
    .toFile(pathChange(path, width, "webp"))
    .then(() => console.log(path + " is done"))
    .catch((err) => console.error("에러 발생 : ", err));

const images = getImagePaths();

for (const elem of images) {
  optimizeImage(elem, 1440, 95);
  optimizeImage(elem, 800, 95);
  optimizeImage(elem, 520, 95);
}
