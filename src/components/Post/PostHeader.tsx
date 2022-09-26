import cls from "src/utils/cls";
import Button from "../common/Button";

interface PostHeaderProps {
  title: string;
  category: string;
}

const PostHeader = ({ title, category }: PostHeaderProps) => {
  return (
    <>
      <h2
        className={cls(
          "text-[1.9rem] text-white font-bold mt-6",
          "before:content-['#'] before:pr-1 before:text-myOrange",
          "sm:mt-12",
          "md:text-[2.3rem] md:mt-16"
        )}
      >
        {title}
      </h2>
      <div className="mt-2">
        <Button key={category}>{category}</Button>
      </div>
    </>
  );
};

export default PostHeader;
