import GithubIcon from "src/components/common/Icon/GithubIcon";

const Footer = () => (
  <footer className="pt-6 pb-12 text-center border-t border-gray-600">
    <div className="flex items-center justify-center mb-2">
      <a href="https://github.com/rygus9" target="blank">
        <GithubIcon></GithubIcon>
      </a>
    </div>
    By <span className="text-myOrange text-xl ml-2">Cuzz</span>
  </footer>
);

export default Footer;
