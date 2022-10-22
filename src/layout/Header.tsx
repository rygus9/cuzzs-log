import Link from "next/link";
import cls from "src/utils/cls";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const Logo = () => (
  <Link href="/">
    <a className={cls("text-2xl font-bold cursor-pointer tracking-wide", "sm:text-3xl", "hover:animate-pulseFast")}>
      <strong className="text-myOrange">Cuzz</strong>
      {"'"}s LOG
    </a>
  </Link>
);

const menuList = [
  { link: "/", title: "POSTS" },
  { link: "/about", title: "ABOUT ME" },
];

const Menu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuClick = () => setMobileMenuOpen((elem) => !elem);
  return (
    <>
      <Bars3BottomRightIcon
        className={cls("w-8 h-8 font-bold cursor-pointer sm:hidden select-none", mobileMenuOpen && "hidden")}
        onClick={menuClick}
      ></Bars3BottomRightIcon>
      <XMarkIcon
        className={cls("w-8 h-8 font-bold cursor-pointer sm:hidden select-none", !mobileMenuOpen && "hidden")}
        onClick={menuClick}
      ></XMarkIcon>
      <ul
        className={cls(
          "top-12 left-0 bg-myBlack absolute w-full flex justify-center items-center space-x-10",
          "border-b border-stone-500",
          !mobileMenuOpen && "hidden",
          "sm:flex sm:static sm:space-x-6 sm:w-fit sm:bg-inherit sm:-translate-x-0 sm:border-0"
        )}
      >
        {menuList.map((elem, index) => (
          <Link href={elem.link} key={index}>
            <li
              className={cls(
                "py-3 cursor-pointer transition-colors duration-300 text-base font-semibold",
                "hover:text-myOrange",
                "sm:text-lg"
              )}
              key={index}
            >
              {elem.title}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

const Header = () => {
  return (
    <header className={cls("bg-myBlack z-40 animate-moveStatic fixed w-full border-b border-stone-500")}>
      <article
        className={cls(
          "w-full px-4 h-14 flex justify-between items-center",
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
