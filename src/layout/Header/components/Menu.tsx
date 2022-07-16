import cls from "src/utils/cls";
import Close from "../icons/Close";
import Hamberger from "../icons/Hamberger";
import MenuItems from "./MenuItems";

const Menu = ({
  open,
  opening,
  onClose,
  onOpen,
}: {
  open: boolean;
  opening: boolean;
  onClose: () => void;
  onOpen: () => void;
}) => {
  return (
    <>
      {open && !opening ? (
        <i className="cursor-pointer sm:hidden" onClick={() => onClose()}>
          <Close />
        </i>
      ) : (
        <i className="cursor-pointer sm:hidden" onClick={() => onOpen()}>
          <Hamberger />
        </i>
      )}
      <ul
        className={cls(
          "hidden",
          "sm:static sm:w-auto sm:flex sm:justify-evenly sm:items-center sm:space-x-6 sm:text-lg"
        )}
      >
        <MenuItems />
      </ul>
    </>
  );
};

export default Menu;
