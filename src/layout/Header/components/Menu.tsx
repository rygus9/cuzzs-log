import Link from "next/link";
import cls from "src/utils/cls";

const menuList = [
  { link: "/", title: "POSTS" },
  { link: "/about", title: "ABOUT ME" },
];

const Menu = () => {
  return (
    <>
      <ul className={cls("flex justify-evenly items-center space-x-4", "sm:text-lg sm:space-x-6")}>
        {menuList.map((elem, index) => (
          <Link href={elem.link} key={index}>
            <li
              className={cls(
                "py-3 cursor-pointer transition-colors duration-300 text-sm",
                "hover:text-myOrange",
                "sm:text-base"
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

export default Menu;
