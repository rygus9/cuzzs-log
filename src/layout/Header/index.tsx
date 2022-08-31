import cls from "src/utils/cls";
import Logo from "./components/Logo";
import Menu from "./components/Menu";

const Header = () => {
  return (
    <header className={cls("bg-myBlack z-40 animate-moveStatic fixed w-full", "sm:border-b sm:border-myGray")}>
      <article
        className={cls(
          "w-full px-4 h-14 flex justify-between items-center border-b border-myGray",
          "sm:border-0 sm:px-6 sm:h-16",
          "md:w-[90%] md:m-auto",
          "lg:w-4/5"
        )}
      >
        <Logo />
        <Menu />
      </article>
    </header>
  );
};

export default Header;
