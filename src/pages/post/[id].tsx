import fs from "fs";
import PostHeader from "src/components/Post/PostHeader";
import { PostElemType } from "data/PostsElemType";
import getPost from "data/getPost";
import PostBody from "src/components/Post/PostBody";
import getPosts from "data/getPosts";

interface PostProps {
  postInfo: {
    title: string;
    uploadDate: string;
    tags: string[];
  };
  postContent: string;
}

const Post = ({ postInfo, postContent }: PostProps) => {
  return (
    <>
      <header>
        <PostHeader {...postInfo} />
      </header>
      <PostBody>{postContent}</PostBody>
    </>
  );
};

export async function getStaticPaths() {
  const posts = getPosts();
  const pathsData = posts.map((elem, index) => ({ params: { id: `${index}` } }));

  return {
    paths: pathsData,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const posts = getPosts();
  const filePath = posts[posts.length - 1 - params.id].path;

  const { postInfo, postContent } = getPost(filePath, false);

  return {
    props: { postInfo, postContent },
  };
}

export default Post;
