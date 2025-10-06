import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { MyContext } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { postData } from "../Utils/api";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const validValue = Object.values(formFields).every((el) => el);

  const context = useContext(MyContext);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter full name");
      return false;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email id");
      return false;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password");
      return false;
    }

    postData("/api/user/register", formFields).then((res) => {
      setIsLoading(false);
      localStorage.setItem("userEmail", formFields.email);
      if (res?.error !== true) {
        context.openAlertBox("success", res?.message);
        setFormFields({
          name: "",
          email: "",
          password: "",
        });

        history("/login");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block order-2 md:order-1">
            <div className="rounded-2xl p-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Create your account
              </h2>
              <p className="opacity-90 mb-6">
                Join Quizify to track your performance, compare answers, and
                grow your skills.
              </p>
              <ul className="space-y-2 text-sm opacity-90 list-disc list-inside">
                <li>Fast and secure signup</li>
                <li>Performance history & insights</li>
                <li>Beautiful, responsive UI</li>
              </ul>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-8 max-w-md mx-auto">
              <h3 className="text-center text-2xl font-semibold text-gray-900">
                Register
              </h3>

              <form
                action=""
                className="w-full mt-6 space-y-5"
                onSubmit={handleSubmit}
              >
                <div className="form-group w-full relative">
                  <TextField
                    type="name"
                    id="name"
                    size="small"
                    name="name"
                    value={formFields.name}
                    disabled={isLoading === true ? true : false}
                    label="Full Name"
                    variant="outlined"
                    className="w-full"
                    slotProps={{ input: { sx: { py: 0.75 } } }}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="form-group w-full relative">
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    size="small"
                    value={formFields.email}
                    disabled={isLoading === true ? true : false}
                    label="Email"
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
                    name="password"
                    size="small"
                    value={formFields.password}
                    disabled={isLoading === true ? true : false}
                    label="Password"
                    variant="outlined"
                    className="w-full"
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
                    className="w-full !py-3 !rounded-xl !bg-gradient-to-r !from-purple-600 !to-blue-600 !text-white hover:!opacity-95 flex gap-3"
                  >
                    {isLoading === true ? (
                      <CircularProgress color="inherit" size={22} />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Login
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

export default Register;
