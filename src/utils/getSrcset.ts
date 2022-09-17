const prefixs = ["520", "800", "1440"];

export default function getImageLocation(originSrc: string) {
  const srcSplit = originSrc.split("/");
  const name = srcSplit.slice(-1)[0].split(".")[0];
  const dirName = srcSplit.slice(0, -1).join("/") + "/optImage/";

  let srcset = "";
  srcset = prefixs.reduce((acc, cur) => {
    acc += `${dirName}${name}w${cur}.webp ${cur}w,`;
    return acc;
  }, srcset);

  let src = `${dirName}${name}w1440.webp`;

  return { srcset, src };
}
