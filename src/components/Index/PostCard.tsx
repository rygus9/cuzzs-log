import { PostElemType } from "data/PostsElemType";
import Link from "next/link";
import cls from "src/utils/cls";

const PostCard = ({ fileInfo, fileContents, path }: Omit<PostElemType, "path"> & { path: number }) => (
  <article className="h-40 pt-4">
    <Link href={"/post/" + path}>
      <h2
        className={cls(
          "text-2xl text-myWhite font-semibold cursor-pointer",
          " before:content-['#'] before:pr-1 before:text-myOrange"
        )}
      >
        {fileInfo.title}
      </h2>
    </Link>
    <div className="flex items-center justify-start space-x-6 mt-2">
      <span className="text-base text-stone-400">{fileInfo.uploadDate}</span>
      <div className="space-x-4">
        {fileInfo.tags.map((elem) => (
          <span
            key={elem}
            className={cls(
              "py-1 px-2 border border-myOrange rounded-md text-xs text-stone-200 cursor-pointer",
              "hover:ring-1 hover:ring-myOrange"
            )}
          >
            # {elem.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
    <Link href={"/post/" + path}>
      <p className="mt-4 text-base text-stone-300 cursor-pointer">{fileContents}</p>
    </Link>
  </article>
);

export default PostCard;
