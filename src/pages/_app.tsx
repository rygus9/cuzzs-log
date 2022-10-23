import "styles/globals.css";
import type { AppProps } from "next/app";
import cls from "src/utils/cls";
import Footer from "src/layout/Footer";
import Header from "src/layout/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-myBlack min-h-screen text-myWhite">
      <Header />
      <main className={cls("m-auto px-4 max-w-4xl w-full pt-20 pb-20 min-h-screen", "md:px-8")}>
        <Component {...pageProps} />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MyApp;
