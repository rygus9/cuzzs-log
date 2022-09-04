import Link from "next/link";
import cls from "src/utils/cls";

interface TagButonProps {
  size?: "sm" | "base";
  type?: "string" | "button";
  children: string;
}

const TagButton = ({ children, type = "button" }: TagButonProps) => {
  return (
    <>
      {type === "button" && (
        <Link href={`/tag/${children.toLowerCase()}`}>
          <a
            className={cls(
              "py-1.5 px-2.5 text-xs sm:py-2 sm:px-3 sm:text-sm",
              "border border-myOrange rounded-md bg-myBlack text-myWhite cursor-pointer",
              "hover:ring-1 hover:ring-myOrange"
            )}
          >
            {"# " + children.toUpperCase()}
          </a>
        </Link>
      )}
      {type === "string" && (
        <Link href={`/tag/${children.toLowerCase()}`}>
          <a className={cls("text-sm", "bg-myBlack text-myOrange cursor-pointer", "hover:underline")}>
            {"# " + children.toUpperCase()}
          </a>
        </Link>
      )}
    </>
  );
};

export default TagButton;
