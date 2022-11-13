import { useState } from "react";
import cls from "src/utils/cls";

interface OptImageProps {
  alt: string;
  srcSet: string;
  src: string;
  width: string;
  height: string;
  loading: "lazy" | "eager";
  decoding: "sync" | "async" | "auto";
}

const OptImage = (props: OptImageProps) => {
  const [loading, setLoading] = useState(true);
  console.log(loading);

  return (
    <figure
      className={cls("relative my-[1.7777778em] mx-auto text-lg sm:text-xl w-full rounded-lg overflow-hidden")}
      style={{ aspectRatio: `${props.width} / ${props.height}` }}
    >
      <div className="absolute -z-10 w-full h-full bg-stone-400"></div>
      <img
        {...props}
        onLoad={() => setLoading(false)}
        style={{ aspectRatio: `${props.width} / ${props.height}` }}
      ></img>
    </figure>
  );
};

export default OptImage;
