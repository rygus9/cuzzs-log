import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Category } from "inbuild/getPostInfo";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import cls from "src/utils/cls";
import Button from "../common/Button";

interface CategorysProps {
  categorys: Category[];
  nowCategory: string;
}

const Categorys = ({ categorys, nowCategory }: CategorysProps) => {
  categorys.sort((a, b) => (a.categoryName < b.categoryName ? -1 : 1));
  const [panelOpen, setPanelOpen] = useState(false);
  const togglePanel = () => setPanelOpen((elem) => !elem);
  const disclosureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { current } = disclosureRef;
    if (current == null) return;

    let beforeScrollHeight = 0;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        let nowScrollHeight = entry.target.scrollHeight;
        if (beforeScrollHeight != nowScrollHeight)
          current.style.setProperty("--content-height", nowScrollHeight.toString() + "px"),
            (beforeScrollHeight = nowScrollHeight);
      }
    });
    observer.observe(current);
  }, [disclosureRef]);

  return (
    <section className="mt-5">
      <article className="flex items-center justify-between">
        <span className="uppercase text-myOrange text-lg sm:text-xl font-semibold">{nowCategory}</span>
        <button
          className="text-xl sm:text-2xl text-myWhite font-bold flex items-center justify-between w-fit"
          onClick={togglePanel}
        >
          <div className="flex items-center">
            CATEGORY
            <ChevronUpIcon
              className={cls(
                "w-10 h-10 text-myOrange transition-transform duration-300 ease-out",
                panelOpen ? "" : "rotate-180"
              )}
            ></ChevronUpIcon>
          </div>
        </button>
      </article>
      <section
        className={cls(
          "bg-myGray rounded-md overflow-hidden transition-all duration-300",
          panelOpen ? "max-h-[var(--content-height)]" : "max-h-0"
        )}
        ref={disclosureRef}
      >
        <div className="pl-4 pr-2 sm:px-4 flex flex-wrap py-2">
          <div className="pr-2 py-1">
            <Link href={"/"} passHref>
              <a className="inline-block h-fit">
                <Button selected={nowCategory === "all"}>{"# " + "All"}</Button>
              </a>
            </Link>
          </div>
          {categorys.map((category) => {
            return (
              <div key={category.categoryName} className="pr-2 py-1 w-fit h-fit">
                <Link href={"/category/" + category.categoryName.toLowerCase()} passHref>
                  <a className="inline-block h-fit">
                    <Button selected={nowCategory === category.categoryName.toLowerCase()}>
                      {"# " + category.categoryName.toUpperCase()}
                    </Button>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Categorys;
