import { useTheme } from "@emotion/react";
import { Breadcrumbs, Container, Typography, Grid, TextField, Box, Link } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchProvider = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return <div>
    <Box bgcolor={theme.palette.background.heading} paddingTop={"15px"} paddingBottom={"15px"} mb={"20px"}>
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
          <Typography color="text.primary">{t("Providers")}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" gutterBottom>
          <>{t("All Service Provider")}</>
        </Typography>

      </Container>
    </Box>
  </div >;
};
export default SearchProvider;
