import React from "react";
import Logo from "../../public/Logo1.png";

const Footer = () => {
  return (
    <footer className="footer p-4 text-black bg-[#e9ecef] flex items-center justify-between">
      <div className="flex h-auto w-full items-center">
        <span className="font-bold w-[100px] h-[40px]">
          <img
            className="w-full h-full object-contain"
            src={Logo}
            alt="Quizify Logo"
          />
        </span>
      </div>
      <div className="text-center w-[30%]">
        © 2025 Quizify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
