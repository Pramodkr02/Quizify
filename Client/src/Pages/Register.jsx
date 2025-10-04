import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
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

        history("/verify");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto bg-white p-4">
          <h3 className="text-center text-[18px] text-black">
            Register with a new account
          </h3>

          <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type="name"
                id="name"
                name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                label="Full Name *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type="email"
                id="email"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                label="Email Id *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isShowPassword === false ? "password" : "text"}
                id="password"
                name="password"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                label="Password *"
                variant="outlined"
                className="w-full"
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

            <div className="flex items-center w-full mt-3">
              <Button
                type="submit"
                disabled={!validValue}
                className="btn-org btn-lg w-full flex gap-3"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>

            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="link text-[14px] font-[600]">
                Login
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

export default Register;
