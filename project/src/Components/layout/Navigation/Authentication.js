import { Box, Button, Typography, Backdrop } from "@mui/material";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import ClearIcon from "@mui/icons-material/Clear";
import "intl-tel-input/build/css/intlTelInput.css";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { API_URL } from "../../../config/config";
import { t } from "i18next";
const Authentication = ({ login, isLogin }) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();

  // function for Capture Code Verification
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }

  const handleClose = () => {
    isLogin(false);
  };

  // Function for SignUP
  function onSignup() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, ph, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  //function to verify user
  const verifyUser = () => {
    var verifyUser = new FormData();
    verifyUser.append("mobile", ph)
    verifyUser.append("country_code", 91);

    var requestOptions = {
      method: 'POST',
      body: verifyUser,
      redirect: 'follow'
    };

    fetch(`${API_URL}/verify_user`, requestOptions)
      .then(response => {
        if(response.message_code === 101){
          console.log("Mobile number already registered and Active");
        }
        else if(response.message_code === 102){
          console.log("Mobile number is not registered");
        }
        else if(response.message_code === 103){
          console.log("Mobile number is De active");
        }
      })
      .catch(error => console.log('error', error));
  }

  //function to getting token when user logged in
  const getToken = () => {
    var formdata = new FormData();
    formdata.append("mobile", ph.slice(2,12));
    formdata.append("country_code", "+91");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API_URL}/manage_user`, requestOptions)
      .then((response) => response.json())
      .then((result) => localStorage.setItem("Token", result.token))
      .catch((error) => console.log("error", error));
  };

  //Function for Otp Verification
  function onOTPVerify() {
    if (otp === "") {
      // Check if the OTP field is empty
      toast.error("Please enter the verification code!");
      return;
    }

    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setLoading(false);
        if (res.user) {
          verifyUser();
          getToken();
          setUser(res.user);
          isLogin(false);
          toast.success("Login success..!");
          // setTimeout(() => {
          //   // window.location.reload();
          // }, 1000);
        } else {
          setLoading(false);
          toast.error("Invalid verification code. Please try again!");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Failed to verify OTP. Please try again later.");
      });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onOTPVerify();
    }
  };

  const formattedPh =
    ph && ph.length >= 2
      ? "+" + ph.substring(0, 2) + " - " + ph.substring(2)
      : "";

  //Resend OTP
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [disableResend, setDisableResend] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const onResendOTP = () => {
    onSignup(); // The function to send OTP

    setOtpSent(true);
    setDisableResend(true);

    const id = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setIntervalId(id); // Store the intervalId in state

    setTimeout(() => {
      clearInterval(id);
      setResendTimer(60);
      setDisableResend(false);
    }, 60000);
  };

  useEffect(() => {
    // Clear the timer interval when the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={login}
      >
        <Box
          sx={{
            color: "black",
            background: theme.palette.background.box,
            width: "400px",
            borderRadius: "10px",
            textAlign: "center",
            margin: 30,
          }}
        >
          <Box marginLeft={3} marginRight={3} marginTop={3} marginBottom={3}>
            <Box display={"flex"}>
              <Typography marginRight={"auto"} fontSize={20}>
                {t("Login")}
              </Typography>
              {
                <ClearIcon
                  onClick={handleClose}
                  sx={{ color: theme.palette.icons.icon }}
                />
              }
            </Box>
            <Box id="recaptcha-container"></Box>
            {user ? (
              <>
                {
                  (localStorage.setItem("ContactInfo", ph),
                    localStorage.setItem("isLoggedIn", "true"))
                }
              </>
            ) : (
              <Box sx={{ justifyContent: "center" }}>
                <Box sx={{ textAlign: "center", marginTop: "60px" }}></Box>
                {showOTP ? (
                  <>
                    <Box mt={4}>
                      <label
                        htmlFor="otp"
                        className="font-bold text-xl text-white text-center"
                      >
                        <Typography
                          sx={{
                            color: theme.palette.color.navLink,
                            letterSpacing: 1,
                          }}
                          variant="h6"
                          fontSize={22}
                        >
                          {t("Enter Verification Code")}
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.color.secondary,
                            fontSize: 15,
                            mt: 1,
                          }}
                        >
                          {t("We have Sent a Verification code to")} <br />
                          <Typography
                            color={theme.palette.color.phone}
                            fontSize={15}
                          >
                            {formattedPh}
                          </Typography>
                        </Typography>
                      </label>
                    </Box>
                    <Box marginTop={5} onKeyPress={handleKeyPress}>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container"
                      ></OtpInput>
                    </Box>
                    <br />
                    <br />
                    <Button
                      variant="outlined"
                      sx={{
                        color: "black",
                        border: "1px solid gray",
                        textTransform: "none",
                      }}
                      onClick={onResendOTP}
                      disabled={disableResend}
                    >
                      {disableResend
                        ? `Resend OTP :${resendTimer}s`
                        : "Resend OTP"}
                    </Button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button onClick={onOTPVerify}>
                      <Button
                        variant="contained"
                        size="medium"
                        fullWidth
                        sx={{ textTransform: "none" }}
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        {t("Verify and Process")}
                      </Button>
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        color: theme.palette.color.navLink,
                        letterSpacing: 1,
                      }}
                      marginBottom={2}
                      fontSize={22}
                      variant="h6"
                    >
                      {t("Welcome!")}
                    </Typography>
                    <Typography
                      sx={{ color: theme.palette.color.navLink }}
                      fontSize={14}
                    >
                      {t(
                        "Enter Phone number to continue and we will a verification code to this number"
                      )}
                    </Typography>
                    <Box
                      sx={{
                        marginTop: 5,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <PhoneInput
                        country={"in"}
                        value={ph}
                        onChange={setPh}
                        containerStyle={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                        }}
                        onEnterKeyPress={onSignup}
                      />
                    </Box>
                    <br />
                    <Button
                      onClick={onSignup}
                      variant="contained"
                      disableElevation
                      size="large"
                      fullWidth
                      sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>{t("Login to Continue")}</span>
                    </Button>{" "}
                    <br /> <br /> <br />
                    <Typography sx={{ color: "gray" }} fontSize={15}>
                      {t("By Continue you agree to out")}
                    </Typography>
                    <Typography
                      fontSize={15}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      <NavLink
                        style={{ color: theme.palette.color.navLink }}
                        to={"/terms-and-conditions"}
                        onClick={() => isLogin(false)}
                      >
                        {t("Terms of services")}
                      </NavLink>{" "}
                      &nbsp;
                      <p style={{ color: theme.palette.color.navLink }}>
                        &
                      </p>{" "}
                      &nbsp;
                      <NavLink
                        style={{ color: theme.palette.color.navLink }}
                        to={"/privacy-policies"}
                        onClick={() => isLogin(false)}
                      >
                        {t("Privacy Policy")}
                      </NavLink>
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Backdrop>
      <ToastContainer />
    </div>
  );
};

export default Authentication;
