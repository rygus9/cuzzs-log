import fs from "fs";
import cls from "src/utils/cls";
import PostHeader from "src/components/Post/PostHeader";
import { PostElemType } from "data/PostsElemType";
import getPostData from "data/getPostData";
import PostBody from "src/components/Post/PostBody";

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
  const posts: PostElemType[] = JSON.parse(fs.readFileSync("data/posts.json").toString());
  const pathsData = posts.map((elem, index) => ({ params: { id: `${index}` } }));

  return {
    paths: pathsData,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const posts: PostElemType[] = JSON.parse(fs.readFileSync("data/posts.json").toString());
  const filePath = posts[posts.length - 1 - params.id].path;

  const { postInfo, postContent } = getPostData(filePath, false);

  return {
    props: { postInfo, postContent },
  };
}

export default Post;
