import Link from "next/link";
import cls from "src/utils/cls";

const TextLink = ({ children, link }: { children: string | JSX.Element; link: string }) => (
  <Link href={link}>
    <a className={cls("text-sm sm:text-base", "bg-myBlack text-myOrange cursor-pointer duration-200")}>{children}</a>
  </Link>
);

export default TextLink;
