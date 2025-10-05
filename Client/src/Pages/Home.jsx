import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../App";
import { Button } from "@mui/material";
import Home1 from "../../public/Home2.png";
import { FaPlay, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Home = () => {
  const context = useContext(MyContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="flex flex-col lg:flex-row w-full min-h-screen">
        <div className="left w-full lg:w-[50%] px-8 lg:px-16 flex flex-col justify-center gap-6 py-12">
          <div className="space-y-4">
            <span className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quizify - Learn.
            </span>
            <span className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Complete. Grow.
            </span>
          </div>
          <h1 className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Smart Quiz, Instant feedback real time leaderboards to level up your
            learning experience.
          </h1>

          {context.isLogin ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/quiz-api">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  startIcon={<FaPlay />}
                >
                  Start Quiz
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  startIcon={<FaUserPlus />}
                >
                  Signup
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  className="w-full sm:w-auto border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  startIcon={<FaSignInAlt />}
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="right w-full lg:w-[50%] h-[50vh] lg:h-[75vh] flex items-center justify-center">
          <img
            src={Home1}
            alt="Home Logo"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
