interface PostFooterProps {
  uploadDate: string;
}

const PostFooter = ({ uploadDate }: PostFooterProps) => {
  return (
    <div className="mt-16 bg-myGray py-4 px-3 rounded-md sm:mt-20">
      <span className="text-xl font-bold mr-4 sm:text-2xl">
        By <span className="text-myOrange">Cuzz</span>
      </span>
      <span className="text-base text-stone-400">{uploadDate}</span>
    </div>
  );
};

export default PostFooter;
