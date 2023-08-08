import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Breadcrumbs,
  Checkbox,
  Rating,
  Typography,
  TextField,
  Backdrop,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import { Search, GpsFixed, Close, East } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import { t } from "i18next";
import { Autocomplete } from "@mui/material";
import slugify from "slugify";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";

const SubCategoriesHome = ({ subCatTitle, subCat }) => {
  const theme = useTheme();
  return (
    <div>
      {/* {isLoading ? ( */}
      <>
        {subCatTitle.map((section) => {
          if(section.section_type == "sub_categories")
          return (
            <>
              <div style={{ background: theme.palette.background.box }}>
                <Container>
                  <Box key={section.key}>
                    <Box
                      sx={{
                        paddingBottom: 1,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          fontSize={theme.palette.fonts.h2}
                          marginBottom={"-2px"}
                          marginTop={1}
                        >
                          {section.title}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 1 }}>
                        <span
                          className="previous-next-btn"
                          sx={{ marginLeft: "auto" }}
                        >
                          <IconButton
                            aria-label="delete"
                            // onClick={handlePrevCustomSlide}
                          >
                            <ArrowBackIosIcon
                              sx={{ color: theme.palette.color.navLink }}
                            />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <ArrowForwardIosIcon
                              sx={{ color: theme.palette.color.navLink }}
                            />
                          </IconButton>
                        </span>
                      </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                      {/* Render the sub-categories for each section */}
                      <Swiper
                        className="swiper-wrapper-padding"
                        slidesPerView={5}
                        freeMode={true}
                        // navigation={true}
                        style={{
                          height: "auto",
                        }}
                        modules={[Navigation]}
                        // onSwiper={(s) => {
                        //   setCustomSwipe(s);
                        // }}
                        breakpoints={{
                          0: {
                            slidesPerView: 1,
                          },
                          640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                          },
                          898: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                          },
                          1204: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                          },
                        }}
                      >
                        <Box>
                          {section.section_type == "sub_categories" && (
                            <>
                              {section.sub_categories.map((response) => (
                                <div key={response.id}>
                                  <SwiperSlide
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    <Link
                                      to={`/providers/services/${response.parent_id}/${response.company_name}`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <Card
                                        className="service-card"
                                        key={response.id}
                                        sx={{
                                          width: 260,
                                          height: 220,
                                          borderRadius: "10px",
                                          marginBottom: 2,
                                        }}
                                      >
                                        <img
                                          src={response.image}
                                          title={response.name}
                                          alt="service_image"
                                          style={{
                                            height: "100%",
                                            width: "100%",
                                            justifyContent: "center",
                                            objectFit: "cover",
                                            display: "flex",
                                            filter: "brightness(0.5)",
                                          }}
                                          // we have to implemenmt provider/service/...
                                        />
                                        <Box
                                          marginTop={-5}
                                          textAlign={"center"}
                                        >
                                          <Typography
                                            variant="h6"
                                            zIndex={1}
                                            position={"relative"}
                                          >
                                            <NavLink
                                              to={
                                                "/providers/services/293/world-clean-pvt-ltd"
                                              }
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
                                        {/* <div className="overlay"></div> */}
                                        {/* <div className="service-card-rating">4.5</div> */}
                                      </Card>
                                    </Link>
                                  </SwiperSlide>
                                </div>
                              ))}
                            </>
                          )}
                          <></>
                        </Box>
                      </Swiper>
                    </Box>
                  </Box>
                </Container>
              </div>
            </>
          );
        })}
      </>
      {/* ) : (
      Array.from({ length: 4 }).map((_, index) => (
        <>
          <div
            key={index}
            style={{ background: theme.palette.background.box }}
          >
            <Container>
              <Skeleton height={80} width={300} />
              <hr />
              <Box sx={{ display: "flex", gap: 2, marginTop: -3 }}>
                <Skeleton
                  height={400}
                  width={300}
                  sx={{ borderRadius: 3 }}
                />
                <Skeleton
                  height={400}
                  width={300}
                  sx={{ borderRadius: 3 }}
                />
                <Skeleton
                  height={400}
                  width={300}
                  sx={{ borderRadius: 3 }}
                />
                <Skeleton
                  height={400}
                  width={300}
                  sx={{ borderRadius: 3 }}
                />
              </Box>
            </Container>
          </div>
          <br />
        </>
      ))
    )} */}
    </div>
  );
};

export default SubCategoriesHome;
