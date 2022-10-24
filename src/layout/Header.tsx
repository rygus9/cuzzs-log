import Link from "next/link";
import cls from "src/utils/cls";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

const Logo = () => (
  <Link href="/">
    <a
      className={cls(
        "block text-2xl font-bold cursor-pointer tracking-wide h-full",
        "md:text-3xl",
        "hover:animate-pulseFast"
      )}
    >
      <div className="flex justify-center items-center h-full">
        <img src="/image/common/MyLogo.png" width="35" className="mr-3 inline-block"></img>
        <strong className="text-myOrange inline-block">Cuzz</strong>
        <span className="inline-block">{"'s "}LOG</span>
      </div>
    </a>
  </Link>
);

const menuList = [
  { link: "/", title: "POSTS" },
  { link: "/about", title: "ABOUT ME" },
];

const Menu = () => {
  return (
    <ul className={cls("justify-center items-center space-x-6", "hidden sm:flex")}>
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
  );
};

const MobileMenu = ({ mobileMenuOpen, menuClick }: { mobileMenuOpen: boolean; menuClick: () => void }) => {
  return (
    <div className="sm:hidden">
      <Bars3BottomRightIcon
        className={cls("w-8 h-8 font-bold cursor-pointer", mobileMenuOpen && "hidden")}
        onClick={menuClick}
      ></Bars3BottomRightIcon>
      <XMarkIcon
        className={cls("w-8 h-8 font-bold cursor-pointer", !mobileMenuOpen && "hidden")}
        onClick={menuClick}
      ></XMarkIcon>
      <ul
        className={cls(
          "top-14 left-0 bg-myBlack absolute overflow-y-hidden duration-300 w-full flex justify-center items-center space-x-10",
          "border-b border-stone-500",
          !mobileMenuOpen ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
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
    </div>
  );
};

let headerPos = 0;
let beforeScroll = 0;
let turnUp = false;

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuClick = () => setMobileMenuOpen((elem) => !elem);

  useEffect(() => {
    const { current } = headerRef;
    if (current == null) return;
    let initStandard = mobileMenuOpen ? -104 : -64;
    const scroll = () => {
      let scheduledAnimationFrame = false;
      let lastScrollY = window.scrollY;
      let lastWidth = window.innerWidth;

      if (scheduledAnimationFrame) {
        return;
      }
      scheduledAnimationFrame = true;
      requestAnimationFrame(() => {
        let nowStandard = initStandard;
        if (lastWidth >= 640) nowStandard = -64;

        if (beforeScroll > lastScrollY) {
          if (turnUp == false) (headerPos = headerPos < nowStandard ? nowStandard : headerPos), (turnUp = true);
          else headerPos = headerPos - lastScrollY + beforeScroll < 0 ? headerPos + (-lastScrollY + beforeScroll) : 0;
        } else {
          if (turnUp == true) turnUp = false;
          headerPos = headerPos + (-lastScrollY + beforeScroll);
        }
        beforeScroll = lastScrollY;
        current.style.marginTop = `${headerPos}px`;
        scheduledAnimationFrame = false;
      });
    };
    window.addEventListener("scroll", scroll, false);

    return () => {
      window.removeEventListener("scroll", scroll, false);
    };
  }, [headerRef, mobileMenuOpen]);

  return (
    <header className={cls("bg-myBlack z-40 animate-moveStatic fixed w-full ")} ref={headerRef}>
      <article
        className={cls(
          "w-full px-4 h-14 flex justify-between items-center max-w-4xl m-auto",
          "sm:border-0 sm:px-6 sm:h-16",
          "lg:w-4/5"
        )}
      >
        <Logo />
        <Menu />
        <MobileMenu mobileMenuOpen={mobileMenuOpen} menuClick={menuClick} />
      </article>
    </header>
  );
};

export default Header;
