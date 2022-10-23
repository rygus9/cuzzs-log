import { motion } from "framer-motion";
import Head from "next/head";
import { PageSeo } from "src/components/SEO";

const About = () => {
  return (
    <>
      <PageSeo title={"About me"} description="About me - Cuzz" url="/about"></PageSeo>
      <motion.div
        animate={{
          opacity: [0, 1],
          scale: [1.2, 1],
        }}
        transition={{ duration: 1.2 }}
        className="text-center mt-20"
      >
        <h1 className="text-4xl uppercase tracking-wide">Coming Soon</h1>
        <p className="text-lg text-stone-400">뭘 그릴지 고민 중이라 화면이 구상되면 할게요.</p>
      </motion.div>
    </>
  );
};

export default About;
