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
  Link,
  Skeleton,
  IconButton,
  Typography,
} from "@mui/material";
import '../../CSS/style.css';
import { useEffect, useState } from "react";
import api from "../../API/Fetch_data_Api";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FavoriteBorder } from "@mui/icons-material";

const FetchingServies = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swiper, setSwiper] = React.useState(null);

  const nextSlide = () => {
    swiper.slideNext();
  };
  const prevSlide = () => {
    swiper.slidePrev();
  };

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
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ paddingBottom: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {isLoading ? (
            <Box>
              {title.map((response) => {
                if (response.id == 213) {
                  return (
                    <>
                      <Typography
                        fontSize={theme.palette.fonts.h2}
                        marginBottom={1}
                      // fontWeight={400}
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
              <Skeleton
                variant="text"
                sx={{ height: 50, width: 200 }}
              ></Skeleton>
            </Box>
          )}
          <Box>
            <span className="previous-next-btn" sx={{ marginLeft: "auto" }}>
              <IconButton aria-label="delete" onClick={prevSlide}>
                <ArrowBackIosIcon
                  sx={{ color: theme.palette.color.navLink }}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={nextSlide}>
                <ArrowForwardIosIcon
                  sx={{ color: theme.palette.color.navLink }}
                />
              </IconButton>
            </span>
          </Box>
        </Box>
      </Box>
      <hr color="whitesmoke" />
      {/* ------------------------------------------------------------------------ */}

      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
       {/* Empty state  */}
        <Swiper
          className="swiper-wrapper-padding"
          slidesPerView={5}
          freeMode={true}
          // navigation={true}
          style={{
            height: "auto",
          }}
          modules={[Navigation]}
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
              {image.map((response) => {
                return (
                  <div key={response.id}>
                    <SwiperSlide
                      style={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Card
                        className="service-card"
                        key={response.id}
                        sx={{ width: 260, height: 220, borderRadius: "10px" }}
                        onClick={() => navigate("/providers/services/293/world-clean-pvt-ltd")}
                      >
                        <img
                          src={response.category_image}
                          title={response.name}
                          alt="service_image"
                          style={{
                            height: "100%",
                            width: "100%",
                            filter: "brightness(0.8)",
                            justifyContent: "center",
                            objectFit: "cover",
                            display: "flex",
                          }}
                        // we have to implemenmt provider/service/...
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
                        <div className="overlay"></div>
                        {/* <div className="service-card-rating">4.5</div> */}
                      </Card>
                    </SwiperSlide>
                  </div>
                );
              })}
            </Box>
          ) : (
            <Box display={"flex"} gap={2}>
              <MySkeleton />
              <MySkeleton />
              <MySkeleton />
              <MySkeleton />
            </Box>
          )}
        </Swiper>
      </Box>
    </Container>
  );
};

export default FetchingServies;

// laundry services fetching -----------------------------------------------------------------------------------------------------------------------

export const FetchingPlumbing = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swiper, setSwiper] = React.useState(null);

  const navigate = useNavigate();

  const nextSlide = () => {
    swiper.slideNext();
  };
  const prevSlide = () => {
    swiper.slidePrev();
  };
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
                        fontSize={theme.palette.fonts.h2}
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
              <Skeleton
                variant="text"
                sx={{ height: 50, width: 200 }}
              ></Skeleton>
            </Box>
          )}
          <Box>
            <span className="previous-next-btn" sx={{ marginLeft: "auto" }}>
              <IconButton aria-label="delete" onClick={prevSlide}>
                <ArrowBackIosIcon
                  sx={{ color: theme.palette.color.navLink }}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={nextSlide}>
                <ArrowForwardIosIcon
                  sx={{ color: theme.palette.color.navLink }}
                />
              </IconButton>
            </span>
          </Box>
        </Box>
        <hr color="whitesmoke" />
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Swiper
          className="swiper-wrapper-padding"
          slidesPerView={5}
          freeMode={true}
          onSwiper={(s) => {
            // console.log("initialize swiper", s);
            setSwiper(s);
          }}
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
                      className="service-card"
                      onClick={() => navigate("/providers/services/303/dlyingdata-multi-services")}
                      key={response.id}
                      sx={{ width: 260, height: 220, borderRadius: "10px" }}
                    >
                      <img
                        src={response.category_image}
                        title={response.name}
                        alt="service_image"
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
                      <div className="overlay"></div>
                      {/* <div className="service-card-rating">
                        <FavoriteBorder />
                      </div> */}
                    </Card>
                  </SwiperSlide>
                );
              })}
            </Box>
          ) : (
            <Box display={"flex"} gap={2}>
              <MySkeleton />
              <MySkeleton />
              <MySkeleton />
              <MySkeleton />
            </Box>
          )}
        </Swiper>
      </Box>
    </Container>
  );
};

// plumbing services fetching-------------------------------------------------------------------------------------------------------------------------

export const FetchingLaundry = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swiper, setSwiper] = React.useState(null);

  const navigate = useNavigate();

  const nextSlide = () => {
    swiper.slideNext();
  };
  const prevSlide = () => {
    swiper.slidePrev();
  };

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
                        fontSize={theme.palette.fonts.h2}
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
              <Skeleton
                variant="text"
                sx={{ height: 50, width: 200 }}
              ></Skeleton>
            </Box>
          )}
          <Box>
            <span className="previous-next-btn" sx={{ marginLeft: "auto" }}>
              <IconButton aria-label="delete" onClick={prevSlide}>
                <ArrowBackIosIcon
                  sx={{ color: theme.palette.color.navLink }}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={nextSlide}>
                <ArrowForwardIosIcon
                  sx={{ color: theme.palette.color.navLink }}
                />
              </IconButton>
            </span>
          </Box>
        </Box>
        <hr color="whitesmoke" />
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Swiper
          className="swiper-wrapper-padding"
          slidesPerView={5}
          freeMode={true}
          // navigation={true}
          onSwiper={(s) => {
            // console.log("initialize swiper", s);
            setSwiper(s);
          }}
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
                      className="service-card"
                      key={response.id}
                      sx={{ width: 260, height: 220, borderRadius: "10px" }}
                      onClick={() => navigate("providers/services/298/plumbhelp-pvt-ltd")}
                    >
                      <img
                        src={response.category_image}
                        alt="service_image"
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
                      <div className="overlay"></div>
                      {/* <div className="service-card-rating">4.5</div> */}
                    </Card>
                  </SwiperSlide>
                );
              })}
            </Box>
          ) : (
            <Box display={"flex"} gap={2}>
              <MySkeleton />
              <MySkeleton />
              <MySkeleton />
              <MySkeleton />
            </Box>
          )}
        </Swiper>
      </Box>
    </Container>
  );
};

// car services fetching -----------------------------------------------------------------------------------------------------------------------

export const FetchingCar = () => {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swiper, setSwiper] = React.useState(null);

  const navigate = useNavigate();

  const nextSlide = () => {
    swiper.slideNext();
  };
  const prevSlide = () => {
    swiper.slidePrev();
  };
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
                        fontSize={theme.palette.fonts.h2}
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
              <Skeleton
                variant="text"
                sx={{ height: 50, width: 200 }}
              ></Skeleton>
            </Box>
          )}
          <Box>
            <span className="previous-next-btn" sx={{ marginLeft: "auto" }}>
              <IconButton aria-label="delete" onClick={prevSlide}>
                <ArrowBackIosIcon
                  sx={{ color: theme.palette.color.navLink }}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={nextSlide}>
                <ArrowForwardIosIcon
                  sx={{ color: theme.palette.color.navLink }}
                />
              </IconButton>
            </span>
          </Box>
        </Box>
        <hr color="whitesmoke" />
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Swiper
          className="swiper-wrapper-padding"
          slidesPerView={4}
          freeMode={true}
          onSwiper={(s) => {
            // console.log("initialize swiper", s);
            setSwiper(s);
          }}
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
                      className="service-card"
                      onClick={() => navigate("/providers/services/270/piston-car-service")}
                      key={response.id}
                      sx={{ width: 260, height: 220, borderRadius: "10px", cursor: "pointer" }}
                    >
                      <img
                        src={response.category_image}
                        title={response.name}
                        alt="service_image"
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
                      <div className="overlay"></div>
                      {/* <div className="service-card-rating">4.5</div> */}
                    </Card>
                  </SwiperSlide>
                );
              })}
            </Box>
          ) : (
            <Box display={"flex"} gap={2}>
              <MySkeleton />
              <MySkeleton />
              <MySkeleton />
              <MySkeleton />
            </Box>
          )}
        </Swiper>
      </Box>
    </Container>
  );
};

const MySkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"200px"}
      width={"24%"}
    />
  );
};
