import React from "react";
import {
  Box,
  Breadcrumbs,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../API/Fetch_data_Api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const FetchingServies = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingFunction = () => {
    api
      .get_categories_home()
      .then((response) => setImage(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));

    api
      .get_Api_Category()
      .then((response) => setTitle(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchingFunction();
  }, []);

  const theme = useTheme();

  return (
    <Container>
      <Box sx={{ paddingBottom: 1 }}>
        {/* ------------------------------------------------------------------ */}
        {/* Everything should be coming from api  */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>

        {isLoading ? (
          <Box>
            {title.map((response) => {
              if (response.id == 213) {
                return (
                  <>
                    <Typography
<<<<<<< HEAD
                      fontSize={theme.palette.fonts.h2}
                      fontWeight={500}
=======
                      fontSize={theme.palette.fonts.h1}
                      marginBottom={1}
                      // fontWeight={400}
>>>>>>> 3a386deeab3e770d2d22dd84bfec0de329f0005e
                    >
                      {response.name}
                    </Typography>
                  </>
                );
              }
            })}
          </Box>
        ) : (
          <Box sx={{ width: 200 }}>
            <Skeleton variant="text" sx={{ height: 50, width: 200 }}></Skeleton>
          </Box>
        )}
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
        <hr color="whitesmoke" />
      </Box>
      {/* ------------------------------------------------------------------------ */}

      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Swiper
          slidesPerView={5}
          freeMode={true}
          // navigation={true}
          style={{
            height: "auto",
          }}
          modules={[Navigation]}
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
              {image.map((response) => {
                return (
                  <SwiperSlide
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Card
                      key={response.id}
                      sx={{ width: 260, height: 220, borderRadius: "10px" }}
                    >
                      <img
                        src={response.category_image}
                        title={response.name}
                        style={{
                          height: "100%",
                          width: "100%",
                          filter: "brightness(0.8)",
                          justifyContent: "center",
                          objectFit: "cover",
                          display: "flex",
                        }}
                      />
                      <Box marginTop={-5} textAlign={"center"}>
                        <Typography
                          variant="h6"
                          zIndex={1}
                          position={"relative"}
                        >
                          <NavLink
                            to={"/providers/services"}
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
  );
};

export default FetchingServies;

// plumbing services fetching

export const FetchingPlumbing = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingFunction = () => {
    api
      .get_categories_laundry()
      .then((response) => setImage(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));

    api
      .get_Api_Category()
      .then((response) => setTitle(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };
  const theme = useTheme();

  useEffect(() => {
    fetchingFunction();
  }, []);

  return (
    <Container>
      <Box sx={{ paddingBottom: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>

        {isLoading ? (
          <Box>
            {title.map((response) => {
              if (response.id == 222) {
                return (
                  <>
                    <Typography
                      fontSize={theme.palette.fonts.h1}
                      marginBottom={1}
                    >
                      {response.name}
                    </Typography>
              
                    <hr color="whitesmoke" />

                  </>
                );
              }
            })}
          </Box>
        ) : (
          <Box sx={{ width: 200 }}>
            <Skeleton variant="text" sx={{ height: 50, width: 200 }}></Skeleton>
          </Box>
        )}
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
        <hr color="whitesmoke" />
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Swiper
          slidesPerView={5}
          freeMode={true}
          // navigation={true}
          style={{
            height: "auto",
          }}
          modules={[Navigation]}
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
             
              {image.map((response) => {
                return (
                  <SwiperSlide
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Card
                      key={response.id}
                      sx={{ width: 260, height: 220, borderRadius: "10px" }}
                    >
                      <img
                        src={response.category_image}
                        title={response.name}
                        style={{
                          height: "100%",
                          width: "100%",
                          filter: "brightness(0.8)",
                          justifyContent: "center",
                          objectFit: "cover",
                          display: "flex",
                        }}
                      />
                      <Box marginTop={-5} textAlign={"center"}>
                        <Typography
                          variant="h6"
                          zIndex={1}
                          position={"relative"}
                        >
                          <NavLink
                            to={"/providers/services"}
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
  );
};

// Laundry services fetching

export const FetchingLaundry = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingFunction = () => {
    api
      .get_categories_plumbing()
      .then((response) => setImage(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));

    api
      .get_Api_Category()
      .then((response) => setTitle(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchingFunction();
  }, []);
  const theme = useTheme();

  return (
    <Container>
      <Box sx={{ paddingBottom: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>

        {isLoading ? (
          <Box>
            {title.map((response) => {
              if (response.id == 240) {
                return (
                  <>
                    <Typography
                      fontSize={theme.palette.fonts.h1}
                      marginBottom={1}
                    >
                      {response.name}
                    </Typography>
                  </>
                );
              }
            })}
          </Box>
        ) : (
          <Box sx={{ width: 200 }}>
            <Skeleton variant="text" sx={{ height: 50, width: 200 }}></Skeleton>
          </Box>
        )}
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
        <hr color="whitesmoke" />
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Swiper
          slidesPerView={5}
          freeMode={true}
          // navigation={true}
          style={{
            height: "auto",
          }}
          modules={[Navigation]}
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {image.map((response) => {
                return (
                  <SwiperSlide
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Card
                      key={response.id}
                      sx={{ width: 260, height: 220, borderRadius: "10px" }}
                    >
                      <img
                        src={response.category_image}
                        title={response.name}
                        style={{
                          height: "100%",
                          width: "100%",
                          filter: "brightness(0.8)",
                          justifyContent: "center",
                          objectFit: "cover",
                          display: "flex",
                        }}
                      />
                      <Box marginTop={-5} textAlign={"center"} color={"white"}>
                        <Typography
                          variant="h6"
                          zIndex={1}
                          position={"relative"}
                        >
                          <NavLink
                            to={"/providers/services"}
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
  );
};

// car services fetching

export const FetchingCar = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingFunction = () => {
    api
      .get_categories_car()
      .then((response) => setImage(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));

    api
      .get_Api_Category()
      .then((response) => setTitle(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchingFunction();
  }, []);
  const theme = useTheme();

  return (
    <Container>
      <Box sx={{ paddingBottom: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>

        {isLoading ? (
          <Box>
            {title.map((response) => {
              if (response.id == 259) {
                return (
                  <>
                    <Typography
                     fontSize={theme.palette.fonts.h1}
                     marginBottom={1}
                    >
                      {response.name}
                    </Typography>
                    
                   
                  </>
                );
              }
            })}
          </Box>
        ) : (
          <Box sx={{ width: 200 }}>
            <Skeleton variant="text" sx={{ height: 50, width: 200 }}></Skeleton>
          </Box>
        )}
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
        <hr color="whitesmoke" />
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Swiper
          slidesPerView={5}
          freeMode={true}
          // navigation={true}
          style={{
            height: "auto",
          }}
          modules={[Navigation]}
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
              {image.map((response) => {
                return (
                  <SwiperSlide
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Card
                      key={response.id}
                      sx={{ width: 260, height: 220, borderRadius: "10px" }}
                    >
                      <img
                        src={response.category_image}
                        title={response.name}
                        style={{
                          height: "100%",
                          width: "100%",
                          filter: "brightness(0.8)",
                          justifyContent: "center",
                          objectFit: "cover",
                          display: "flex",
                        }}
                      />
                      <Box marginTop={-5} textAlign={"center"} color={"white"}>
                        <Typography
                          variant="h6"
                          zIndex={1}
                          position={"relative"}
                        >
                          <NavLink
                            to={"/providers/services"}
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
  );
};
