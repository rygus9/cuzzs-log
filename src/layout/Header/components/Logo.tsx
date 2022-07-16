import cls from "src/utils/cls";

const Logo = () => {
  return (
    <div
      className={cls(
        "text-2xl font-bold cursor-default tracking-wide",
        "sm:text-3xl",
        "hover:animate-pulseFast"
      )}
    >
      <strong className="text-myOrange">Cuzz</strong>
      {"'"}s LOG
    </div>
  );
};

export default Logo;
