import Link from "next/link";
import cls from "src/utils/cls";

const menuList = ["POSTS", "ABOUT ME"];

const Menu = () => {
  return (
    <>
      <ul className={cls("flex justify-evenly items-center space-x-4", "sm:text-lg sm:space-x-6")}>
        {menuList.map((elem, index) => (
          <Link href={"/"} key={index}>
            <li className="py-3 cursor-pointer transition-colors duration-300 hover:text-myOrange" key={index}>
              {elem}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Menu;
