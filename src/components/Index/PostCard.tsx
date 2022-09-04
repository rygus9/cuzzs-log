import { PostElemType } from "data/PostsElemType";
import Link from "next/link";
import cls from "src/utils/cls";
import TagButton from "../common/TagButton";

const PostCard = ({ postInfo, postContent, path }: Omit<PostElemType, "path"> & { path: number }) => (
  <article className="h-40 pt-4">
    <Link href={"/post/" + path}>
      <h2
        className={cls(
          "text-xl text-myWhite font-semibold cursor-pointer",
          "before:content-['#'] before:pr-1 before:text-myOrange",
          "md:text-2xl"
        )}
      >
        {postInfo.title}
      </h2>
    </Link>
    <div className="flex items-center justify-start space-x-6 mt-2">
      <span className="text-base text-stone-400">{postInfo.uploadDate}</span>
      <div className="space-x-4">
        {postInfo.tags.map((elem) => (
          <TagButton key={elem} size="sm">
            {elem}
          </TagButton>
        ))}
      </div>
    </div>
    <Link href={"/post/" + path}>
      <p className={cls("mt-4 text-sm text-stone-300 cursor-pointer", "md:text-base")}>{postContent}</p>
    </Link>
  </article>
);

export default PostCard;
