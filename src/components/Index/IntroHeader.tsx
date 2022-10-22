import cls from "src/utils/cls";

interface IntroHeaderProps {
  category?: string;
}

const IntroHeader = ({ category = "All" }: IntroHeaderProps) => (
  <header className={cls("pt-6 flex items-center", "sm:pt-10", "md:pt-12")}>
    <h3 className="text-3xl font-bold tracking-wider uppercase sm:text-4xl lg:text-5xl">{category}</h3>
  </header>
);

export default IntroHeader;
