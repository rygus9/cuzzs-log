import getPosts from "inbuild/getPosts";
import getTags from "inbuild/getTags";
import { PostElemType } from "inbuild/PostsElemType";
import { NextPage } from "next";
import Head from "next/head";
import IntroHeader from "src/components/Index/IntroHeader";
import PostCard from "src/components/Index/PostCard";
import Tags from "src/components/Index/Tags";
import cls from "src/utils/cls";

interface PostListProps {
  posts: Pick<PostElemType, "postInfo" | "id">[];
  tags: { title: string; count: number }[];
  nowTag: string;
}

const PostList: NextPage<PostListProps> = ({ posts, tags, nowTag }) => {
  return (
    <>
      <Head>
        <title>{`Tag - ${nowTag}`}</title>
      </Head>
      <IntroHeader></IntroHeader>
      <Tags tags={tags} nowTag={nowTag}></Tags>
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
  const tags = getTags();
  const paths = tags.map((tag) => ({ params: { tag: tag.title.toLowerCase() } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const posts = getPosts();
  const tags = getTags();

  return {
    props: {
      posts: posts
        .filter((post) => post.postInfo.tags.includes(params.tag))
        .map((post) => ({ postInfo: post.postInfo, id: post.id })),
      tags,
      nowTag: params.tag,
    },
  };
}

export default PostList;
