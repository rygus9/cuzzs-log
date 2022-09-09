import { PostElemType } from "data/PostsElemType";
import type { NextPage } from "next";
import PostCard from "src/components/Index/PostCard";
import IntroHeader from "src/components/Index/IntroHeader";
import getPosts from "data/getPosts";
import cls from "src/utils/cls";
import getTags from "data/getTags";
import Tags from "src/components/Index/Tags";
import Head from "next/head";

const Home: NextPage<{ posts: Pick<PostElemType, "postInfo" | "id">[]; tags: { title: string; count: number }[] }> = ({
  posts,
  tags,
}) => {
  return (
    <>
      <Head>
        <title>Cuzz&apos;s Log</title>
      </Head>
      <IntroHeader></IntroHeader>
      <Tags tags={tags} nowTag="all"></Tags>
      <section
        className={cls("mt-2 border-y border-dashed border-y-stone-400 divide-y-[1px] divide-dashed divide-stone-400")}
      >
        {posts.map((elem) => (
          <PostCard key={elem.postInfo.uploadDate} {...elem} path={elem.id}></PostCard>
        ))}
      </section>
    </>
  );
};

export async function getStaticProps() {
  const posts = getPosts();
  const tags = getTags();

  return {
    props: { posts: posts.map((elem) => ({ postInfo: elem.postInfo, id: elem.id })), tags },
  };
}

export default Home;
