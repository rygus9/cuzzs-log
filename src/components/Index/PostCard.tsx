import { ClockIcon, FolderIcon } from "@heroicons/react/24/outline";
import { PostElem } from "inbuild/getPostInfo";
import Link from "next/link";
import cls from "src/utils/cls";
import TextLink from "../common/TextLink";

const PostCard = ({ postInfo, path }: Pick<PostElem, "postInfo"> & { path: number }) => (
  <article className="h-48 flex justify-center flex-col py-5">
    <span className={cls("text-sm text-stone-400 mb-2 inline-flex items-center", "md:text-base")}>
      <ClockIcon className="w-5 h-5 mr-2"></ClockIcon> {postInfo.uploadDate}
    </span>
    <Link href={"/post/" + path}>
      <h2 className={cls("text-xl text-myWhite font-semibold cursor-pointer", "md:text-2xl")}>{postInfo.title}</h2>
    </Link>
    <div className="space-x-4">
      <TextLink key={postInfo.category} link={`/category/${postInfo.category.toLowerCase()}`}>
        <div className="inline-flex items-center font-light tracking-wide hover:font-bold hover:tracking-tight">
          <FolderIcon className="w-5 h-5 mr-2"></FolderIcon> {postInfo.category.toUpperCase()}
        </div>
      </TextLink>
    </div>
    <Link href={"/post/" + path}>
      <p className={cls("text-sm text-stone-300 cursor-pointer mt-3", "md:text-base")}>{postInfo.description}</p>
    </Link>
  </article>
);

export default PostCard;
