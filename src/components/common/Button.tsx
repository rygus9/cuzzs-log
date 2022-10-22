import cls from "src/utils/cls";

interface CategoryButonProps {
  children: string | JSX.Element;
  selected?: boolean;
  onClick?: (e: any) => {};
}

const Button = ({ children, selected = false, onClick }: CategoryButonProps) => {
  return (
    <button
      className={cls(
        "py-1.5 px-2.5 text-xs sm:py-2 sm:px-3 sm:text-sm",
        "border border-myOrange rounded-md bg-myBlack text-myWhite cursor-pointer duration-150",
        selected ? "ring-1 ring-myOrange font-bold" : "hover:ring-1 hover:ring-myOrange hover:scale-105"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
