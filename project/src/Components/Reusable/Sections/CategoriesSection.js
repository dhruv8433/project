import {
  Box,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import { useTheme } from "@emotion/react";
import { t } from "i18next";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Category from "./Category";
import { SkeletonSwiperSlide } from "./Skeletons";

const CategoriesSection = ({ categories, loading }) => {

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
    <div style={{ background: theme.palette.background.box }}>
      <Container>
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ marginBottom: 1, fontSize: theme.palette.fonts.h2, mt: 1 }}
            >
              {t("Categories")}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <span
                className="previous-next-btn"
                sx={{ marginLeft: "auto", alignItems: "center" }}
              >
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => handlePrevSlide()}
                >
                  <ArrowBackIosIcon
                    sx={{ color: theme.palette.color.navLink }}
                  />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => handleNextSlide()}
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
            {loading ? (
              // Render Skeletons when loading is true
              Array.from(Array(5).keys()).map((index) => (
                <SwiperSlide key={index}>
                  <SkeletonSwiperSlide />
                </SwiperSlide>
              ))
            ) : (
              categories.map((category) => {
                return (
                  <SwiperSlide
                    key={category.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Category category={category} />
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </Box>
      </Container>
    </div>
  );
};

export default CategoriesSection


