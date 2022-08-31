import "styles/globals.css";
import type { AppProps } from "next/app";
import Header from "src/layout/Header";
import cls from "src/utils/cls";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-myBlack min-h-screen text-myWhite">
      <Header />
      <main className={cls("m-auto px-4 max-w-4xl w-full pt-20", "md:px-8")}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
