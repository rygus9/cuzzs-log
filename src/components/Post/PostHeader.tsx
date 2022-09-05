import cls from "src/utils/cls";
import TagButton from "../common/TagButton";

interface PostHeaderProps {
  title: string;
  tags: string[];
}

const PostHeader = ({ title, tags }: PostHeaderProps) => {
  return (
    <>
      <h2
        className={cls(
          "text-[1.8rem] text-white font-bold mt-6",
          "before:content-['#'] before:pr-1 before:text-myOrange",
          "sm:mt-12",
          "md:text-[2.25rem] md:mt-16"
        )}
      >
        {title}
      </h2>
      <div className="mt-2">
        {tags.map((elem) => (
          <TagButton key={elem}>{elem}</TagButton>
        ))}
      </div>
    </>
  );
};

export default PostHeader;
