import React from "react";
import {
  Box,
<<<<<<< HEAD
  Breadcrumbs,
  Button,
=======
>>>>>>> 3a386deeab3e770d2d22dd84bfec0de329f0005e
  Card,
  CardContent,
  Container,
<<<<<<< HEAD
  Grid,
  IconButton,
  Link,
=======
>>>>>>> 3a386deeab3e770d2d22dd84bfec0de329f0005e
  Skeleton,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import api from "../../API/Fetch_data_Api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";

const FetchingCategorys = () => {
  const [image, setImage] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(() => {
    api
      .get_Api_Category()
      .then((response) => setImage(response.data))
      .then((response) => SetIsLoading(true))
      .catch((error) => console.log(error));
  }, []);

  const theme = useTheme();

  return (
    <Container>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Catregory name comes from api  */}
          {/* --------------------------------------------------- */}
          <Typography
            sx={{ marginBottom: 1, fontSize: theme.palette.fonts.h1 }}
          >
            Creative Category
          </Typography>
          <Box>
            <span className="previous-next-btn" sx={{ marginLeft: "auto" }}>
              <IconButton aria-label="delete" color="primary">
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton aria-label="delete" color="primary">
                <ArrowForwardIosIcon />
              </IconButton>
            </span>
          </Box>
        </Box>
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          slidesPerView={5}
          freeMode={true}
          // navigation={true}
          style={{
            height: "auto",
          }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
<<<<<<< HEAD
              slidesPerView: 4,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 5,
=======
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
>>>>>>> 3a386deeab3e770d2d22dd84bfec0de329f0005e
            },
            1200:{
              slidesPerView: 5,
              spaceBetween:30,
            }
          }}
        >
          {isLoading ? (
            <Box>
              {image.map((response) => {
                return (
<<<<<<< HEAD
                  <>
                    <div className="swiper-button-prev">hi</div>

                    <SwiperSlide
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {/* <Card sx={{ borderRadius: 5,marginTop:3,marginBottom:3}}>
                <CardMedia
                  sx={{ height: 100, width: 100,padding:2 }}
                  image={response.category_image}
                ></CardMedia>
              </Card> */}
                      <Card
                        key={response.id}
                        sx={{
                          mt: 3,
                          width: 200,
                          height: 200,
                          border: "1px solid #e4e4e4",
                          boxShadow: 0,
                        }}
                      >
                        <img
                          src={response.category_image}
                          title="Services"
                          style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                        <CardContent sx={{ textAlign: "center", mt: -6 }}>
                          <NavLink
                            gutterBottom
                            variant="a"
                            // dynamic going to that page
                            to={"/categorys/" + response.id}
                            component="div"
                            style={{
                              textDecoration: "none",
                              color: theme.palette.color.catLink,
                            }}
                          >
                            <p>{response.name}</p>
                          </NavLink>
                          {/* <Typography variant="body2" color="text.secondary">
=======
                  <SwiperSlide
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Card
                      key={response.id}
                      sx={{
                        mt: 3,
                        mb: 2,
                        width: 200,
                        height: 200,
                        border: "1px solid #e4e4e4",
                        background: "white",
                        boxShadow: 0
                      }}
                    >
                      <img
                        src={response.category_image}
                        title={response.name}
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
                      />
                      <CardContent sx={{ textAlign: "center", mt: -6 }}>
                        <NavLink
                          gutterBottom
                          variant="a"
                          // dynamic going to that page
                          to={"/categorys/" + response.id}
                          component="div"
                          style={{
                            textDecoration: "none",
                            color: theme.palette.color.catLink,
                          }}
                        >
                          <h4 style={{fontWeight: 400}}>{response.name}</h4>
                        </NavLink>
                        {/* <Typography variant="body2" color="text.secondary">
>>>>>>> 3a386deeab3e770d2d22dd84bfec0de329f0005e
                        {response.admin_commission}+ Provider
                      </Typography> */}
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  </>
                );
              })}
            </Box>
          ) : (
            <Box display={"flex"} gap={2}>
              <Skeleton variant="rectangular" height={"200px"} width={"20%"} />
              <Skeleton variant="rectangular" height={"200px"} width={"20%"} />
              <Skeleton variant="rectangular" height={"200px"} width={"20%"} />
              <Skeleton variant="rectangular" height={"200px"} width={"20%"} />
              <Skeleton variant="rectangular" height={"200px"} width={"20%"} />
            </Box>
          )}
        </Swiper>
      </Box>
    </Container>
  );
};

export default FetchingCategorys;
