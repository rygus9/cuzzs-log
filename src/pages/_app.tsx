import "styles/globals.css";
import type { AppProps } from "next/app";
import Header from "src/layout/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-myBlack min-h-screen text-myWhite">
      <Header />
      <div className="py-20">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
