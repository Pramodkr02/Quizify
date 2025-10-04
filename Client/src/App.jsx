import React, { createContext, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-hot-toast";
import ErrorPage from "./Pages/ErrorPage";
import QuizPageWrapper from "./Components/QuizPageWrapper";
import QuizWithAPI from "./Components/QuizWithAPI";
import Navigation from "./Components/Navigation";

const MyContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  const values = { isLogin, setIsLogin, openAlertBox };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />

            {/* Quiz Routes */}
            <Route path="/quiz" element={<QuizPageWrapper />} />
            <Route path="/quiz-api" element={<QuizWithAPI />} />

            {/* Error Route - Must be last */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
