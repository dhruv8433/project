import {
  Box,
  ListItemButton,
  Typography,
  TextField,
  IconButton,
  Container,
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          background: "#343F53",
          color: "white",
          padding: "20px",
          fontSize: "14px",
        }}
      >
        {/* useful */}
        <Box
          display={{ xs: "block", md: "flex" }}
          sx={{
            // marginLeft: 10,
            justifyContent: "space-around",
            marginRight: 10,
            marginBottom: 2,
          }}
        >
          <Box>
            <Typography fontWeight="bold">USEFUL CATEGORUIES</Typography>
            <hr fullWidth />
            <Box display={"flex"}>
              <Box marginRight={3}>
                <ListItemButton>Carpenter</ListItemButton>
                <ListItemButton>Salon </ListItemButton>
                <ListItemButton>Car Service</ListItemButton>
                <ListItemButton>Electronic Services</ListItemButton>
                <ListItemButton>Pest Control Service Us</ListItemButton>
                <ListItemButton>Oil Filter Changed</ListItemButton>
                <ListItemButton>Security System</ListItemButton>
                <ListItemButton>Outdoor Lighting</ListItemButton>
              </Box>
              <Box marginRight={3}>
                <ListItemButton>Plumbing Service</ListItemButton>
                <ListItemButton>Ac Service </ListItemButton>
                <ListItemButton>Home Cleaning </ListItemButton>
                <ListItemButton>Wardrobe Cupboard</ListItemButton>
                <ListItemButton>Kitchen Cabinets</ListItemButton>
                <ListItemButton>Ground Wiring</ListItemButton>
                <ListItemButton>Socket Switch Installation</ListItemButton>
                <ListItemButton>Electronic Services </ListItemButton>
              </Box>
              <Box marginRight={3}>
                <ListItemButton>Shave/Trim</ListItemButton>
                <ListItemButton>Hair color </ListItemButton>
                <ListItemButton>Brake Repair</ListItemButton>
                <ListItemButton>Battery Replacement</ListItemButton>
                <ListItemButton>Antifreeze Added</ListItemButton>
                <ListItemButton>Light Fixture</ListItemButton>
                <ListItemButton>Fan installation</ListItemButton>
                <ListItemButton> Cockroaches</ListItemButton>
              </Box>
            </Box>
          </Box>
          <Box marginTop={{ xs: 10, md: 0 }}>
            <Typography fontWeight="bold">QUICK LINKS</Typography>
            <hr />
            <Box display={{ xs: "flex", md: "block" }}>
              <Box marginRight={{ md: 7, xs: 2 }}>
                <ListItemButton>Home</ListItemButton>
                <ListItemButton>About Us </ListItemButton>
                <ListItemButton>All Categories</ListItemButton>
              </Box>
              <Box marginRight={{ md: 7, xs: 3 }}>
                {" "}
                <ListItemButton>All Providers</ListItemButton>
                <ListItemButton>Contact Us</ListItemButton>
                <ListItemButton>Help</ListItemButton>
              </Box>
              <Box>
                <ListItemButton>Terms & Condition</ListItemButton>
                <ListItemButton>Privacy Policy</ListItemButton>
              </Box>
            </Box>
          </Box>
          <Box marginTop={{ xs: 10, md: 0 }}>
            <Typography fontWeight="bold">KEEP UP WITH NEWS FROM US</Typography>
            <hr />
            <Typography fontSize={"17px"} marginTop={2}>
              Get the latest Subscription Offers & news from <br />
              eDemmand
            </Typography>
            <br />
            <TextField
              fontSize={"20px"}
              sx={{ background: "white", borderRadius: "10px", marginTop: 3 }}
              placeholder="Enter Email"
              size="small"
              InputProps={{ endAdornment: <SendIcon /> }}
              width={{ xs: "400px", md: "600px" }}
            ></TextField>
            <br />
            <br />
            <Typography fontSize={"17px"} marginTop={1}>
              FOLLOW US
            </Typography>
            <hr />
            <Box sx={{ marginTop: 2 }} gap={-2}>
              <Buttons />
            </Box>
          </Box>
        </Box>
        <hr />
        <Container sx={{ textAlign: "center", marginTop: 2 }}>
          Copyright @ 2023 eDemmand.All Rights Reserved
        </Container>
      </Box>
    </>
  );
};

export default Footer;

const Buttons = () => {
  return (
    <Box>
      <IconButton
        href="https://www.instagram.com"
        sx={{ zIndex: 1, color: "white", padding: 0 }}
      >
        {<InstagramIcon fontSize="large" />}
      </IconButton>
      <IconButton
        href="https://www.web.whatsapp.com"
        sx={{ zIndex: 1, color: "white", padding: 0 }}
      >
        {<WhatsAppIcon fontSize="large" />}
      </IconButton>
      <IconButton
        href="https://www.facebook.com"
        sx={{ zIndex: 1, color: "white", padding: 0 }}
      >
        {<FacebookIcon fontSize="large" />}
      </IconButton>
      <IconButton
        href="https://www.twitter.com"
        sx={{ zIndex: 1, color: "white", padding: 0 }}
      >
        {<TwitterIcon fontSize="large" />}
      </IconButton>
      <IconButton
        href="https://in.linkedin.com"
        sx={{ zIndex: 1, color: "white", padding: 0 }}
      >
        {<LinkedInIcon fontSize="large" />}
      </IconButton>
    </Box>
  );
};
