import { Box } from "@mui/material";
import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  styled,
  IconButton,
  List,
  ListItemButton,
  Drawer,
  Container,
  Backdrop,
  createTheme,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import ClearIcon from "@mui/icons-material/Clear";
import "intl-tel-input/build/css/intlTelInput.css";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@emotion/react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Authentication = () => {
  const [login, isLogin] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
    
  const handleClose = () => {
    isLogin(false);
  };

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
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const theme = useTheme();

  // Function for SignUP
  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  //Function for Otp Verification
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <Box>
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
              <Typography marginRight={"auto"} color={"gray"}>
                Login
              </Typography>
              {<ClearIcon onClick={handleClose} />}
            </Box>
            <Box id="recaptcha-container"></Box>
            {user ? (
              <Box>
                <Typography>👍Login Success</Typography>
              </Box>
            ) : (
              <Box sx={{ justifyContent: "center" }}>
                <Box sx={{ textAlign: "center", marginTop: "60px" }}></Box>
                {showOTP ? (
                  <>
                    <label
                      htmlFor="otp"
                      className="font-bold text-xl text-white text-center"
                    >
                      <Typography sx={{ color: theme.palette.color.navLink }}>
                        Enter Verification Code
                      </Typography>
                      <Typography sx={{ color: theme.palette.color.navLink }}>
                        We have Sent a Verification code to <br />
                        <Typography>Your Number</Typography>
                      </Typography>
                    </label>
                    <Box marginTop={5}>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container "
                      ></OtpInput>
                    </Box>{" "}
                    <br />
                    <Button
                      onClick={onOTPVerify}
                      className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}

                      <Button
                        variant="contained"
                        size="medium"
                        sx={{ width: "350px" }}
                      >
                        Verify and Process
                      </Button>
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{ color: theme.palette.color.navLink }}
                      marginBottom={2}
                    >
                      Welcome!
                    </Typography>
                    <Typography sx={{ color: theme.palette.color.navLink }}>
                      Enter Phone number to continue and we will a verification
                      code to this number.{" "}
                    </Typography>
                    <Box
                      sx={{
                        marginTop: 5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <PhoneInput
                        country={"in"}
                        value={ph}
                        onChange={setPh}
                        containerStyle={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                    </Box>
                    <br />
                    <br />
                    <Button onClick={onSignup} variant="contained" size="large">
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Login to continue</span>
                    </Button>{" "}
                    <br /> <br />
                    <Typography sx={{ color: "gray" }}>
                      By Continue you agree to out
                    </Typography>
                    <Typography display={"flex"} justifyContent={"center"}>
                      <NavLink style={{ color: theme.palette.color.navLink }}>
                        Terms of services
                      </NavLink>{" "}
                      &nbsp;
                      <p style={{ color: theme.palette.color.navLink }}>
                        &
                      </p>{" "}
                      &nbsp;
                      <NavLink style={{ color: theme.palette.color.navLink }}>
                        Privacy Policy
                      </NavLink>
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default Authentication;
