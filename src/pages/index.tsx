import { PostElemType } from "data/PostsElemType";
import type { NextPage } from "next";
import fs from "fs";
import PostCard from "src/components/Index/PostCard";
import IntroHeader from "src/components/Index/IntroHeader";

const Home: NextPage<{ posts: Omit<PostElemType, "path">[] }> = ({ posts }) => {
  const postLength = posts.length;

  return (
    <>
      <IntroHeader></IntroHeader>
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
