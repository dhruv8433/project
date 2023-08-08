// import React from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   IconButton,
//   Skeleton,
//   Typography,
// } from "@mui/material";
// import "swiper/css/free-mode";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper";
// import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
// import { useTheme } from "@emotion/react";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import slugify from "slugify";
// import { t } from "i18next";
// import api from '../../../API/Fetch_data_Api'

// const FetchingCategorys = () => {

//   const [image, setImage] = useState([]);
//   const [isLoading, SetIsLoading] = useState(false);
//   const [swiper, setSwiper] = useState(null);

//   const nextSlide = () => {
//     swiper.slideNext();
//   };
//   const prevSlide = () => {
//     swiper.slidePrev();
//   };

//   const cat_name = useParams();
//   const { title } = cat_name;

//   const fetchingData = () => {
//     api.get_home_screen()
//       .then((response) => setImage(response.data.categories))
//       .then((response) => console.log(response))
//       .then((response) => SetIsLoading(true))
//       .catch((error) => console.log(error));
//   }
 
//   useEffect(() => {
//       fetchingData();
//   }, []);

//   const theme = useTheme();
//   const navigate = useNavigate();

//   return (
//     <>
//       <Container>
//         <Box sx={{ marginTop: 2, marginBottom: 2 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography
//               sx={{ marginBottom: 1, fontSize: theme.palette.fonts.h2 }}
//             >
//               {t("Categories")}
//             </Typography>
//             <Box>
//               <span
//                 className="previous-next-btn"
//                 sx={{ marginLeft: "auto", alignItems: "center" }}
//               >
//                 <IconButton
//                   aria-label="delete"
//                   color="primary"
//                   onClick={() => prevSlide()}
//                 >
//                   <ArrowBackIosIcon
//                     sx={{ color: theme.palette.color.navLink }}
//                   />
//                 </IconButton>
//                 <IconButton
//                   aria-label="delete"
//                   color="primary"
//                   onClick={() => nextSlide()}
//                 >
//                   <ArrowForwardIosIcon
//                     sx={{ color: theme.palette.color.navLink }}
//                   />
//                 </IconButton>
//               </span>
//             </Box>
//           </Box>

//           <Swiper
//             className="myslider"
//             pagination={{
//               type: "progressbar",
//             }}
//             slidesPerView={5}
//             freeMode={true}
//             style={{
//               height: "auto",
//             }}
//             modules={[Pagination, Navigation]}
//             onSwiper={(s) => {
//               setSwiper(s);
//             }}
//             breakpoints={{
//               0: {
//                 slidesPerView: 1,
//               },
//               640: {
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//               },
//               768: {
//                 slidesPerView: 3,
//                 spaceBetween: 30,
//               },
//               1024: {
//                 slidesPerView: 4,
//                 spaceBetween: 20,
//               },
//               1200: {
//                 slidesPerView: 5,
//                 spaceBetween: 30,
//               },
//             }}
//           >
//             {isLoading ? (
//               <Box>
//                 {image.map((response) => {
//                   const slug = slugify(response.name, { lower: true });
//                   return (
//                     <SwiperSlide
//                       key={response.id}
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-around",
//                       }}
//                     >
//                       <Link
//                         to={"/categories/" + response.id + "/" + slug}
//                         style={{ textDecoration: "none" }}
//                       >
//                         <Card
//                           className="creative_category"
//                           key={response.id}
//                           sx={{
//                             mt: 3,
//                             mb: 2,
//                             width: 200,
//                             height: 200,
//                             border: "1px solid #e4e4e4",
//                             background: "white",
//                           }}
//                         >
//                           <img
//                             alt="service_image"
//                             src={response.category_image}
//                             title={response.name}
//                             style={{
//                               maxHeight: "100%",
//                               maxWidth: "100%",
//                               objectFit: "cover",
//                             }}
//                           />
//                           <CardContent sx={{ textAlign: "center", mt: -6 }}>
//                             <NavLink
//                               gutterBottom
//                               variant="a"
//                               to={"/categories/" + response.id + "/" + slug}
//                               component="div"
//                               style={{
//                                 textDecoration: "none",
//                                 color: "black",
//                               }}
//                             >
//                               <h4 style={{ fontWeight: 400 }}>
//                                 {response.name}
//                               </h4>
//                             </NavLink>
//                           </CardContent>
//                         </Card>
//                       </Link>
//                     </SwiperSlide>
//                   );
//                 })}
//               </Box>
//             ) : (
//               <Grid container>
//                 <Grid item xs={12}>
//                   <Box display={{ xs: "none", sm: "none", md: "flex" }} gap={2}>
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       sx={{ borderRadius: 4 }}
//                       width={"20%"}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       width={"20%"}
//                       sx={{ borderRadius: 4 }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       sx={{ borderRadius: 4 }}
//                       width={"20%"}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       sx={{ borderRadius: 4 }}
//                       width={"20%"}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       width={"20%"}
//                       sx={{ borderRadius: 4 }}
//                     />
//                   </Box>

//                   <Box
//                     display={{ xs: "none", sm: "flex", md: "none" }}
//                     justifyContent={"center"}
//                     gap={2}
//                   >
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       width={"30%"}
//                       sx={{ borderRadius: 4 }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       width={"30%"}
//                       sx={{ borderRadius: 4 }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       width={"30%"}
//                       sx={{ borderRadius: 4 }}
//                     />
//                   </Box>

//                   <Box
//                     display={{ xs: "flex", sm: "none", md: "none" }}
//                     justifyContent={"center"}
//                     gap={2}
//                   >
//                     <Skeleton
//                       variant="rectangular"
//                       height={"250px"}
//                       width={"75%"}
//                       sx={{ borderRadius: 4 }}
//                     />
//                   </Box>
//                 </Grid>
//               </Grid>
//             )}
//           </Swiper>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default FetchingCategorys;
