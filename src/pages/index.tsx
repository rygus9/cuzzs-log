import { PostElemType } from "data/PostsElemType";
import type { NextPage } from "next";
import PostCard from "src/components/Index/PostCard";
import IntroHeader from "src/components/Index/IntroHeader";
import getPosts from "data/getPosts";

const Home: NextPage<{ posts: Omit<PostElemType, "path">[] }> = ({ posts }) => {
  const postLength = posts.length;

  return (
    <>
      <IntroHeader></IntroHeader>
      <div className="mt-10 divide-y-[1px] divide-dashed divide-stone-400">
        {posts.map((elem, index) => (
          <PostCard key={elem.postInfo.uploadDate} {...elem} path={postLength - index - 1}></PostCard>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = getPosts();

  return {
    props: { posts: posts.map((elem) => ({ postInfo: elem.postInfo, postContent: elem.postContent })) },
  };
}

export default Home;
