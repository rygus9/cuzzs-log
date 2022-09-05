import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import cls from "src/utils/cls";
import TagButton from "../common/TagButton";

interface TagsProps {
  tags: { title: string; count: number }[];
  nowTag: string;
}

const Tags = ({ tags, nowTag }: TagsProps) => {
  tags.sort((a, b) => (a.title < b.title ? -1 : 1));
  const totalCount = tags.reduce((curr, now) => curr + now.count, 0);

  return (
    <section className={cls("mt-4", "md:mt-8")}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="text-2xl text-myWhite font-bold flex items-center justify-end w-full">
              TAGS
              <ChevronUpIcon
                className={cls("w-10 h-10 text-myOrange", open ? "" : "rotate-180 transform")}
              ></ChevronUpIcon>
            </Disclosure.Button>
            <Disclosure.Panel className={cls("px-2 py-4 bg-myGray rounded-md", "sm:px-4 sm:py-6")}>
              <span className="mr-2 mt-2">
                <TagButton link="/" selected={nowTag === "all"}>{`All ${totalCount}`}</TagButton>
              </span>
              {tags.map((tag) => {
                return (
                  <span key={tag.title} className="mr-2 mt-2">
                    <TagButton link={"/tag/" + tag.title.toLowerCase()} selected={nowTag === tag.title.toLowerCase()}>
                      {tag.title + " " + tag.count}
                    </TagButton>
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

export default Tags;
