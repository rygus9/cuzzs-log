import Link from "next/link";
import cls from "src/utils/cls";

const Logo = () => {
  return (
    <Link href="/">
      <a className={cls("text-2xl font-bold cursor-pointer tracking-wide", "sm:text-3xl", "hover:animate-pulseFast")}>
        <strong className="text-myOrange">Cuzz</strong>
        {"'"}s LOG
      </a>
    </Link>
  );
};

export default Logo;
