import React from "react";
import Logo from "../../public/Logo1.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header flex items-center py-2 px-4 text-black bg-white shaodow-lg justify-between">
      <div className="part1 flex w-[20%] h-auto items-center">
        <span className="font-bold w-[250px] h-[62px]">
          <img
            className="w-full h-full object-contain"
            src={Logo}
            alt="Quizify Logo"
          />
        </span>
      </div>
      <div className="part2 w-[50%] flex gap-15 font-bold">
        <Link to="/home">
          <div className="home">Home</div>
        </Link>
        <Link to="/about">
          <div className="about">About</div>
        </Link>
        <Link to="/dashboard">
          <div className="dashboard">Dashboard</div>
        </Link>
        <Link to="/faq">
          <div className="faq">FAQ</div>
        </Link>
      </div>
      <div className="part3 w-[10%] flex items-center justify-center">
        <Link to="/login">
          <span className="login">Login</span>
        </Link>
        <span className="h-[40px] w-[40px] rounded-full bg-black text-white flex items-center justify-center ml-4 cursor-pointer"></span>
      </div>
    </header>
  );
};

export default Header;
