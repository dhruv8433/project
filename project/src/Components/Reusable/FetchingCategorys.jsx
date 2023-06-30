// import api from "../../API/Fetch_data_Api";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import slugify from "slugify";
import { t } from "i18next";

const FetchingCategorys = () => {
  const [image, setImage] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [swiper, setSwiper] = useState(null);

  const nextSlide = () => {
    swiper.slideNext();
  };
  const prevSlide = () => {
    swiper.slidePrev();
  };

  const cat_name = useParams();
  const { title } = cat_name;

  useEffect(() => {

    var formdata = new FormData();
    formdata.append("latitude", "23.2507356");
    formdata.append("longitude", "69.6689201");
    formdata.append("title", `${title}`);


    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = fetch(
      "https://edemand.wrteam.me/api/v1/get_home_screen_data",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => setImage(response.data.categories))
      .then((response) => SetIsLoading(true))
      .catch((error) => console.log(error));
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();



  return (
    <>
      <Container>
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ marginBottom: 1, fontSize: theme.palette.fonts.h2 }}
            >
              {t("Creative Categories")}
            </Typography>
            {/* <SwiperButton /> */}
            <Box>
              <span
                className="previous-next-btn"
                sx={{ marginLeft: "auto", alignItems: "center" }}
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

          <Swiper
            className="myslider"
            pagination={{
              type: "progressbar",
            }}
            slidesPerView={5}
            freeMode={true}
            style={{
              height: "auto",
            }}
            modules={[Pagination, Navigation]}
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
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {isLoading ? (
              <Box>
                {image.map((response) => {
                  const slug = slugify(response.name, { lower: true });
                  return (
                    <SwiperSlide
                      style={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Card
                        className="creative_category"
                        key={response.id}
                        onClick={() => navigate("/categories/" + response.id + '/' + slug)}
                        sx={{
                          mt: 3,
                          mb: 2,
                          width: 200,
                          height: 200,
                          border: "1px solid #e4e4e4",
                          background: "white",
                          // boxShadow: 0,
                        }}
                      >
                        <img
                          alt="service_image"
                          src={response.category_image}
                          title={response.name}
                          //  onClick={navigate("./categorys/213")}
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <CardContent sx={{ textAlign: "center", mt: -6 }}>
                          <NavLink
                            gutterBottom
                            variant="a"
                            // dynamic going to that page
                            to={"/categories/" + response.id + '/' + slug}
                            component="div"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <h4 style={{ fontWeight: 400 }}>{response.name}</h4>
                          </NavLink>
                          {/* <Typography variant="body2" color="text.secondary">
                        {response.admin_commission}+ Provider
                      </Typography> */}
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  );
                })}
              </Box>
            ) : (
              <Box display={"flex"} gap={2}>
                <Skeleton variant="rectangular" height={"250px"} width={"20%"} />
                <Skeleton variant="rectangular" height={"250px"} width={"20%"} />
                <Skeleton variant="rectangular" height={"250px"} width={"20%"} />
                <Skeleton variant="rectangular" height={"250px"} width={"20%"} />
                <Skeleton variant="rectangular" height={"250px"} width={"20%"} />
              </Box>
            )}
          </Swiper>
        </Box>
      </Container>
    </>
  );
};

export default FetchingCategorys;
