import PostHeader from "src/components/Post/PostHeader";
import PostBody from "src/components/Post/PostBody";
import PostFooter from "src/components/Post/PostFooter";
import Head from "next/head";
import { getPostContent, getPosts, PostInfo } from "inbuild/getPostInfo";

interface PostProps {
  postInfo: PostInfo;
  postContent: string;
}

const Post = ({ postInfo, postContent }: PostProps) => {
  return (
    <>
      <Head>
        <title>{postInfo.title}</title>
      </Head>
      <header className="pb-4 text-stone-300">
        <PostHeader title={postInfo.title} category={postInfo.category} />
      </header>
      <PostBody>{postContent}</PostBody>
      <PostFooter uploadDate={postInfo.uploadDate}></PostFooter>
    </>
  );
};

export async function getStaticPaths() {
  const posts = getPosts();
  const pathsData = posts.map((elem) => ({ params: { id: `${elem.id}` } }));

  return {
    paths: pathsData,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const posts = getPosts();
  const post = posts.filter((post) => post.id == params.id)[0];
  const filePath = post.path;
  const postInfo = post.postInfo;
  const postContent = getPostContent(filePath);

  return {
    props: { postInfo, postContent },
  };
}

export default Post;
