import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";

import api from "../../../API/Fetch_data_Api";
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  IconButton,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { t } from "i18next";

const NavigateCategorys = ({ match }) => {


  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swiper, setSwiper] = React.useState(null);

  const nextSlide = () => {
    swiper.slideNext();
  };
  const prevSlide = () => {
    swiper.slidePrev();
  };

  const params = useParams();
  // add as a object because it is multiple
  const { id } = params;

  async function allData() {
    var formdata = new FormData();
    formdata.append("latitude", "23.2507356");
    formdata.append("longitude", "69.6689201");
    formdata.append("category_id", `${id}`);
    formdata.append("title", `${title}`);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "https://edemand.wrteam.me/api/v1/get_sub_categories",
      requestOptions
    );
    const result = await response.json();
    // console.log(result);
    return result;
  }

  useEffect(() => {
    allData()
      .then((response) => setData(response.data))
      .then((response) => setIsLoading(true))
    // .then((response) => console.log(response));

    api
      .get_Api_Category()
      .then((response) => setTitle(response.data))
      .then((response) => setIsLoading(true))
    // .catch((error) => console.log(error));
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div style={{ background: theme.palette.background.categories, height: "600px" }}>
      <Box bgcolor={theme.palette.background.heading} paddingTop={"25px"} paddingBottom={"15px"} mb={"20px"}>
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
            <Link
              sx={{ cursor: "pointer", textDecoration: "none" }}
              color="inherit"
              onClick={() => navigate("/categories")}
            >
              {t("Categories")}
            </Link>
            {/* <Typography color="text.primary">categories</Typography> */}
            {isLoading ? (
              <Box>
                {title.map((response) => {
                  if (response.id === id) {
                    return (
                      <Typography color="text.primary" key={response.id}>
                        {response.name} {/* Assuming "title" is a property in the response object */}
                      </Typography>
                    );
                  }
                  return null;
                })}
              </Box>
            ) : (
              <Box sx={{ width: 200 }}>
                <Skeleton variant="text" sx={{ height: 50, width: 200 }} />
              </Box>
            )}

          </Breadcrumbs>
          <Typography variant="h4" gutterBottom>
            <>{t("Sub-Categories")}</>
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box sx={{ paddingBottom: 1, mt: 5 }}>
          {/* ------------------------------------------------------------------ */}
          {/* Everything should be coming from api  */}
          {isLoading ? (
            <Box>
              {title.map((response) => {
                if (response.id == `${id}`) {
                  document.title = `${response.name} | eDemand`
                  return (
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Box display={"flex"} justifyContent={"space-between"} mt={1}>
                        <Typography
                          fontSize={theme.palette.fonts.h1}
                          fontWeight={500}
                        >
                          {response.name}
                        </Typography>
                      </Box>
                      <Box mt={1}>
                        <span
                          className="previous-next-btn"
                          sx={{ marginLeft: "auto" }}
                        >
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={() => prevSlide()}
                          >
                            <ArrowBackIosIcon
                              sx={{ color: theme.palette.color.navLink }}
                            />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={() => nextSlide()}
                          >
                            <ArrowForwardIosIcon
                              sx={{ color: theme.palette.color.navLink }}
                            />
                          </IconButton>
                        </span>
                      </Box>
                    </Box>
                  );
                }
              })}
              <hr color="whitesmoke" />
            </Box>
          ) : (
            <Box sx={{ width: 200 }}>
              <Skeleton
                variant="text"
                sx={{ height: 50, width: 200 }}
              ></Skeleton>
            </Box>
          )}
        </Box>
        {/* ------------------------------------------------------------------------ */}

        <Box sx={{ marginTop: 4, marginBottom: 10 }}>
          <Swiper
            slidesPerView={5}
            freeMode={true}
            // navigation={true}
            style={{
              height: "auto",
            }}
            onSwiper={(s) => {
              // console.log("initialize swiper", s);
              setSwiper(s);
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {isLoading ? (
              <Box>
                {data.map((response) => {
                  return (
                    <SwiperSlide
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Card
                        // className="service-card"
                        sx={{ width: 240, height: 200, borderRadius: "10px", marginBottom: 10 }}
                        onClick={() => navigate("/providers")}
                      >
                        <img
                          src={response.category_image}
                          title={response.name}
                          alt={""}
                          style={{
                            height: "100%",
                            width: "100%",
                            filter: "brightness(0.8)",
                          }}
                        />
                        <Box marginTop={-5} textAlign={"center"}>
                          <Typography
                            variant="h6"
                            zIndex={1}
                            position={"relative"}
                          >
                            <NavLink
                              to={"/providers"}
                              style={{
                                color: "white",
                                textDecoration: "none",
                                fontWeight: 600,
                              }}
                            >
                              {response.name}
                            </NavLink>
                          </Typography>
                        </Box>
                      </Card>
                    </SwiperSlide>
                  );
                })}
              </Box>
            ) : (
              <Box display={"flex"} gap={2}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={"200px"}
                  width={"20%"}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={"200px"}
                  width={"20%"}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={"200px"}
                  width={"20%"}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={"200px"}
                  width={"20%"}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={"200px"}
                  width={"20%"}
                />
              </Box>
            )}
          </Swiper>
        </Box>
      </Container>
    </div>
  );
};

export default NavigateCategorys;
