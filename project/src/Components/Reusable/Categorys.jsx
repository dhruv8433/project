import {
  Box,
  Breadcrumbs,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../API/Fetch_data_Api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { NavLink, useNavigate } from "react-router-dom";
import FetchingCategorys from "./FetchingCategorys";
import { useTheme } from "@emotion/react";
import { t } from "i18next";

const Categorys = () => {
  const [image, setImage] = useState([]);
  useEffect(() => {
    api
      .get_Api_Category()
      .then((response) => setImage(response.data))
      .catch((error) => console.log(error));
  }, []);

  const anchorestyle = {
    color: "black",
  };

  const navigate = useNavigate()
  const theme = useTheme();
  return (
    <div>
      <Box paddingTop={"15px"} paddingBottom={"15px"} mb={"20px"}>
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
            <Typography color="text.primary">{t("categories")}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" gutterBottom>
            <>{t("Categories")}</>
          </Typography>
        </Container>
      </Box>
      <Container sx={{mt:"80px"}} maxWidth="xl">
        <FetchingCategorys />
      </Container>
    </div>
  );
};

export default Categorys;
