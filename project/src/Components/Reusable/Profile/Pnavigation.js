import React, { useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Typography
} from "@mui/material";
import {
  Book,
  KeyboardArrowRight,
  Logout,
  FavoriteBorder,
  AccountBalanceWalletOutlined,
  DeleteOutline,
  NotificationsOutlined,
  LocationCityOutlined,
} from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { t } from "i18next";
import EditProfile from "./EditProfile";
import { API_URL } from "../../../config/config";

const Pnavigation = () => {
  const [open, setOpen] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState([]); 
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const submite = () => {
    let Myname = document.getElementById("editName").value;
    let email = document.getElementById("editEmail").value;
    let phone = document.getElementById("editPhone").value;

    // console.log(Myname);
    // console.log(email);
    // console.log(phone)

    localStorage.setItem("currentuser", Myname);
    localStorage.setItem("currentemail", email);
    localStorage.setItem("currentphone", phone);

    toast.success("Update Successfully...");
  };


  useEffect(() => {
    var formdata = new FormData();
    const contact = localStorage.getItem("ContactInfo")
    formdata.append("mobile", contact);
    formdata.append("country_code", "91");

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${API_URL}/manage_user`, requestOptions)
      .then(response => response.text())
      .then(result => {
        setName(result.data.username)
        setEmail(result.data.email)
      })
      .catch(error => console.log('error', error));
  }, [])

  let contact = localStorage.getItem("ContactInfo");

  const theme = useTheme();

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
            <Box ml={3}>
              <Typography color={theme.palette.color.text}>{name}</Typography>
              <Typography color={theme.palette.color.text}>{email}</Typography>
              <Typography color={theme.palette.color.text}>{contact}</Typography>
            </Box>

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
                    {<ClearIcon onClick={handleClose} sx={{ color: theme.palette.color.navLink }} />}
                  </Box>
                  <EditProfile open={open} />
                  <ToastContainer />
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
    </div >
  );
};

export default Pnavigation;
