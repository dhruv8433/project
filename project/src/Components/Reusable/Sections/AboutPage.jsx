import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { t } from "i18next";
import api from "../../../API/Fetch_data_Api";

function AboutPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const aboutUs = localStorage.getItem("About_us")
  return (
    <>
      <Box
        bgcolor={theme.palette.background.heading}
        paddingTop={"15px"}
        paddingBottom={"15px"}
        mb={"20px"}
      >
        <Container maxWidth="lg">
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginBottom: 1, marginTop: 1 }}
          >
            <Link
              sx={{ cursor: "pointer", textDecoration: "none" }}
              color="inherit"
              onClick={() => navigate("/")}
            >
              {t("Home")}
            </Link>
            <Typography color="text.primary">{t("About")}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" gutterBottom>
            <>{t("About Us")}</>
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ minHeight: 550, mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} display={{ xs: "block", md: "none" }}>
            <img
              src={require("../../../Images/about.png")}
              alt="technology"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} marginTop={{ xs: "none", md: "50px" }}>
            <Box>
              {/* response from api should print here that contian html file for about us  */}
              <div dangerouslySetInnerHTML={{ __html: aboutUs }} />
            </Box>
            <br />
          </Grid>
          <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
            <img
              src={require("../../../Images/about.png")}
              alt="technology"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AboutPage;
