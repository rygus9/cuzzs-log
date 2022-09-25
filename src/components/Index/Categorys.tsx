import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Category } from "inbuild/getPostInfo";
import cls from "src/utils/cls";
import CategoryButton from "../common/CategoryButton";

interface CategorysProps {
  categorys: Category[];
  nowCategory: string;
}

const Categorys = ({ categorys, nowCategory }: CategorysProps) => {
  categorys.sort((a, b) => (a.categoryName < b.categoryName ? -1 : 1));

  return (
    <section className={cls("mt-4", "md:mt-8")}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="text-2xl text-myWhite font-bold flex items-center justify-end w-full">
              CATEGORY
              <ChevronUpIcon
                className={cls("w-10 h-10 text-myOrange", open ? "" : "rotate-180 transform")}
              ></ChevronUpIcon>
            </Disclosure.Button>
            <Disclosure.Panel className={cls("px-2 py-4 bg-myGray rounded-md", "sm:px-4 sm:py-6")}>
              <span className="mr-2 mt-2">
                <CategoryButton link="/" selected={nowCategory === "all"}>{`All`}</CategoryButton>
              </span>
              {categorys.map((category) => {
                return (
                  <span key={category.categoryName} className="mr-2 mt-2">
                    <CategoryButton
                      link={"/category/" + category.categoryName.toLowerCase()}
                      selected={nowCategory === category.categoryName.toLowerCase()}
                    >
                      {category.categoryName}
                    </CategoryButton>
                  </span>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  );
};

export default Categorys;
