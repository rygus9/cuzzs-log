import fs from "fs";
import cls from "src/utils/cls";
import PostHeader from "src/components/Post/PostHeader";
import { PostElemType } from "data/PostsElemType";
import getPostData from "data/getPostData";
import PostBody from "src/components/Post/PostBody";

interface PostProps {
  fileInfo: {
    title: string;
    uploadDate: string;
    tags: string[];
  };
  fileContents: string;
}

const Post = ({ fileInfo, fileContents }: PostProps) => {
  return (
    <>
      <header className="mb-20">
        <PostHeader {...fileInfo} />
      </header>
      <PostBody>{fileContents}</PostBody>
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

  const { fileInfo, fileContents } = getPostData(filePath, false);

  return {
    props: { fileInfo, fileContents },
  };
}

export default Post;
