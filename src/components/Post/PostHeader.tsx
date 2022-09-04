import Image from "next/image";
import cls from "src/utils/cls";
import TagButton from "../common/TagButton";

interface PostHeaderProps {
  title: string;
  tags: string[];
  uploadDate: string;
}

const PostHeader = ({ title, tags, uploadDate }: PostHeaderProps) => {
  return (
    <>
      <h2
        className={cls(
          "text-[1.8rem] text-white font-bold mt-8",
          "before:content-['#'] before:pr-1 before:text-myOrange",
          "sm:mt-14",
          "md:text-[2.25rem] md:mt-20"
        )}
      >
        {title}
      </h2>
      <div className="mt-2">
        {tags.map((elem) => (
          <TagButton key={elem}>{elem}</TagButton>
        ))}
      </div>
      <div className="mt-3">
        <span className="text-xl font-bold mr-4 sm:text-2xl">
          By <span className="text-myOrange">Cuzz</span>
        </span>
        <span className="text-base text-stone-400">{uploadDate}</span>
      </div>
    </>
  );
};

export default PostHeader;
