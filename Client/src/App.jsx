import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import ErrorPage from "./Pages/ErrorPage";
import QuizPageWrapper from "./Components/QuizPageWrapper";
import QuizWithAPI from "./Components/QuizWithAPI";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import LoginPage from "./Pages/LoginPage";
import { fetchDataFromApi } from "./Utils/api";
import Register from "./Pages/Register";

const MyContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res) => {
        setUserData(res.data);
        if (res.response?.data?.error === true) {
          if (res.response?.data?.message === "You have not login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            openAlertBox("error", "Session expired. Please login again.");

            window.location.href = "/login";

            setIsLogin(false);
          }
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const values = {
    openAlertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    windowWidth,
    setWindowWidth,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <div className="min-h-screen bg-gray-50 relative">
            <Navigation className="sticky z-10 top-0" />
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />

              {/* Quiz Routes */}
              <Route path="/quiz" element={<QuizPageWrapper />} />
              <Route path="/quiz-api" element={<QuizWithAPI />} />

              {/* Error Route - Must be last */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </div>
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;
export { MyContext };
