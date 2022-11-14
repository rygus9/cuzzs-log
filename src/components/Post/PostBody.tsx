import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-async-light";
import darcula from "react-syntax-highlighter/dist/esm/styles/prism/darcula";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import cls from "src/utils/cls";
//@ts-ignore
import urls from "rehype-urls";
import getImageLocation from "src/utils/getSrcset";
import OptImage from "../common/OptImage";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("jsx", jsx);

const PostBody = ({ children }: { children: string }) => {
  return (
    <section className={cls("prose prose-lg prose-invert m-auto max-w-none")}>
      <ReactMarkdown
        components={{ a: LinkRenderer, pre: preRenderer, img: imgRenderer }}
        remarkPlugins={[remarkGfm]}
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

function imgRenderer(props: any) {
  const { src, srcset } = getImageLocation(props.src);
  const { width, height, alt } = props;
  return (
    <OptImage
      alt={alt}
      srcSet={srcset}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    ></OptImage>
  );
}

function preRenderer(props: any) {
  if (props.children[0]?.type !== "code") {
    return <pre>{props.children}</pre>;
  }
  const laguage = props.children[0]?.props.className.split("-")[1];

  // tsx로 다 퉁치려고 합니다. JS 외에 언어를 쓰실 시 알아서 등록하세요~
  return (
    <SyntaxHighlighter language={laguage} style={darcula}>
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
