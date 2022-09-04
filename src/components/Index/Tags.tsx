import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import cls from "src/utils/cls";
import TagButton from "../common/TagButton";

interface TagsProps {
  tags: string[];
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <section className={cls("mt-4", "md:mt-8")}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="text-2xl text-myWhite font-bold flex items-center justify-end w-full">
              TAGS
              <ChevronUpIcon
                className={cls("w-10 h-10 text-myOrange", open ? "rotate-180 transform" : "")}
              ></ChevronUpIcon>
            </Disclosure.Button>
            <Disclosure.Panel className={cls("px-2 py-4 bg-myGray rounded-md", "sm:px-4 sm:py-6")}>
              {tags.map((tag: string) => (
                <TagButton key={tag}>{tag}</TagButton>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  );
};

export default Tags;
