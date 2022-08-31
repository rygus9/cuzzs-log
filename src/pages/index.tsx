import { PostElemType } from "data/PostsElemType";
import type { NextPage } from "next";
import fs from "fs";
import PostCard from "src/components/Index/PostCard";
import Image from "next/image";

const Home: NextPage<{ posts: Omit<PostElemType, "path">[] }> = ({ posts }) => {
  const postLength = posts.length;

  return (
    <>
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
          <span className="block text-2xl text-gray-500">
            <span className="text-4xl font-bold">Cuzz </span>&apos;s Log
          </span>
          <span className="block mt-2 text-xl text-gray-200">기술 블로그 겸 일기장</span>
        </div>
      </header>
      <div className="mt-10 divide-y-[1px] divide-dashed divide-stone-400">
        {posts.map((elem, index) => (
          <PostCard key={elem.fileInfo.uploadDate} {...elem} path={postLength - index - 1}></PostCard>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts: PostElemType[] = JSON.parse(fs.readFileSync("data/posts.json").toString());

  return {
    props: { posts: posts.map((elem) => ({ fileInfo: elem.fileInfo, fileContents: elem.fileContents })) },
  };
}

export default Home;
