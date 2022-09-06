import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import darcula from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import cls from "src/utils/cls";
//@ts-ignore
import urls from "rehype-urls";

SyntaxHighlighter.registerLanguage("tsx", tsx);

const PostBody = ({ children }: { children: string }) => {
  return (
    <section className={cls("prose prose-lg prose-invert m-auto max-w-none")}>
      <ReactMarkdown
        components={{ a: LinkRenderer, pre: preRenderer }}
        rehypePlugins={[rehypeRaw, [urls, removeBaseUrl]]}
        className="w-full"
      >
        {children}
      </ReactMarkdown>
    </section>
  );
};

function LinkRenderer(props: any) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

function preRenderer(props: any) {
  if (props.children[0]?.type !== "code") {
    return <pre>{props.children}</pre>;
  }

  // tsx로 다 퉁치려고 합니다. JS 외에 언어를 쓰실 시 알아서 등록하세요~
  return (
    <SyntaxHighlighter language="tsx" style={darcula}>
      {props.children[0].props.children[0]}
    </SyntaxHighlighter>
  );
}

function removeBaseUrl(url: any) {
  if (url.href.includes("public")) {
    return url.path.replace(/.*\/public/, "");
  }
  return url.href;
}

export default PostBody;
