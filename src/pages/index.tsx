import { PostElemType } from "data/PostsElemType";
import type { NextPage } from "next";
import PostCard from "src/components/Index/PostCard";
import IntroHeader from "src/components/Index/IntroHeader";
import getPosts from "data/getPosts";
import cls from "src/utils/cls";
import getTags from "data/getTags";
import Tags from "src/components/Index/Tags";

const Home: NextPage<{ posts: Pick<PostElemType, "postInfo">[]; tags: { title: string; count: number }[] }> = ({
  posts,
  tags,
}) => {
  const postLength = posts.length;

  return (
    <>
      <IntroHeader></IntroHeader>
      <Tags tags={tags} nowTag="all"></Tags>
      <section
        className={cls("mt-2 border-y border-dashed border-y-stone-400 divide-y-[1px] divide-dashed divide-stone-400")}
      >
        {posts.map((elem, index) => (
          <PostCard key={elem.postInfo.uploadDate} {...elem} path={postLength - index - 1}></PostCard>
        ))}
      </section>
    </>
  );
};

export async function getStaticProps() {
  const posts = getPosts();
  const tags = getTags();

  return {
    props: { posts: posts.map((elem) => ({ postInfo: elem.postInfo })), tags },
  };
}

export default Home;
