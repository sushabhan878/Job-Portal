import { assets } from "../assets/assets.js";
const Footer = () => {
  return (
    <div className="container px-4 2xl-px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
      <img width={160} src={assets.logo} alt="logo" />
      <p className="flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-am:hidden">
        Copyright @Job-Portal.dev | All right reserved
      </p>
      <div className="flex gap-2.5">
        <img width={38} src={assets.facebook_icon} alt="Facebook icon" />
        <img width={38} src={assets.instagram_icon} alt="Instagram Icon" />
        <img width={38} src={assets.twitter_icon} alt="Twitter Icon" />
      </div>
    </div>
  );
};

export default Footer;
