import getPosts from "data/getPosts";
import getTags from "data/getTags";
import { PostElemType } from "data/PostsElemType";
import { NextPage } from "next";
import IntroHeader from "src/components/Index/IntroHeader";
import PostCard from "src/components/Index/PostCard";
import Tags from "src/components/Index/Tags";
import cls from "src/utils/cls";

const PostList: NextPage<{ posts: Pick<PostElemType, "postInfo">[]; tags: { title: string; count: number }[] }> = ({
  posts,
  tags,
}) => {
  const postLength = posts.length;

  return (
    <>
      <IntroHeader></IntroHeader>
      <Tags tags={tags}></Tags>
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
        .map((post) => ({ postInfo: post.postInfo })),
      tags,
    },
  };
}

export default PostList;
