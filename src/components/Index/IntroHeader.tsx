import { TagIcon } from "@heroicons/react/20/solid";
import cls from "src/utils/cls";

interface IntroHeaderProps {
  category?: string;
}

const IntroHeader = ({ category = "All" }: IntroHeaderProps) => (
  <header className={cls("pt-6 flex items-center", "sm:pt-10", "md:pt-12")}>
    <h3 className="flex items-center text-3xl font-bold tracking-wider uppercase sm:text-4xl lg:text-5xl">
      <TagIcon className="w-8 h-8 lg:w-12 lg:h-12 mr-2 text-myOrange"></TagIcon> {category}
    </h3>
  </header>
);

export default IntroHeader;
