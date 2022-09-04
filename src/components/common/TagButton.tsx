import Link from "next/link";
import cls from "src/utils/cls";

interface TagButonProps {
  size?: "sm" | "base";
  children: string;
}

const TagButton = ({ children, size = "base" }: TagButonProps) => {
  return (
    <Link href={`/tag/${children.toLowerCase()}`}>
      <a
        className={cls(
          size === "base" && "sm:py-2 sm:px-3 sm:text-sm",
          "py-1.5 px-2.5 text-xs",
          "border border-myOrange rounded-md bg-myBlack text-myWhite cursor-pointer",
          "hover:ring-1 hover:ring-myOrange"
        )}
      >
        {"# " + children.toUpperCase()}
      </a>
    </Link>
  );
};

export default TagButton;
