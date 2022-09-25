import type { NextPage } from "next";
import PostCard from "src/components/Index/PostCard";
import IntroHeader from "src/components/Index/IntroHeader";
import cls from "src/utils/cls";
import Categorys from "src/components/Index/Categorys";
import Head from "next/head";
import { Category, getCategorys, getPosts, PostElem } from "inbuild/getPostInfo";

interface HomePorps {
  posts: Pick<PostElem, "postInfo" | "id">[];
  categorys: Category[];
}

const Home: NextPage<HomePorps> = ({ posts, categorys }) => {
  return (
    <>
      <Head>
        <title>Cuzz&apos;s Log</title>
      </Head>
      <IntroHeader></IntroHeader>
      <Categorys categorys={categorys} nowCategory="all"></Categorys>
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
  const categorys = getCategorys();

  return {
    props: { posts: posts.map((elem) => ({ postInfo: elem.postInfo, id: elem.id })), categorys },
  };
}

export default Home;
