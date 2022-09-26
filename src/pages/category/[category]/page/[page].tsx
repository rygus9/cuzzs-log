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
  maxPage: number;
  nowPage: number;
  nowCategory: string;
}

const PostList: NextPage<PostListProps> = ({ posts, categorys, maxPage, nowPage, nowCategory }) => {
  return (
    <>
      <Head>
        <title>Cuzz&apos;s Log</title>
      </Head>
      <IntroHeader></IntroHeader>
      <Categorys categorys={categorys} nowCategory={nowCategory}></Categorys>
      <section
        className={cls("mt-2 border-y border-dashed border-y-stone-400 divide-y-[1px] divide-dashed divide-stone-400")}
      >
        {posts.map((elem) => (
          <PostCard key={elem.postInfo.uploadDate} {...elem} path={elem.id}></PostCard>
        ))}
      </section>
      <PageNavigation nowPage={nowPage} maxPage={maxPage} baseLink={`/category/${nowCategory}/`}></PageNavigation>
    </>
  );
};

export async function getStaticPaths() {
  const posts = getPosts();
  const pageCategory: { pageEnd: number; category: string }[] = getCategorys()
    .map((category) => category.categoryName)
    .map((category) => ({
      pageEnd: Math.ceil(posts.filter((post) => post.postInfo.category.includes(category)).length / 5),
      category,
    }));

  const paths = pageCategory.map((elem) => ({
    params: { page: elem.pageEnd.toString(), category: elem.category },
  }));

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
      posts: posts
        .slice((params.page - 1) * 5, params.page * 5)
        .map((post) => ({ postInfo: post.postInfo, id: post.id })),
      categorys,
      maxPage: pageEnd,
      nowPage: parseInt(params.page),
      nowCategory: params.category,
    },
  };
}

export default PostList;
