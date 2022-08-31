import { PostElemType } from "data/PostsElemType";
import Link from "next/link";

const PostCard = ({ fileInfo, fileContents, path }: Omit<PostElemType, "path"> & { path: number }) => (
  <article className="h-40 pt-4">
    <Link href={"/post/" + path}>
      <h2 className="text-2xl text-myOrange font-semibold cursor-pointer">{fileInfo.title}</h2>
    </Link>
    <div className="flex items-center justify-start space-x-6">
      <span className="text-base text-stone-300">{fileInfo.uploadDate}</span>
      <div>
        {fileInfo.tags.map((elem) => (
          <span key={elem}>{elem}</span>
        ))}
      </div>
    </div>
    <Link href={"/post/" + path}>
      <p className="mt-4 text-base text-stone-100 cursor-pointer">{fileContents}</p>
    </Link>
  </article>
);

export default PostCard;
