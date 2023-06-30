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
import { useTheme } from "@emotion/react";
import { useNavigate } from 'react-router'
import { t } from "i18next";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  return (
    <>
      <Box
        sx={{
          background: "#343F53",
          color: "white",
          padding: "20px",
          fontSize: "14px",
          // marginTop: "118px"
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
            <Typography fontWeight="bold">{t("USEFUL CATEGORIES")}</Typography>
            <hr fullWidth />
            <Box display={"flex"} mt={2}>
              <Box marginRight={3}>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/270/carpenter")}>{t("Carpenter")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/265/salon")}>{t("Salon")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/259/car-service")}>{t("Car Service")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/252/electronic-services")}>{t("Electronic Services")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/246/pest-control-service")}>{t("Pest Control Service")}</ListItemButton>
              </Box>
              <Box marginRight={3}>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/240/plumbing-service")}>{t("Plumbing Service")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/221/ac-service")}>{t("Ac Service")} </ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/213/home-cleaning")}>{t("Home Cleaning")} </ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/")}>{t("Socket Switch Installation")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories/222/laundry-service")}>{t("Laundry Services")} </ListItemButton>
              </Box>
              <Box marginRight={3}>
                <ListItemButton className="footer-item" onClick={() => navigate("/providers/services/273/the-barber-shop")}>{t("Hair color")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/providers/services/260/stormbrand-electronic-store")}>{t("Electronic Store")} </ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/providers/services/270/piston-car-service")}>{t("Brake Repair")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/providers/services/327/big-brand-electronic-service")}>{t("Fan installation")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/providers/services/297/pestguard-pvt-ltd")}> {t("Pest Guard")}</ListItemButton>
              </Box>
            </Box>
          </Box>
          <Box marginTop={{ xs: 10, md: 0 }}>
            <Typography fontWeight="bold">{t("QUICK LINKS")}</Typography>
            <hr />
            <Box display={{ xs: "flex", md: "block" }} mt={2}>
              <Box marginRight={{ md: 7, xs: 2 }}>
                <ListItemButton className="footer-item" onClick={() => navigate("/")}>{t("Home")}</ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/about")}>{t("About Us")} </ListItemButton>
                <ListItemButton className="footer-item" onClick={() => navigate("/categories")}>{t("Categories")}</ListItemButton>
              </Box>
              <Box marginRight={{ md: 7, xs: 3 }}>
                <ListItemButton className="footer-item"  onClick={() => navigate("/contact")}>{t("Contact")}</ListItemButton>
                <ListItemButton className="footer-item"  onClick={() => navigate("/providers")}>{t("Providers")}</ListItemButton>
              </Box>

            </Box>
          </Box>
          <Box marginTop={{ xs: 10, md: 0 }}>
            <Typography fontWeight="bold">{t("KEEP UP WITH NEWS FROM US")}</Typography>
            <hr />
            <Typography fontSize={"17px"} marginTop={2}>
             {t(" Get the latest Subscription Offers & news from eDemand")}
            </Typography>
            <br />
            <TextField
              fontSize={"20px"}
              sx={{ background: theme.palette.background.box, borderRadius: "10px", marginTop: 1 }}
              placeholder="Enter Email"
              size="small"
              fullWidth
              InputProps={{ endAdornment: <SendIcon sx={{cursor: "pointer"}}/> }}
              width={{ xs: "400px", md: "600px" }}
            ></TextField>
            <br />
            <br />
            <Box sx={{ marginTop: "4px" }} gap={-2}>
              <Buttons />
            </Box>
          </Box>
        </Box>
        <hr />
        <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: 2 }}>
          {t("Copyright @ 2023 eDemand.All Rights Reserved")}
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
        href="https://www.instagram.com/wrteam.in/"
        sx={{ zIndex: 1, color: "black", padding: "4px", background: "white", margin: "2px", marginRight: "10px", "&:hover":{
          color: "white", background:"linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
        } }}
      >
        {<InstagramIcon fontSize="medium" />}
      </IconButton>
      <IconButton
        href="https://www.web.whatsapp.com"
        sx={{ zIndex: 1, color: "black", padding: "4px", background: "white", margin: "2px", marginRight: "10px", "&:hover":{
          color: "white", background:"#25D366"
        } }}
      >
        {<WhatsAppIcon fontSize="medium" />}
      </IconButton>
      <IconButton
        href="https://www.facebook.com/wrteam.in/"
        sx={{ zIndex: 1, color: "black", padding: "4px", background: "white", margin: "2px", marginRight: "10px", "&:hover":{
          color: "white", background:" -webkit-linear-gradient(top, #3b5998, #2b4170)"
        } }}
      >
        {<FacebookIcon fontSize="medium" />}
      </IconButton>
      <IconButton
        href="https://www.twitter.com"
        sx={{ zIndex: 1, color: "black", padding: "4px", background: "white", margin: "2px", marginRight: "10px", "&:hover":{
          color: "white", background:"#00ACEE"
        } }}
      >
        {<TwitterIcon fontSize="medium" />}
      </IconButton>
      <IconButton
        href="https://www.linkedin.com/company/wrteam"
        sx={{ zIndex: 1, color: "black", padding: "4px", background: "white", margin: "2px", marginRight: "10px", "&:hover":{
          color: "white", background:" #0077b5"
        } }}
      >
        {<LinkedInIcon fontSize="medium" />}
      </IconButton>
    </Box>
  );
};
