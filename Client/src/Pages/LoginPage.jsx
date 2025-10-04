import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";

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

  const forgotPassword = () => {
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email id");
      return false;
    } else {
      context.openAlertBox("success", `OTP sent to ${formFields.email}`);
      localStorage.setItem("userEmail", formFields.email);
      localStorage.setItem("actionType", "forgot-password");

      postData("/api/user/forgot-password", {
        email: formFields.email,
      }).then((res) => {
        if (res?.error === false) {
          context.openAlertBox("success", res?.message);
          history("/verify");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    }
  };

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
        }
      }
    );
  };
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto bg-white p-4">
          <h3 className="text-center text-[18px] text-black">
            Login to your account
          </h3>

          <form onSubmit={handleSubmit} className="w-full mt-5">
            <div className="form-group w-full mb-5 relative">
              <TextField
                type="email"
                id="email"
                label="Email *"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isShowPassword === false ? "password" : "text"}
                id="password"
                label="Password *"
                variant="outlined"
                className="w-full"
                name="password"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="!absolute top-[10px]    right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black "
              >
                {isShowPassword === true ? (
                  <FaEye className="!text-[20px] opacity-75" />
                ) : (
                  <FaEyeSlash className="!text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <a
              className="link cursor-pointer text-[14px] font-[600]"
              onClick={forgotPassword}
            >
              Forgot Password?
            </a>

            <div className="flex items-center w-full mt-3">
              <Button
                type="submit"
                disabled={!validValue}
                className="btn-org btn-lg w-full flex gap-3"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>

            <p className="text-center">
              Not Registerd?{" "}
              <Link to="/register" className="link text-[14px] font-[600]">
                Sign Up
              </Link>
            </p>

            <p className="text-center font-[500]">
              Or continue with social account
            </p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black">
              <FcGoogle className="text-[20px]" />
              Login with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
