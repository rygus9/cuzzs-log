const MenuItems = () => {
  const menuList = ["POST", "TAGS", "ABOUT ME"];

  return (
    <>
      {menuList.map((elem, index) => (
        <li
          className="py-3 cursor-pointer transition-colors duration-300 hover:text-myOrange"
          key={index}
        >
          {elem}
        </li>
      ))}
    </>
  );
};

export default MenuItems;
