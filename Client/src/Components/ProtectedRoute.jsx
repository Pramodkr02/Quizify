import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "../App";

const ProtectedRoute = ({ children }) => {
  const context = useContext(MyContext);

  if (context.authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Checking session…
          </h2>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    );
  }

  if (!context.isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
