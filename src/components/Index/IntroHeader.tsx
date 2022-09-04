import Image from "next/image";
import cls from "src/utils/cls";

const IntroHeader = () => (
  <header className={cls("pt-8 flex items-center space-x-6", "sm:pt-12", "md:pt-16")}>
    <div className={cls("w-20 h-20 rounded-full", "sm:w-24 sm:h-24", "md:w-32 md:h-32")}>
      <Image
        src="/image/고양이.png"
        alt="이미지 하나"
        layout="responsive"
        width={"100%"}
        height="100%"
        className="rounded-full"
        priority={true}
      ></Image>
    </div>
    <div className="flex flex-col">
      <span className={cls("block text-xl text-stone-400", "md:text-2xl")}>
        <span className={cls("text-3xl font-bold", "md:text-4xl")}>Cuzz </span>&apos;s Log
      </span>
      <span className={cls("block mt-1 text-xl text-gray-200", "md:mt-2")}>기술 블로그 겸 일기장</span>
    </div>
  </header>
);

export default IntroHeader;
