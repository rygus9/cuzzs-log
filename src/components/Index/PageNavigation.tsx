import Button from "../common/Button";

interface PageNavigationProps {
  nowPage: number;
  maxPage: number;
  baseLink: string;
}

const PageNavigation = ({ nowPage, maxPage, baseLink }: PageNavigationProps) => {
  return (
    <section className="flex items-center justify-between mt-6">
      <Button
        size="base"
        className={nowPage == 1 ? "invisible" : ""}
        link={nowPage == 2 ? baseLink : baseLink + "page/" + (nowPage - 1)}
        prefetch={nowPage == 1 ? false : true}
      >
        이전 페이지
      </Button>
      <div className="justify-center items-center align-top space-x-2">
        <span className="text-xl">{nowPage}</span> <span>of</span> <span className="text-xl">{maxPage}</span>
      </div>
      <Button
        size="base"
        className={nowPage == maxPage ? "invisible" : ""}
        link={baseLink + "page/" + (nowPage + 1)}
        prefetch={nowPage == maxPage ? false : true}
      >
        다음 페이지
      </Button>
    </section>
  );
};

export default PageNavigation;
