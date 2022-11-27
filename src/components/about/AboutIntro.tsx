import { domAnimation, LazyMotion, m } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 0.5 + i * 0.25;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 0.75, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export default function AboutIntro() {
  return (
    <div className="w-4/5 m-auto max-w-lg pt-20 md:w-3/5 lg:pt-28">
      <LazyMotion features={domAnimation}>
        <m.svg
          viewBox={"0 0 230 70"}
          fill="none"
          initial="hidden"
          animate="visible"
          className={"w-full max-w-2xl m-auto h-fit"}
        >
          <m.path
            d="M32.9454 11.5C-5.55465 -5.50014 -3.05462 56.9998 32.9454 37.9999"
            stroke="#F2AA4C"
            strokeWidth="3"
            variants={draw}
            custom={0.5}
          />
          <m.path
            d="M38.4454 21.5C38.4454 21.5 33.2464 34.3714 38.4454 38.5C42.574 41.7786 47.8168 41.7786 51.9454 38.5C57.1444 34.3714 51.9454 21.5 51.9454 21.5"
            stroke="#F2AA4C"
            strokeWidth="3"
            variants={draw}
            custom={1}
          />
          <m.path
            d="M61.2636 23.026C61.2636 23.026 72.9901 18.4675 77.2636 23.026C83.1215 29.2744 55.4058 31.7776 61.2636 38.026C65.5372 42.5844 77.2636 38.026 77.2636 38.026"
            stroke="#F2AA4C"
            strokeWidth="3"
            variants={draw}
            custom={1.5}
          />
          <m.path
            d="M85.2636 23.026C85.2636 23.026 96.9901 18.4675 101.264 23.026C107.121 29.2744 79.4058 31.7776 85.2636 38.026C89.5372 42.5844 101.264 38.026 101.264 38.026"
            stroke="#F2AA4C"
            strokeWidth="3"
            variants={draw}
            custom={2}
          />
          <m.path
            d="M125.264 23.026C125.264 23.026 113.537 18.4675 109.264 23.026C103.406 29.2744 131.122 31.7776 125.264 38.026C120.99 42.5844 109.264 38.026 109.264 38.026"
            stroke="white"
            strokeWidth="3"
            variants={draw}
            custom={2.5}
          />
          <m.path
            d="M104.445 6C104.445 6 106.022 8.33345 105.945 10C105.877 11.4855 104.445 13.5 104.445 13.5"
            stroke="white"
            strokeWidth="3"
            variants={draw}
            custom={3}
          />
          <m.path
            d="M153.378 9C146.711 27 142.678 57.2 179.878 34"
            stroke="white"
            strokeWidth="3"
            variants={draw}
            custom={3.5}
          />
          <m.path
            d="M198.878 26C198.878 29.0399 198.003 31.7286 196.664 33.6183C195.323 35.5115 193.609 36.5 191.878 36.5C190.146 36.5 188.432 35.5115 187.091 33.6183C185.753 31.7286 184.878 29.0399 184.878 26C184.878 22.9601 185.753 20.2714 187.091 18.3817C188.432 16.4885 190.146 15.5 191.878 15.5C193.609 15.5 195.323 16.4885 196.664 18.3817C198.003 20.2714 198.878 22.9601 198.878 26Z"
            stroke="white"
            strokeWidth="3"
            variants={draw}
            custom={4}
          />
          <m.path
            d="M224.378 22.0002C221.878 16.6668 215.178 9.20016 208.378 22.0002C201.578 34.8002 216.211 27.3335 224.378 22.0002ZM224.378 22.0002C228.378 30.0001 230.778 46.4 208.378 48"
            stroke="white"
            strokeWidth="3"
            variants={draw}
            custom={4.5}
          />
        </m.svg>
      </LazyMotion>
    </div>
  );
}
