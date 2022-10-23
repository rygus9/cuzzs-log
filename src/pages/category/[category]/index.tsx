import { Category, getCategorys, getPosts, PostElem } from "inbuild/getPostInfo";
import { NextPage } from "next";
import Head from "next/head";
import IntroHeader from "src/components/Index/IntroHeader";
import PostCard from "src/components/Index/PostCard";
import Categorys from "src/components/Index/Categorys";
import cls from "src/utils/cls";
import PageNavigation from "src/components/Index/PageNavigation";

interface PostListProps {
  posts: Pick<PostElem, "postInfo" | "id">[];
  categorys: Category[];
  nowCategory: string;
  maxPage: number;
}

const PostList: NextPage<PostListProps> = ({ posts, categorys, nowCategory, maxPage }) => {
  return (
    <>
      <Head>
        <title>{`Category - ${nowCategory}`}</title>
      </Head>
      <IntroHeader category={nowCategory}></IntroHeader>
      <Categorys categorys={categorys} nowCategory={nowCategory}></Categorys>
      <section className={cls("mt-2 border-y border-t-stone-400 border-b-stone-600 divide-y-[1px] divide-stone-600")}>
        {posts.map((elem, index) => (
          <PostCard key={elem.postInfo.uploadDate} {...elem} path={elem.id}></PostCard>
        ))}
      </section>
      <PageNavigation nowPage={1} maxPage={maxPage} baseLink={`/category/${nowCategory}/`}></PageNavigation>
    </>
  );
};

export async function getStaticPaths() {
  const categorys = getCategorys();
  const paths = categorys.map((category) => ({ params: { category: category.categoryName.toLowerCase() } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const posts = getPosts().filter((post) => post.postInfo.category.includes(params.category));
  const pageEnd = Math.ceil(posts.length / 5);
  const categorys = getCategorys();

  return {
    props: {
      posts: posts.slice(0, 5).map((post) => ({ postInfo: post.postInfo, id: post.id })),
      categorys,
      nowCategory: params.category,
      maxPage: pageEnd,
    },
  };
}

export default PostList;
