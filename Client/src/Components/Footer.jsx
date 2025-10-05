import React from "react";
import Logo from "../../public/Logo1.png";

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="footer fixed bottom-0 inset-x-0 p-4 text-black bg-[#e9ecef] border-t border-gray-200 z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center mb-2 sm:mb-0">
          <img
            className="w-24 h-10 object-contain"
            src={Logo}
            alt="Quizify Logo"
          />
        </div>

        {/* Copyright */}
        <div className="text-center text-sm sm:text-base">
          © 2025 Quizify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
