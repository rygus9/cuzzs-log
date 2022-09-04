import PostHeader from "src/components/Post/PostHeader";
import getPost from "data/getPost";
import PostBody from "src/components/Post/PostBody";
import getPosts from "data/getPosts";
import PostFooter from "src/components/Post/PostFooter";

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
      <header className="pb-4">
        <PostHeader {...postInfo} />
      </header>
      <PostBody>{postContent}</PostBody>
      <PostFooter uploadDate={postInfo.uploadDate}></PostFooter>
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
