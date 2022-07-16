import { useState } from "react";
import cls from "src/utils/cls";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import MobileAppend from "./components/MobileAppend";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [closing, setClosing] = useState(false);

  const setAnimationTimeOut = (f: () => void) => {
    setTimeout(f, 250);
  };

  const onOpen = () => {
    if (opening) return;

    setOpening(true);
    setOpen(true);
    setAnimationTimeOut(() => setOpening(false));
  };

  const onClose = () => {
    if (closing) return;

    setClosing(true);
    setAnimationTimeOut(() => {
      setOpen(false);
      setClosing(false);
    });
  };

  return (
    <>
      <header
        className={cls(
          "bg-myBlack z-40 animate-moveStatic fixed w-full",
          "sm:border-b sm:border-myGray"
        )}
      >
        <article
          className={cls(
            "w-full px-6 h-16 flex justify-between items-center border-b border-myGray",
            "sm:border-0",
            "md:w-[90%] md:m-auto",
            "lg:w-4/5"
          )}
        >
          <Logo />
          <Menu
            open={open}
            opening={opening}
            onOpen={onOpen}
            onClose={onClose}
          />
        </article>
        {open && <MobileAppend closing={closing} onClose={onClose} />}
      </header>
    </>
  );
};

export default Header;
