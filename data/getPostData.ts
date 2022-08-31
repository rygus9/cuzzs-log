import fs from "fs";

const getPostData = (path: string, summary: boolean = false) => {
  const fileTexts = fs.readFileSync(path, "utf8");
  const fileTitle = fileTexts.split("---")[1];
  const fileInfo = fileTitle
    .split("\n")
    .filter((elem) => elem)
    .map((elem) => ({
      [elem.split(":")[0]]:
        elem.split(":")[0] === "tags" ? JSON.parse(elem.split(":")[1].trim()) : elem.split(":")[1].trim(),
    }))
    .reduce((curr, now) => {
      return Object.assign(curr, now);
    }, {});
  const fileContents = fileTexts.split("---")[2];

  const returnObject = summary
    ? { fileInfo, fileContents: fileContents.substring(0, 100).replaceAll("\n", "") + "..." }
    : { fileInfo, fileContents };

  return returnObject;
};

export default getPostData;
