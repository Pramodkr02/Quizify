import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../public/Logo1.png";
import { FaHome, FaUser, FaChartBar } from "react-icons/fa";
import { SiSimplelogin } from "react-icons/si";
import { useContext } from "react";
import { MyContext } from "../App";
import { fetchDataFromApi } from "../Utils/api";
import { IoMdLogOut } from "react-icons/io";
import { Button } from "@mui/material";

const Navigation = () => {
  const context = useContext(MyContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const logout = () => {
    fetchDataFromApi(`/api/user/logout`, { withCredentials: true }).then(
      (res) => {
        console.log(res);
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    );
  };

  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/dashboard", label: "Dashboard", icon: <FaChartBar /> },
    { path: "/profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className="fixed top-0 inset-x-0 bg-white shadow-lg border-b border-gray-200 z-50"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold w-[250px] h-[62px]">
                <img
                  className="w-full h-full object-contain"
                  src={Logo}
                  alt="Quizify Logo"
                />
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {context.isLogin === true ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md flex items-center justify-center text-sm font-bold transition-colors duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-1">{item.icon}</span>
                    <span className="">{item.label}</span>
                  </Link>
                ))}
                <Button
                  onClick={logout}
                  variant="contained"
                  color="error"
                  size="small"
                  className="ml-2"
                >
                  <span className="mr-1">
                    <IoMdLogOut />
                  </span>
                  <span className="">Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="flex items-center"
                >
                  <span className="mr-1">
                    <SiSimplelogin />
                  </span>
                  <span className="">Login</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              onClick={() => {
                // Simple mobile menu toggle - you can enhance this
                const mobileMenu = document.getElementById("mobile-menu");
                if (mobileMenu) {
                  mobileMenu.classList.toggle("hidden");
                }
              }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="md:hidden hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {context.isLogin === true ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-900 hover:bg-red-50 transition-colors duration-200"
                >
                  <span className="mr-2">
                    <IoMdLogOut />
                  </span>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
              >
                <span className="mr-2">
                  <SiSimplelogin />
                </span>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
