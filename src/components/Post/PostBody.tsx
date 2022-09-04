import ReactMarkdown from "react-markdown";
import cls from "src/utils/cls";

function LinkRenderer(props: any) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const PostBody = ({ children }: { children: string }) => {
  return (
    <section className={cls("prose prose-base prose-invert m-auto max-w-none pt-8", "md:prose-lg")}>
      <ReactMarkdown components={{ a: LinkRenderer }} className="w-full">
        {children}
      </ReactMarkdown>
    </section>
  );
};

export default PostBody;
