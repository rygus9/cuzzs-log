import "styles/globals.css";
import type { AppProps } from "next/app";
import cls from "src/utils/cls";
import Footer from "src/layout/Footer";
import Header from "src/layout/Header";
import { useEffect } from "react";
import Router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.history.scrollRestoration = "auto";

    const cachedScrollPositions: Array<[number, number]> = [];
    let shouldScrollRestore: null | { x: number; y: number };

    Router.events.on("routeChangeStart", () => {
      cachedScrollPositions.push([window.scrollX, window.scrollY]);
    });

    Router.events.on("routeChangeComplete", () => {
      if (shouldScrollRestore) {
        const { x, y } = shouldScrollRestore;
        window.scrollTo(x, y);
        shouldScrollRestore = null;
      }
      window.history.scrollRestoration = "auto";
    });

    Router.beforePopState(() => {
      if (cachedScrollPositions.length > 0) {
        const scrolledPosition = cachedScrollPositions.pop();
        if (scrolledPosition) {
          shouldScrollRestore = {
            x: scrolledPosition[0],
            y: scrolledPosition[1],
          };
        }
      }
      window.history.scrollRestoration = "manual";
      return true;
    });
  }, []);

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
