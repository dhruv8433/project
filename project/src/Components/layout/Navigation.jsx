import {
  AppBar,
  Box,
  Button,
  Toolbar,
  styled,
  IconButton,
  Drawer,
  Container,
  Avatar,
  Backdrop,
} from "@mui/material";
import "intl-tel-input/build/css/intlTelInput.css";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NavigationLinks, {
  PhoneNavigationLinks,
} from "./Navigation/NavigationLinks";
import Authentication from "./Navigation/Authentication";
import EdemandSetting from "./Navigation/EdemandSetting";
import { t } from "i18next";
import { ToastContainer } from "react-toastify";
import EditProfile from "../Reusable/Profile/EditProfile";

//for creating styled logo
const StyledToolBar = styled(Toolbar)({
  display: "flex",
  color: "blue",
  maxWidth: "lg",
  justifyContent: "space-between",
});

const Navigation = ({ check, changeLight, changeDark }) => {
  const [open, setOpen] = React.useState(false);
  const [login, isLogin] = React.useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [cart, setCart] = useState(false);
  const [isDate, isSelectedDate] = useState(false);

  const navigate = useNavigate();

  const handleOpenSetting = () => {
    setOpenSetting(true);
  };
  const handleCloseSetting = () => {
    setOpenSetting(false);
  };

  const handleOpen = () => {
    isLogin(true);
  };

  const handleCloseCart = () => {
    setCart(false);
  };

  // mode change toggle
  const [view, setView] = React.useState("list");
  const theme = useTheme();

  const defaultLanguage = localStorage.getItem("language") || "";
  useEffect(() => {
    const handleCloseCart = () => {
      setCart(false);
    };

    // Listen for navigation events
    const cleanup = navigate(handleCloseCart);

    return cleanup;
  }, [navigate]);

  const islogined = localStorage.getItem("isLoggedIn");

  return (
    <Box zIndex={1000}>
      <AppBar
        // position="fixed"
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
                      <PhoneNavigationLinks />
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
                    <img
                      src={require("../../Images/edemand_logo.png")}
                      alt="logo"
                      height={"50px"}
                      width={"140px"}
                    ></img>
                  </NavLink>
                </div>

                {/* Navigation Links  */}
              </Box>
              <NavigationLinks />

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
                    <Avatar
                      sx={{ height: "30px", width: "30px", color: "white" }}
                      src={localStorage.getItem("ProfilePicture")}
                    />
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
                )}

                <IconButton
                  aria-label="cart"
                  // onClick={() => setCart(true)}
                  onClick={() => navigate("/checkout")}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>

                {/* update this section soon   */}
                {/* {islogined === "" ? (
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
                        <h3>{t("No Products here")}</h3>
                        <br />
                        {t("Your cart is empty")} <br />
                        <br /> {t("Login & Add products to that we")}
                        <h4 style={{ color: "gray" }}>{t("can serve you")}</h4>
                      </Box>
                    </Box>
                  </Drawer>
                ) : (
                  <Drawer
                    anchor="right"
                    open={cart}
                    onClose={() => setCart(false)}
                  >
                    <Box sx={{ width: 500 }}>
                      <Cart />
                      <Box p={1} position={"absolute"} bottom={10} width={480}>
                        <Button
                          variant="contained"
                          fullWidth
                          ml={1}
                          onClick={() => isSelectedDate(true)}
                        >
                          Continue
                        </Button>
                      </Box>
                    </Box>
                  </Drawer>
                )}

                <Drawer open={isDate} anchor="right">
                  <Box width={500}>
                    <Box mt={1} mb={1} display={"flex"} alignItems={"center"}>
                      <IconButton onClick={() => isSelectedDate(false)}>
                        <ArrowBackIosNewOutlined />
                      </IconButton>
                      <h4>Please Select Data and Time</h4>
                    </Box>
                    <Divider />
                    <Box>
                      <DateTime />
                    </Box>
                  </Box>
                </Drawer> */}

                <IconButton onClick={handleOpenSetting}>
                  <SettingsOutlinedIcon />
                </IconButton>
              </Box>

              {/* =================eDemand-Setting================  */}
              <Drawer
                anchor="right"
                open={openSetting}
                onClose={handleCloseSetting}
              >
                <EdemandSetting
                  changeDark={changeDark}
                  changeLight={changeLight}
                  setOpenSetting={setOpenSetting}
                  view={view}
                  setView={setView}
                />
              </Drawer>
              {/* =================Authentication=================  */}
              <Authentication login={login} isLogin={isLogin} />
            </StyledToolBar>
          </Box>
        </Container>
      </AppBar>
      <ToastContainer />
    </Box>
  );
};

export default Navigation;
