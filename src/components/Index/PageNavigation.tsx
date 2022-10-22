import Link from "next/link";
import cls from "src/utils/cls";
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/react/20/solid";

interface PageNavigationProps {
  nowPage: number;
  maxPage: number;
  baseLink: string;
}

const PageNavigation = ({ nowPage, maxPage, baseLink }: PageNavigationProps) => {
  return (
    <section className="flex items-center justify-between mt-6">
      <Link prefetch={nowPage == 1 ? false : true} href={nowPage == 2 ? baseLink : baseLink + "page/" + (nowPage - 1)}>
        <div className={nowPage == 1 ? "invisible" : ""}>
          <PageButton>
            <div className="flex items-center relative right-0 sm:right-1">
              <ChevronDoubleLeftIcon className="w-6 h-6 sm:w-8 sm:h-8"></ChevronDoubleLeftIcon>
              <span className="hidden sm:inline-block">이전 페이지</span>
            </div>
          </PageButton>
        </div>
      </Link>
      <div className="justify-center items-center align-top space-x-2 text-xl sm:text-2xl">
        <span>{nowPage}</span> <span className="text-lg">of</span> <span>{maxPage}</span>
      </div>
      <Link prefetch={nowPage == maxPage ? false : true} href={baseLink + "page/" + (nowPage + 1)}>
        <div className={nowPage == maxPage ? "invisible" : ""}>
          <PageButton>
            <div className="flex items-center relative left-0 sm:left-1">
              <span className="hidden sm:inline-block">다음 페이지</span>
              <ChevronDoubleRightIcon className="w-6 h-6 sm:w-8 sm:h-8"></ChevronDoubleRightIcon>
            </div>
          </PageButton>
        </div>
      </Link>
    </section>
  );
};

const PageButton = ({ children }: { children: JSX.Element | string }) => {
  return (
    <button
      className={cls(
        "py-2 px-4 bg-stone-600 text-stone-100 rounded-md text-base duration-200 sm:py-2.5 sm:px-5 sm:text-lg",
        "hover:bg-stone-500"
      )}
    >
      {children}
    </button>
  );
};

export default PageNavigation;
