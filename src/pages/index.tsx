import type { NextPage } from "next";
import PostCard from "src/components/Index/PostCard";
import IntroHeader from "src/components/Index/IntroHeader";
import cls from "src/utils/cls";
import Categorys from "src/components/Index/Categorys";
import Head from "next/head";
import { Category, getCategorys, getPosts, PostElem } from "inbuild/getPostInfo";
import PageNavigation from "src/components/Index/PageNavigation";
import { IntroLD } from "src/components/SEO";

interface HomePorps {
  posts: Pick<PostElem, "postInfo" | "id">[];
  categorys: Category[];
  maxPage: number;
}

const Home: NextPage<HomePorps> = ({ posts, categorys, maxPage }) => {
  return (
    <>
      <Head>
        <title>Cuzz&apos;s Log</title>
      </Head>
      <IntroLD></IntroLD>
      <IntroHeader></IntroHeader>
      <Categorys categorys={categorys} nowCategory="all"></Categorys>
      <section className={cls("mt-2 border-y border-t-stone-400 border-b-stone-600 divide-y-[1px] divide-stone-600")}>
        {posts.map((elem) => (
          <PostCard key={elem.postInfo.uploadDate} {...elem} path={elem.id}></PostCard>
        ))}
      </section>
      <PageNavigation nowPage={1} maxPage={maxPage} baseLink="/" />
    </>
  );
};

export async function getStaticProps() {
  const posts = getPosts();
  const categorys = getCategorys();
  const pageEnd = Math.ceil(posts.length / 5);

  return {
    props: {
      posts: posts.map((elem) => ({ postInfo: elem.postInfo, id: elem.id })).slice(0, 5),
      categorys,
      maxPage: pageEnd,
    },
  };
}

export default Home;
