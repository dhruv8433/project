import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  styled,
  IconButton,
  Drawer,
  Container,
  Backdrop,
  Avatar,
  Tabs,
  Tab,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl,

} from "@mui/material";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-hot-toast";
import ClearIcon from "@mui/icons-material/Clear";
import "intl-tel-input/build/css/intlTelInput.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import CartItem from "../Reusable/CartItem";
import Cart from "../Reusable/CartItem";
import { useTranslation } from "react-i18next";

//for creating logo
const StyledToolBar = styled(Toolbar)({
  display: "flex",
  color: "blue",
  maxWidth: "lg",
  justifyContent: "space-between",
});



const activeTabStyle = {
  "&.Mui-selected": {
    "& .MuiTab-label": {
      textDecoration: "underline",
    },
  },
};

// const label = { inputProps: { "area-label": "switch demo" } };

const Navigation = ({ check, changeLight, changeDark }) => {
  // let id = localStorage.getItem("Data");
  // const input = document.querySelector("#phone");

  const [open, setOpen] = React.useState(false);
  const [login, isLogin] = React.useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  // const [value, setValue] = useState(0);
  const [cart, setCart] = useState(false);
  // const [phoneNo, setPhoneNo] = useState("");
  const [navValue, setNavValue] = useState(0);


  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(0);

  const handleNavChange = (event, newValue) => {
    setNavValue(newValue);
  };

  const handleOpenSetting = () => {
    setOpenSetting(true);
  };
  const handleCloseSetting = () => {
    setOpenSetting(false);
  };
  const handleOpen = () => {
    isLogin(true);
  };
  const handleClose = () => {
    isLogin(false);
  };

  const handleOpenCart = () => {
    setCart(true);
  };

  const handleCloseCart = () => {
    setCart(false);
  };

  let finalNo = "";

  // mode change toggle
  const [view, setView] = React.useState("list");
  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const theme = useTheme();
  const params = useParams();
  const { partner_id } = params;
  const { company_name } = params;
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCurrentTab(0);
    } else if (path === "/about") {
      setCurrentTab(1);
    } else if (path === "/categories") {
      setCurrentTab(2);
    } else if (path === "/providers") {
      setCurrentTab(3);
    } else if (path === "/contact") {
      setCurrentTab(4);
    }
    // we have to modify this code.. idk why this doesn't work
    else if (path === `/providers/services/${partner_id}/${company_name}`) {
      setCurrentTab(3);
    } else if (path === "/profile") {
      setCurrentTab(-1)
    } else if (path === "/") {
      setCurrentTab(-1)
    }
  }, [location]);

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

  const getToken = () => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=1rpau81dcgsnt6qjrmb2lp6220mdm0d9; csrf_cookie_name=d1132cf349f886dfa9cee4843c0ad493");

    let contactNo = localStorage.getItem("ContactInfo")

    var formdata = new FormData();
    formdata.append("mobile", contactNo);
    formdata.append("country_code", "+91");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://edemand.wrteam.me/api/v1/manage_user", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result.token))
      .then(result => localStorage.setItem("Token", result.token))
      .catch(error => console.log('error', error));
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
    console.log("Token Verification token got from here...")
    getToken();
  }

  const islogined = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const myLink = {
    color: theme.palette.color.navLink,
    textDecoration: "none",
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onOTPVerify()
    }
  };

  const { t, i18n, ready } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  //  const [lang, setLang] = useState('en');

  // const languages = [
  //   { value: '', text: "Options" },
  //   { value: 'en', text: "English" },
  //   { value: 'hi', text: "Hindi" },
  //   { value: 'bn', text: "Bengali" }
  // ]

  // const lang = localStorage.getItem("i18nextLng")
  const [lang, setlang] = React.useState('');

  const handleChangeLanguage = (event) => {
    setlang(event.target.value);
  };

  return (
    <Box zIndex={1000}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: theme.palette.background.box,
          boxShadow: "none",
        }}
      >
        <Container>
          <Box>
            <StyledToolBar>
              <Box display={"flex"} sx={{ alignItems: "center" }}>
                <IconButton
                  color="inherit"
                  aria-label="open-drawer"
                  edge="start"
                  sx={{ mr: 2, display: { lg: "none" } }}
                  onClick={() => setOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
                {/* #Phone Menu  */}
                {/* Set logo and burger menu in one side */}
                <div>
                  <Drawer open={open} onClose={() => setOpen(false)}>
                    <Box
                      display={"block"}
                      width={140}
                      padding={3}
                      marginLeft={3}
                    >
                      <NavLink style={myLink} to="/">
                        Home
                      </NavLink>
                      <br />
                      <br />
                      <NavLink style={myLink} to="/about">
                        About us
                      </NavLink>
                      <br />
                      <br />
                      <NavLink style={myLink} to="/categories">
                        Categories
                      </NavLink>
                      <br />
                      <br />
                      <NavLink style={myLink} to="/providers">
                        Providers
                      </NavLink>
                      <br />
                      <br />
                      <NavLink style={myLink} to="/contact">
                        Contact
                      </NavLink>
                      <br />
                      <br />
                    </Box>
                  </Drawer>

                  {/* # PC Navigation  */}
                  {/* logo  */}
                  <NavLink
                    style={{
                      textDecoration: "none",
                      fontSize: 20,
                      marginLeft: -23,
                      color: theme.palette.color.logo,
                    }}
                    to="/"
                  >
                    <img src={require("../../Images/edemand_logo.png")} alt="logo" height={"50px"} width={"140px"}></img>
                  </NavLink>
                </div>

                {/* Navigation Links  */}
              </Box>
              <Box sx={{ display: { xs: "none", lg: "block" } }}>
                <Tabs
                  sx={{ marginLeft: "auto" }}
                  indicatorColor="primary"
                  value={currentTab}
                  onChange={handleNavChange}
                >
                  <Tab
                    value={0}
                    onClick={() => navigate("/")}
                    sx={currentTab === 0 ? activeTabStyle : {}}
                    label={t("Home")}
                  />
                  <Tab
                    value={1}
                    onClick={() => navigate("/about")}
                    sx={currentTab === 1 ? activeTabStyle : {}}
                    label={t("About Us")}
                  />
                  <Tab
                    value={2}
                    onClick={() => navigate("/categories")}
                    sx={currentTab === 2 ? activeTabStyle : {}}
                    label={t("Categories")}
                  />
                  <Tab
                    value={3}
                    onClick={() => navigate("/providers")}
                    sx={currentTab === 3 ? activeTabStyle : {}}
                    label={t("Providers")}
                  />
                  <Tab
                    value={4}
                    onClick={() => navigate("/contact")}
                    sx={currentTab === 4 ? activeTabStyle : {}}
                    label={t("Contact")}
                  />
                </Tabs>
              </Box>

              {/* #Navigation Button functionality */}
              <Box sx={{ display: "flex", marginRight: -4 }}>
                {islogined === "true" ? (
                  <IconButton
                    id="logined_user"
                    style={{
                      borderRadius: "100px",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                    onClick={() => navigate("/profile")}
                  >
                    <Avatar sx={{ height: "30px", width: "30px", color: "white" }} src={localStorage.getItem("ProfilePicture")} />
                  </IconButton>
                ) : (
                  <Button
                    id="sign_in"
                    variant="contained"
                    startIcon={<AccountCircleIcon />}
                    onClick={handleOpen}
                  >
                    {t("Sign in")}
                  </Button>
                )
                }

                <IconButton aria-label="cart" onClick={handleOpenCart}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>

                {islogined === "" ? (
                  <Drawer anchor="right" open={cart} onClose={handleCloseCart}>
                    <Box sx={{ width: 400 }}>
                      <Box sx={{ textAlign: "center" }}>
                        <img
                          alt="empty"
                          src="https://img.freepik.com/free-vector/corrugated-box-white-background_1308-111117.jpg"
                          style={{
                            width: "220px",
                            borderRadius: "500px",
                            marginTop: "150px",
                          }}
                        />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h3>{t("No Products here!")}</h3>
                        <br />
                        {t("Your cart is empty.")} <br /><br /> {t("Login & Add products to that we")}
                        <h4 style={{ color: "gray" }}>{t("can serve you!")}</h4>
                      </Box>
                    </Box>
                  </Drawer>
                ) : (
                  <Drawer anchor="right" open={cart} onClose={handleCloseCart}>
                    <Box sx={{ width: 500 }}>
                      <Cart />
                    </Box>
                  </Drawer>
                )}

                <IconButton onClick={handleOpenSetting}>
                  <SettingsOutlinedIcon />{" "}
                </IconButton>
              </Box>

              <Drawer anchor="right" open={openSetting} onClose={handleCloseSetting}>
                <Box width="400px">
                  <Box>
                    {/* Heading  */}
                    <AppBar position="static">
                      <Toolbar>
                        <IconButton
                          size="medium"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                        // sx={{ mr: 2 }}
                        >
                          <SettingsOutlinedIcon />
                        </IconButton>

                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ flexGrow: 1 }}
                        >
                          {t("eDemand Setting")}
                        </Typography>
                        <IconButton
                          onClick={handleCloseSetting}
                          sx={{ color: "white" }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Toolbar>
                    </AppBar>

                    {/* Toggle Button for Modes  */}
                    <Box
                      justifyContent={"space-around"}
                      display={"flex"}
                      marginTop={3}
                    >
                      <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={handleChange}
                      >
                        <ToggleButton
                          onClick={changeLight}
                          value="list"
                          aria-label="list"
                        >
                          <Brightness7Icon /> {t("Light Theme")}
                        </ToggleButton>
                        <ToggleButton
                          onClick={changeDark}
                          value="module"
                          aria-label="module"
                        >
                          <Brightness4Icon /> {t("Dark Theme")}
                        </ToggleButton>
                      </ToggleButtonGroup>

                    </Box> <br /><br />
                    <Box display={"flex"} justifyContent={"center"} paddingLeft={6} paddingRight={6}>
                      <FormControl fullWidth>

                        <InputLabel >Select your language</InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          value={lang}
                          fullWidth
                          placeholder="Select your language"
                          input={<OutlinedInput label="Select Languages" />}
                          label="Select"
                          onChange={handleChangeLanguage}
                        >
                          <MenuItem value={10} onClick={() => changeLanguage("en")}>English</MenuItem>
                          <MenuItem value={20} onClick={() => changeLanguage("de")}>German</MenuItem>
                          <MenuItem value={30} onClick={() => changeLanguage("es")}>Spanish</MenuItem>
                        </Select>
                      </FormControl>
                      {/* <select value={lang} onChange={handleChange}>
                        {languages.map(item => {
                          return (<option key={item.value}
                            value={item.value}>{item.text}</option>);
                        })}
                      </select> */}
                    </Box>
                  </Box>
                </Box>
              </Drawer>
              {/* ------------------------------------------------- */}
              {/* =================Authentication=================  */}
              {/* ------------------------------------------------- */}
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
                  <Box
                    marginLeft={3}
                    marginRight={3}
                    marginTop={3}
                    marginBottom={3}
                  >
                    <Box display={"flex"}>
                      <Typography marginRight={"auto"} color={"gray"}>
                        {t("Login")}
                      </Typography>
                      {<ClearIcon onClick={handleClose} sx={{ color: theme.palette.icons.icon }} />}
                    </Box>
                    <Box id="recaptcha-container"></Box>
                    {user ? (
                      <Box>
                        <Typography>👍Login Success</Typography>
                        {(finalNo = ph)}
                        {
                          (localStorage.setItem("ContactInfo", finalNo),
                            localStorage.setItem("isLoggedIn", "true"))
                        }
                      </Box>
                    ) : (
                      <Box sx={{ justifyContent: "center" }}>
                        <Box
                          sx={{ textAlign: "center", marginTop: "60px" }}
                        ></Box>
                        {showOTP ? (
                          <>
                            <label
                              htmlFor="otp"
                              className="font-bold text-xl text-white text-center"
                            >
                              <Typography
                                sx={{ color: theme.palette.color.navLink }}
                              >
                                {t("Enter Verification Code")}
                              </Typography>
                              <Typography
                                sx={{ color: theme.palette.color.navLink }}
                              >
                                {t("We have Sent a Verification code to")} <br />
                                <Typography>{t("Your Number")}</Typography>
                              </Typography>
                            </label>
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
                            <Button
                              onClick={onOTPVerify}
                              className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                            >
                              <Button
                                variant="contained"
                                size="medium"
                                sx={{ width: "350px" }}
                              >{loading && (
                                <CgSpinner
                                  size={20}
                                  className="mt-1 animate-spin"
                                />
                              )}
                                {t("Verify and Process")}
                              </Button>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Typography
                              sx={{ color: theme.palette.color.navLink }}
                              marginBottom={2}
                            >
                              {t("Welcome!")}
                            </Typography>
                            <Typography
                              sx={{ color: theme.palette.color.navLink }}
                            >
                              {t("Enter Phone number to continue and we will a verification code to this number")}
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
                                onEnterKeyPress={onSignup}
                              />
                            </Box>
                            <br />
                            <br />
                            <Button
                              onClick={onSignup}
                              variant="contained"
                              size="large"
                            >
                              {loading && (
                                <CgSpinner
                                  size={20}
                                  className="mt-1 animate-spin"
                                />
                              )}
                              <span>{t("Login to continue")}</span>
                            </Button>{" "}
                            <br /> <br />
                            <Typography sx={{ color: "gray" }}>
                              {t("By Continue you agree to out")}
                            </Typography>
                            <Typography
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <NavLink
                                style={{ color: theme.palette.color.navLink }} to={'/terms-and-conditions'} onClick={() => isLogin(false)}
                              >
                                {t("Terms of services")}
                              </NavLink>{" "}
                              &nbsp;
                              <p style={{ color: theme.palette.color.navLink }}>
                                &
                              </p>{" "}
                              &nbsp;
                              <NavLink
                                style={{ color: theme.palette.color.navLink }} to={'/privacy-policies'} onClick={() => isLogin(false)}
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
            </StyledToolBar>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navigation;
