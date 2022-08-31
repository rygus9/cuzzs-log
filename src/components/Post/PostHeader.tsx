import Image from "next/image";
import cls from "src/utils/cls";

interface PostHeaderProps {
  title: string;
  tags: string[];
  uploadDate: string;
}

const PostHeader = ({ title, tags, uploadDate }: PostHeaderProps) => {
  return (
    <>
      <h2 className="text-5xl text-white font-bold mt-20">{title}</h2>
      <div className="mt-10 mb-2 w-full">
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
          <div className="pl-10">
            {tags.map((elem) => (
              <button
                key={elem}
                className={cls(
                  "py-1 px-5 border border-myOrange rounded-xl text-white font-light uppercase text-sm",
                  "hover:ring-1 hover:ring-myOrange transition-all"
                )}
                type="button"
              >
                {elem}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
