import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../Utils/api";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();
  const validValue = Object.values(formFields).every((el) => el);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email id");
      return false;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password");
      return false;
    }

    postData("/api/user/login", formFields, { withCredentials: true }).then(
      (res) => {
        console.log(res);
        if (res?.error !== true) {
          setIsLoading(false);
          context.openAlertBox("success", res?.message);
          setFormFields({
            email: "",
            password: "",
          });

          localStorage.setItem("accessToken", res?.data.accessToken);
          localStorage.setItem("refreshToken", res?.data.refreshToken);
          context.setIsLogin(true);
          history("/");
        } else {
          context.openAlertBox("error", res?.message);
          setIsLoading(false);
          console.log("Error");
        }
      }
    );
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Welcome back
              </h2>
              <p className="opacity-90 mb-6">
                Log in to continue your learning journey. Track performance,
                compare answers, and improve faster.
              </p>
              <ul className="space-y-2 text-sm opacity-90 list-disc list-inside">
                <li>Secure authentication</li>
                <li>Responsive, accessible design</li>
                <li>Real-time quiz experience</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-8 max-w-md mx-auto">
              <h3 className="text-center text-2xl font-semibold text-gray-900">
                Login to your account
              </h3>

              <form onSubmit={handleSubmit} className="w-full mt-6 space-y-5">
                <div className="form-group w-full relative">
                  <TextField
                    type="email"
                    id="email"
                    label="Email"
                    name="email"
                    size="small"
                    value={formFields.email}
                    disabled={isLoading === true ? true : false}
                    variant="outlined"
                    className="w-full"
                    slotProps={{ input: { sx: { py: 0.75 } } }}
                    onChange={onChangeInput}
                  />
                </div>

                <div className="form-group w-full relative">
                  <TextField
                    type={isShowPassword === false ? "password" : "text"}
                    id="password"
                    label="Password"
                    variant="outlined"
                    className="w-full"
                    name="password"
                    size="small"
                    value={formFields.password}
                    disabled={isLoading === true ? true : false}
                    slotProps={{ input: { sx: { py: 0.75 } } }}
                    onChange={onChangeInput}
                  />
                  <Button
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="!absolute top-1/2 -translate-y-1/2 right-2 z-10 !w-[36px] !h-[36px] !min-w-[36px] !rounded-full !text-gray-700 hover:!bg-gray-100"
                  >
                    {isShowPassword === true ? (
                      <FaEye className="!text-[18px] opacity-75" />
                    ) : (
                      <FaEyeSlash className="!text-[18px] opacity-75" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center w-full">
                  <Button
                    type="submit"
                    disabled={!validValue || isLoading}
                    className="w-full !py-3 !rounded-xl !bg-gradient-to-r !from-blue-600 !to-purple-600 !text-white hover:!opacity-95 flex gap-3"
                  >
                    {isLoading === true ? (
                      <CircularProgress color="inherit" size={22} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-600">
                  Not registered?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
