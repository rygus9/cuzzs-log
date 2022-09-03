import Image from "next/image";

const IntroHeader = () => (
  <header className="pt-16 flex items-center space-x-6">
    <div className="w-32 h-32 rounded-full">
      <Image
        src="/image/고양이.png"
        alt="이미지 하나"
        layout="responsive"
        width={"100%"}
        height="100%"
        className="rounded-full"
      ></Image>
    </div>
    <div className=" lex flex-col">
      <span className="block text-2xl text-stone-400">
        <span className="text-4xl font-bold">Cuzz </span>&apos;s Log
      </span>
      <span className="block mt-2 text-xl text-gray-200">기술 블로그 겸 일기장</span>
    </div>
  </header>
);

export default IntroHeader;
