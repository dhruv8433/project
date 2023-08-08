import React, { useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  FormLabel,
  TextField,
  Badge,
  Modal,
  Skeleton,
} from "@mui/material";
import {
  Dashboard,
  Payment,
  Book,
  Person,
  KeyboardArrowRight,
  Delete,
  Logout,
  Notifications,
  FavoriteBorder,
  Wallet,
  AccountBalance,
  AccountBalanceWalletOutlined,
  DeleteOutline,
  NotificationsOutlined,
  LocalActivityOutlined,
  LocationCityOutlined,
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import ProfilePayment from "./ProfilePayment";
import RightContent from "./RightContent";
import { useTheme } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { t } from "i18next";

const Pnavigation = () => {
  const [open, setOpen] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [defname, setDefName] = useState();
  const [defeml, setDefEml] = useState();
  const [defnum, setDefNum] = useState("+91987654321");
  const [selectedOption, setSelectedOption] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    setIsVisible(true);
  };

  const url = "/profile";

  const handleLogoutConfirm = () => {
    // Clear the phone number value from local storage
    // localStorage.removeItem("phoneNumber");
    localStorage.setItem("ContactInfo", "");
    localStorage.setItem("isLoggedIn", "");
    setIsVisible(false);
  };

  const handleLogoutCancel = () => {
    setSelectedOption("cancel");
    setIsVisible(false);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedOption("cancel");
    setOpen(false);
  };
  const handleOpen = () => {
    setSelectedOption("continue");
    setOpen(true);
  };

  const submite = () => {
    let Myname = document.getElementById("editName").value;
    let email = document.getElementById("editEmail").value;
    let phone = document.getElementById("editPhone").value;

    // console.log(Myname);
    // console.log(email);
    // console.log(phone);

    setDefName(Myname);
    setDefEml(email);
    setDefNum(phone);

    localStorage.setItem("currentuser", Myname);
    localStorage.setItem("currentemail", email);
    localStorage.setItem("currentphone", phone);

    toast.success("Update Successfully...");
  };

  let name = localStorage.getItem("currentuser");
  let email = localStorage.getItem("currentemail");
  let contact = localStorage.getItem("ContactInfo");

  const theme = useTheme();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div>
      <Box display={"flex"} maxWidth={"100%"}>
        <Box
          sx={{
            width: "100%",
            bgcolor: theme.palette.background.box,
            borderRadius: "10px",
            p: 0,
            mt: 3,
            mb: 3,
          }}
        >
          <ListItem
            sx={{ background: "blue", borderRadius: "10px", height: 160 }}
          >
            <ListItemDecorator>
              <Avatar
                size="lg"
                sx={{
                  height: "60px",
                  width: "60px",
                  border: "5px solid white",
                }}
              ></Avatar>
            </ListItemDecorator>
            {isLoggedIn === "" ? (
              <Skeleton variant="rectangular" />
            ) : (
              <div style={{ marginLeft: 10, color: "white" }}>
                <Typography fontSize="xl">{name}</Typography>
                <Typography fontSize="14px">{email}</Typography>
                <Typography fontSize="14px">+{contact}</Typography>
              </div>
            )}

            <Button
              variant="outlined"
              size="small"
              onClick={handleOpen}
              sx={{
                color: "white",
                border: "1px solid white",
                ml: "auto",
                mt: -12,
              }}
            >
              {t("Edit")}
            </Button>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
            >
              <Box
                sx={{
                  background: theme.palette.background.box,
                  color: "black",
                  width: "400px",
                  borderRadius: "10px",
                }}
              >
                <Box
                  marginLeft={3}
                  marginRight={3}
                  marginTop={3}
                  marginBottom={3}
                >
                  <Box display={"flex"}>

                    <Typography marginRight={"auto"} color={theme.palette.color.navLink}>{t("Edit Profile")}</Typography>
                    {<ClearIcon onClick={handleClose} sx={{color: theme.palette.color.navLink}}/>}

                  </Box>
                  {/* img */}

                  <Avatar
                    size="lg"
                    sx={{
                      height: "80px",
                      width: "80px",
                      border: "5px solid black",
                      borderRadius: "100px",
                      marginTop: "30px",
                      marginBottom: "30px",
                      marginInlineStart: "122px",
                    }}
                  ></Avatar>
                  <Badge>
                    <EditRoundedIcon
                      sx={{
                        color: "white",
                        background: "blue",
                        borderRadius: "50px",
                        ml: 23,
                        mt: -9,
                        border: "3px solid white",
                        cursor: "pointer",
                      }}
                    />
                  </Badge>

                  <Box display={"block"}>
                    <FormLabel>{t("Name")}</FormLabel>
                    <br />
                    <form>
                      <TextField
                        id="editName"
                        placeholder="Enter name"
                        size="small"
                        fullWidth
                        variant="outlined"
                        name="name"
                        required
                        sx={{ background: theme.palette.background.input }}
                      />
                      <br />
                      <br />
                      <FormLabel>{t("Email")}</FormLabel>
                      <br />
                      <TextField
                        id="editEmail"
                        placeholder="Enter Email"
                        size="small"
                        fullWidth
                        variant="outlined"
                        name="email"
                        type="email"
                        required
                        sx={{ background: theme.palette.background.input }}
                      />
                      <br />
                      <br />
                      <FormLabel>{t("Phone")}</FormLabel>
                      <br />
                      <TextField
                        id="editPhone"
                        placeholder="Enter Phone"
                        size="small"
                        fullWidth
                        required
                        disabled
                        value={defnum}
                        variant="outlined"
                        sx={{ background: theme.palette.background.input }}
                      />
                      <br />
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{ width: "350px" }}
                        onClick={submite}
                      >
                         {t("Save Profile")}
                      </Button>
                    </form>
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                  </Box>
                </Box>
              </Box>
            </Backdrop>
          </ListItem>

          <List component="nav" aria-label="main mailbox folders" sx={{}}>
              <Link to={"/profile/booking"} style={{ textDecoration: "none" }}>
                <ListItem
                  button
                  sx={{ paddingTop: 1, paddingBottom: 1 }}
                  href="/"
                >
                  <ListItemIcon>
                    <Book sx={{ color: theme.palette.color.logo }} />
                  </ListItemIcon>
                  {/* booking address url  */}
                  <Link
                    to={"/profile/booking"}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    }}
                    primary="My Bookings"
                  >
                    {t("Bookings")}
                  </Link>
                  <IconButton
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <KeyboardArrowRight
                      fontSize="xl3"
                      sx={{ color: "text.tertiary", fontSize: 24 }}
                    />
                  </IconButton>
                </ListItem>
              </Link>
              <Divider />
              <Link to={"/profile/address"} style={{ textDecoration: "none" }}>
                <ListItem
                  button
                  sx={{ paddingTop: 1, paddingBottom: 1 }}
                  href="/"
                >
                  <ListItemIcon>
                    <LocationCityOutlined sx={{ color: theme.palette.color.logo }} />
                  </ListItemIcon>
                  <Link
                    to={"/profile/address"}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    }}
                    primary="My Bookings"
                  >
                    {t("Manage Addresses")}
                  </Link>
                  <IconButton
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <KeyboardArrowRight
                      fontSize="xl3"
                      sx={{ color: "text.tertiary", fontSize: 24 }}
                    />
                  </IconButton>
                </ListItem>
              </Link>
              <Divider />
              <Link to={"/profile/payment"} style={{ textDecoration: "none" }}>
                <ListItem
                  button
                  sx={{ paddingTop: 1, paddingBottom: 1 }}
                  href="/"
                >
                  <ListItemIcon>
                    <AccountBalanceWalletOutlined sx={{ color: theme.palette.color.logo }} />
                  </ListItemIcon>
                  <Link
                    to={"/profile/payment"}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    }}
                    primary="My Bookings"
                  >
                    {t("Payment History")}
                  </Link>
                  <IconButton
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <KeyboardArrowRight
                      fontSize="xl3"
                      sx={{ color: "text.tertiary", fontSize: 24 }}
                    />
                  </IconButton>
                </ListItem>
              </Link>
              <Divider />
              <Link to={"/profile/bookmark"} style={{ textDecoration: "none" }}>
                <ListItem
                  button
                  sx={{ paddingTop: 1, paddingBottom: 1 }}
                  href="/"
                >
                  <ListItemIcon>
                    <FavoriteBorder sx={{ color: theme.palette.color.logo }} />
                  </ListItemIcon>
                  <Link
                    to={"/profile/bookmark"}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    }}
                    primary="My Bookings"
                  >
                    {t("Bookmarks")}
                  </Link>
                  <IconButton
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <KeyboardArrowRight
                      fontSize="xl3"
                      sx={{ color: "text.tertiary", fontSize: 24 }}
                    />
                  </IconButton>
                </ListItem>
              </Link>
              <Divider />
              <Link
                to={"/profile/notifications"}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  button
                  sx={{ paddingTop: 1, paddingBottom: 1 }}
                  href="/"
                >
                  <ListItemIcon>
                    <NotificationsOutlined sx={{ color: theme.palette.color.logo }} />
                  </ListItemIcon>
                  <Link
                    to={"/profile/notifications"}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    }}
                    primary="My Bookings"
                  >
                    {t("Notifications")}
                  </Link>
                  <IconButton
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <KeyboardArrowRight
                      fontSize="xl3"
                      sx={{ color: "text.tertiary", fontSize: 24 }}
                    />
                  </IconButton>
                </ListItem>
              </Link>
              <Divider />
              <Link
                fullWidth
                to={"/logout"}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  button
                  sx={{ paddingTop: 1, paddingBottom: 1 }}
                  href="/"
                >
                  <ListItemIcon>
                    <Logout sx={{ color: theme.palette.color.logo }} />
                  </ListItemIcon>

                  <Link
                    to={"/logout"}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    }}
                    primary="My Bookings"
                    onClick={() => setIsVisible(true)}
                  >
                    {t("Logout")}
                  </Link>

                  <IconButton
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <KeyboardArrowRight
                      fontSize="xl3"
                      sx={{ color: "text.tertiary", fontSize: 24 }}
                    />
                  </IconButton>
                </ListItem>
              </Link>{" "}
              <Divider />
              <Link to={"/delete-account"} style={{ textDecoration: "none" }}>
                <ListItem
                  button
                  sx={{ paddingTop: 1, paddingBottom: 1 }}
                  href="/"
                >
                  <ListItemIcon>
                    <DeleteOutline sx={{ color: "red" }} />
                  </ListItemIcon>
                  <Link
                    to={"/delete-account"}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    }}
                    primary="My Bookings"
                  >
                    {t("Delete Account")}
                  </Link>
                  <IconButton
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <KeyboardArrowRight
                      fontSize="xl3"
                      sx={{ color: "text.tertiary", fontSize: 24 }}
                    />
                  </IconButton>
                </ListItem>
              </Link>
            </List>
        </Box>
      </Box>
    </div>
  );
};

export default Pnavigation;
