import { Category, getCategorys, getPosts, PostElem } from "inbuild/getPostInfo";
import { NextPage } from "next";
import IntroHeader from "src/components/Index/IntroHeader";
import PostCard from "src/components/Index/PostCard";
import Categorys from "src/components/Index/Categorys";
import cls from "src/utils/cls";
import PageNavigation from "src/components/Index/PageNavigation";
import { PageSeo } from "src/components/SEO";

interface PostListProps {
  posts: Pick<PostElem, "postInfo" | "id">[];
  categorys: Category[];
  maxPage: number;
  nowPage: number;
}

const PostList: NextPage<PostListProps> = ({ posts, categorys, maxPage, nowPage }) => {
  return (
    <>
      <PageSeo title={`Posts ${nowPage}`} description={`All Post and page is ${nowPage}`} url="/"></PageSeo>
      <IntroHeader></IntroHeader>
      <Categorys categorys={categorys} nowCategory="all"></Categorys>
      <section className={cls("mt-2 border-y border-t-stone-400 border-b-stone-600 divide-y-[1px] divide-stone-600")}>
        {posts.map((elem) => (
          <PostCard key={elem.postInfo.uploadDate} {...elem} path={elem.id}></PostCard>
        ))}
      </section>
      <PageNavigation nowPage={nowPage} maxPage={maxPage} baseLink={"/"}></PageNavigation>
    </>
  );
};

export async function getStaticPaths() {
  const pageEnd = Math.ceil(getPosts().length / 5);

  const paths = [...Array(pageEnd).keys()].map((elem) => ({ params: { page: (elem + 1).toString() } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const posts = getPosts();
  const categorys = getCategorys();
  const pageEnd = Math.ceil(posts.length / 5);

  return {
    props: {
      posts: posts
        .slice((params.page - 1) * 5, params.page * 5)
        .map((post) => ({ postInfo: post.postInfo, id: post.id })),
      categorys,
      maxPage: pageEnd,
      nowPage: parseInt(params.page),
    },
  };
}

export default PostList;
