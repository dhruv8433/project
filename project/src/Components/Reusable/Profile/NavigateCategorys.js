import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import { NavLink, Link as Links } from "react-router-dom";
import Partner from "../Sections/Partner";
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
import { useTheme } from "@mui/material/styles"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { t } from "i18next";
import slugify from "slugify";
import Layout from "../../layout/Layout";
import { API_URL } from "../../../config/config";
import { PartnerSkeleton } from "../Sections/Skeletons";

const NavigateCategorys = ({ match }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [categoryPartner, setCategoryPartner] = useState([]);
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
    const lat = localStorage.getItem("Lat");
    const lng = localStorage.getItem("Lng");
    formdata.append("latitude", lat);
    formdata.append("longitude", lng);
    formdata.append("category_id", `${id}`);
    formdata.append("title", `${title}`);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_URL}/get_sub_categories`,
      requestOptions
    );
    const result = await response.json();
    return result;
  }

  async function Partners() {
    var formdata = new FormData();
    const lat = localStorage.getItem("Lat");
    const lng = localStorage.getItem("Lng");
    formdata.append("latitude", lat);
    formdata.append("longitude", lng);
    formdata.append("category_id", id);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    const response = await fetch(
      `${API_URL}/get_providers`,
      requestOptions
    );
    const result = await response.json();
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

    Partners()
      .then((result) => {
        console.log(result.data)
        setCategoryPartner(result.data)
        setIsLoading(true);
      })
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ background: theme.palette.background.box }}>
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
              <>{t("Sub Categories")}</>
            </Typography>
          </Container>
        </Box>
        <Box sx={{ background: theme.palette.background.box }}>
          <Container >
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
                              fontSize={'24pt'}
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
                                  sx={{ color: theme.palette.background.navLink }}
                                />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                color="primary"
                                onClick={() => nextSlide()}
                              >
                                <ArrowForwardIosIcon
                                  sx={{ color: theme.palette.background.navLink }}
                                />
                              </IconButton>
                            </span>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                  {title.length === 0 ? <hr /> : ""}

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
                {isLoading ? (data.length === 0 && categoryPartner.length === 0 ? (<>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img src={require("../../../Images/no-provider.png")} alt="NO SUB CATEGORY FOUND" height={300} width={"auto"} />
                  </Box>
                </>) : (<Box>
                  {data.map((response) => {
                    const slug = slugify(response.name, { lower: true });
                    return (
                      <SwiperSlide
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Links to={"/categories/" + response.id + "/providers/" + slug} style={{ textDecoration: "none" }}>
                          <Card
                            sx={{ width: 240, height: 200, borderRadius: "10px", marginBottom: 10 }}
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
                        </Links>
                      </SwiperSlide>
                    );
                  })}
                </Box>)

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


            {data.length === 0 ? (<Box sx={{ mt: -10, mb: 2 }}>
              {categoryPartner.length === 0 ? "" : <> <h1>Providers</h1>
                <hr />
                <br /></>}
              {isLoading ? <Box display={"flex"} justifyContent={"flex-start"} gap={12}>
                {categoryPartner.map((response) => {
                  return (
                    <Partner partner={response} />
                  )
                })}
              </Box> : <><PartnerSkeleton /> </>}
            </Box>) : (
              <>{categoryPartner.length === 0 ? "" : <> <h1>Providers</h1>
              <hr />
              <br /></>}
                {isLoading ? <Box display={"flex"} justifyContent={"flex-start"} gap={12}>
                  {categoryPartner.map((response) => {
                    return (
                      <Partner partner={response} />
                    )
                  })}
                </Box> :
                  <><PartnerSkeleton /> </>
                }
              </>)}


          </Container>
        </Box>
      </div>
    </Layout>
  );
};

export default NavigateCategorys;