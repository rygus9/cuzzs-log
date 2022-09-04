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
      <div className={cls("mt-6 mb-10 w-full", "sm:mt-10 sm:mb-14", "md:mt-14 md:mb-16")}>
        <div className={cls("flex flex-col justify-between", "md:flex-row md:items-center")}>
          <div className="flex items-center space-x-6">
            <figure className="w-16 h-16 rounded-full">
              <Image
                src={"/image/고양이.png"}
                alt={"프로필 사진"}
                layout="responsive"
                width="100"
                height="100"
                className="rounded-full"
              ></Image>
            </figure>
            <div>
              <div className="text-2xl font-bold text-myOrange">Cuzz</div>
              <span className="text-base text-stone-100 font-thin">{uploadDate}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            {tags.map((elem) => (
              <TagButton key={elem}>{elem}</TagButton>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
