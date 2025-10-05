import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import ErrorPage from "./Pages/ErrorPage";
import QuizPageWrapper from "./Components/QuizPageWrapper";
import QuizWithAPI from "./Components/QuizWithAPI";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import { fetchDataFromApi } from "./Utils/api";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Pages/Register";

const MyContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [authLoading, setAuthLoading] = useState(true);

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  useEffect(() => {
    // On app mount, validate token and hydrate auth state without redirecting
    const bootstrapAuth = async () => {
      setAuthLoading(true);
      const token = localStorage.getItem("accessToken");
      if (token && token !== "") {
        try {
          const res = await fetchDataFromApi(`/api/user/user-details`);
          if (res?.data?._id || res?.success) {
            setUserData(res.data || res.user);
            setIsLogin(true);
          } else if (res?.response?.status === 401) {
            setIsLogin(false);
          } else {
            setIsLogin(!!res?.data);
          }
        } catch (e) {
          setIsLogin(false);
        } finally {
          setAuthLoading(false);
        }
      } else {
        setIsLogin(false);
        setAuthLoading(false);
      }
    };
    bootstrapAuth();
  }, []);

  const values = {
    openAlertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    windowWidth,
    setWindowWidth,
    authLoading,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <div className="min-h-screen bg-gray-50 relative pt-16 pb-16">
            <Navigation />
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/quiz"
                element={
                  <ProtectedRoute>
                    <QuizPageWrapper />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz-api"
                element={
                  <ProtectedRoute>
                    <QuizWithAPI />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

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
