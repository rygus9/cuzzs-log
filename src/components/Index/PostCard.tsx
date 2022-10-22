import { PostElem } from "inbuild/getPostInfo";
import Link from "next/link";
import cls from "src/utils/cls";
import TextLink from "../common/TextLink";

const PostCard = ({ postInfo, path }: Pick<PostElem, "postInfo"> & { path: number }) => (
  <article className="min-h-[12rem] flex justify-center flex-col py-5">
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
    <div className="space-x-4">
      <TextLink key={postInfo.category} link={`/category/${postInfo.category.toLowerCase()}`}>
        {"# " + postInfo.category.toUpperCase()}
      </TextLink>
    </div>
    <Link href={"/post/" + path}>
      <p className={cls("text-sm text-stone-300 cursor-pointer mt-3", "md:text-base")}>{postInfo.description}</p>
    </Link>
    <span className={cls("inline-block text-sm text-stone-400 mt-1", "md:text-base")}>{postInfo.uploadDate}</span>
  </article>
);

export default PostCard;
