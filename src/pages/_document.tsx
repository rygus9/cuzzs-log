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
          {/* favicon */}
          <link rel="apple-touch-icon" sizes="57x57" href="/image/favi/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/image/favi/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/image/favi/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/image/favi/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/image/favi/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/image/favi/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/image/favi/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/image/favi/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/image/favi/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/image/favi/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/image/favi/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/image/favi/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/image/favi/favicon-16x16.png" />
          <link rel="manifest" href="/image/favi/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff"></meta>

          {/* SEO */}
          <meta name="keywords" content="Cuzz, cuzzlog, Programming, FrontEnd" />
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
