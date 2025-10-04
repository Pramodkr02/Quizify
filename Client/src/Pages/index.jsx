import React, { useContext, useEffect, useState } from "react";
import Verify1 from "../../../public/shieldOTP.png";
import OtpBox from "../../components/OtpBox";
import { Button } from "@mui/material";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const history = useNavigate();
  const context = useContext(MyContext);

  const verifyOtp = (e) => {
    e.preventDefault();

    const actionType = localStorage.getItem("actionType");

    if (actionType !== "forgot-password") {
      postData("/api/user/verifyEmail", {
        email: localStorage.getItem("userEmail"),
        otp: otp,
      }).then((res) => {
        if (res?.error === false) {
          context.openAlertBox("success", res?.message);
          localStorage.removeItem("userEmail");
          history("/login");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    } else {
      postData("/api/user/verify-forgot-password-otp", {
        email: localStorage.getItem("userEmail"),
        otp: otp,
      }).then((res) => {
        if (res?.error === false) {
          context.openAlertBox("success", res?.message);
          history("/forgot-password");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    }
  };
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <div className="text-center flex items-center justify-center">
            <img src={Verify1} alt="" width="80" />
          </div>
          <h3 className="text-center text-[18px] text-black mt-4 mb-1">
            Verify OTP
          </h3>

          <p className="text-center mt-0 mb-4">
            OTP send to{" "}
            <span className="text-primary font-bold">
              {localStorage.getItem("userEmail")}
            </span>
          </p>

          <form action="" onSubmit={verifyOtp}>
            <OtpBox length={6} onChange={handleOtpChange} />

            <div className="flex items-center justify-center mt-5 px-3">
              <Button type="submit" className="btn-org btn-lg w-full">
                Verify OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
