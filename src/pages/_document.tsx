import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="bg-myBlack" lang="ko" style={{ scrollBehavior: "smooth" }}>
        <Head>
          <meta charSet="utf-8"></meta>
          <meta property="og:title" content="Cuzz's Log"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:description" content="Cuzz's의 기술 블로그 겸 일기장"></meta>
          <meta name="description" content="Cuzz's의 기술 블로그 겸 일기장" />
          <meta name="keywords" content="Cuzz, Programming, FrontEnd" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
