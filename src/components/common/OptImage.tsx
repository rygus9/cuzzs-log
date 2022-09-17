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

  return (
    <figure
      className={cls(
        "relative my-[1.7777778em] mx-auto text-lg sm:text-xl w-full",
        loading ? "border border-myOrange" : "border-none"
      )}
      style={{ aspectRatio: `${props.width} / ${props.height}` }}
    >
      {loading && <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading Image...</span>}
      <img
        {...props}
        onLoad={() => setLoading(false)}
        style={{ aspectRatio: `${props.width} / ${props.height}` }}
      ></img>
    </figure>
  );
};

export default OptImage;
