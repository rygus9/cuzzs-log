import AboutIntro from "src/components/about/AboutIntro";
import { PageSeo } from "src/components/SEO";

const About = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <PageSeo title={"About me"} description="About me - Cuzz" url="/about"></PageSeo>
      <AboutIntro />
    </div>
  );
};

export default About;
