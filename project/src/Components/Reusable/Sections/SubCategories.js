import {
  Box,
  Card,
  Container,
  Divider,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
// import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { NavLink, Link } from "react-router-dom";
import SubCategory from "./SubCategory";
import { SkeletonSubCategory } from "./Skeletons";

const SubCategories = ({ subCategory, loading }) => {
  const [swiper, setSwiper] = useState(null);
  const theme = useTheme();
  // Function to handle sliding to the next slide
  const handleNextSlide = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  // Function to handle sliding to the previous slide
  const handlePrevSlide = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };
  return (
    <div>
      <div>
        <>
          <>
            <div style={{ background: theme.palette.background.box }}>
              <Container>
                <Box key={subCategory.id}>
                  <Box
                    sx={{
                      paddingBottom: 1,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {loading ? (
                      <Skeleton height={50} width={200} />) : (<Box>
                        <Typography
                          fontSize={theme.palette.fonts.h2}
                          marginBottom={"-2px"}
                          marginTop={1}
                        >
                          {subCategory.title}
                        </Typography>
                      </Box>)}

                    {loading ? ("") : (<Box sx={{ mt: 1 }}>
                      <span
                        className="previous-next-btn"
                        sx={{ marginLeft: "auto" }}
                      >
                        <IconButton
                          aria-label="delete"
                          onClick={() => handlePrevSlide()}
                        >
                          <ArrowBackIosIcon
                            sx={{ color: theme.palette.color.navLink }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleNextSlide()}
                        >
                          <ArrowForwardIosIcon
                            sx={{ color: theme.palette.color.navLink }}
                          />
                        </IconButton>
                      </span>
                    </Box>)}


                  </Box>
                  <Divider />
                  <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                    {/* Render the sub-categories for each subCategory */}
                    <Swiper
                      className="swiper-wrapper-padding"
                      slidesPerView={5}
                      freeMode={true}
                      onSwiper={(s) => {
                        setSwiper(s);
                      }}
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
                        {subCategory.sub_categories.map((response) => (
                          <SwiperSlide
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            {loading ? (<SkeletonSubCategory />) : (
                              <SubCategory subCategory={response} />
                            )}
                          </SwiperSlide>
                        ))}
                      </Box>
                    </Swiper>
                  </Box>
                </Box>
              </Container>
            </div>
          </>
        </>
      </div>
    </div>
  );
};

export default SubCategories;
