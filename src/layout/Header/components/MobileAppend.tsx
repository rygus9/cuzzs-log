import { useEffect, useRef } from "react";
import cls from "src/utils/cls";
import MenuItems from "./MenuItems";

const MobileAppend = ({
  closing,
  onClose,
}: {
  closing: boolean;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLUListElement>(null);

  return (
    <ul
      className={cls(
        "w-full flex space-x-6 items-center justify-center bg-myGray",
        closing ? "animate-moveBlur" : "animate-moveClear",
        "sm:hidden"
      )}
      ref={ref}
      onClick={onClose}
    >
      <MenuItems />
    </ul>
  );
};

export default MobileAppend;
