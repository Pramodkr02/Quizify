import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@mui/material";
import Home1 from "../../public/Home2.png";

const Home = () => {
  return (
    <div className="home flex flex-col justify-between h-screen">
      <main className="flex w-full h-[85vh]">
        <div className="left w-[50%] px-16 flex flex-col justify-center gap-3">
          <span className="text-[4.5rem] font-bold">Quizify - Learn.</span>
          <span className="text-[4.5rem] font-bold">Complete. Grow.</span>
          <h1>
            Smart Quiz, Instant feedback real time leaderboards to level up your
            learning experience.
          </h1>

          <div className="flex gap-6">
            <Button variant="contained" color="primary">
              Signup
            </Button>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </div>
        </div>
        <div className="right w-[50%] h-[75vh]">
          <img
            src={Home1}
            alt="Home Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
