import { Category, getCategorys, getPosts, PostElem } from "inbuild/getPostInfo";
import { NextPage } from "next";
import Head from "next/head";
import IntroHeader from "src/components/Index/IntroHeader";
import PostCard from "src/components/Index/PostCard";
import Categorys from "src/components/Index/Categorys";
import cls from "src/utils/cls";

interface PostListProps {
  posts: Pick<PostElem, "postInfo" | "id">[];
  categorys: Category[];
  nowCategory: string;
}

const PostList: NextPage<PostListProps> = ({ posts, categorys, nowCategory }) => {
  return (
    <>
      <Head>
        <title>{`Category - ${nowCategory}`}</title>
      </Head>
      <IntroHeader></IntroHeader>
      <Categorys categorys={categorys} nowCategory={nowCategory}></Categorys>
      <section
        className={cls("mt-2 border-y border-dashed border-y-stone-400 divide-y-[1px] divide-dashed divide-stone-400")}
      >
        {posts.map((elem, index) => (
          <PostCard key={elem.postInfo.uploadDate} {...elem} path={elem.id}></PostCard>
        ))}
      </section>
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
  const posts = getPosts();
  const categorys = getCategorys();

  return {
    props: {
      posts: posts
        .filter((post) => post.postInfo.category.includes(params.category))
        .map((post) => ({ postInfo: post.postInfo, id: post.id })),
      categorys,
      nowCategory: params.category,
    },
  };
}

export default PostList;
