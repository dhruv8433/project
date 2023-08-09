import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
  Card,
  CardContent,
  Button,
  CardMedia,
  CardActions,
  Rating,
  Divider,
  LinearProgress,
  Avatar,
  Skeleton,
} from "@mui/material";
import api from "../../../API/Fetch_data_Api";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GradeIcon from "@mui/icons-material/Grade";
import CustomerReview from "./CustomerReview";
import StarIcon from "@mui/icons-material/Star";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Transert } from "../../../actions/action";
import { t } from "i18next";
import Layout from "../../layout/Layout";
import { API_URL } from "../../../config/config";
import { useTheme } from "@mui/material/styles";

const ProviderServices = ({ match }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [provider, setProvider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parentPicture, setParentPicture] = useState("");

  const Data = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const islogined = localStorage.getItem("ContactInfo");

  const handleOpen = (item) => {
    // if user is logged in then success otherwiser error 'please login'
    // islogined === ""
    //   ? toast.error("Please Login...")
    //   : toast.success("Added Success...");
    console.info("clicked", item);

    if (islogined == "") {
      toast.error("Please Login...");
      return;
    }
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const itemQuantities =
      JSON.parse(localStorage.getItem("itemQuantities")) || {};

    if (islogined) {
      if (item.id in itemQuantities) {
        toast.info("Item already in cart");
        return;
      } else toast.success("Added to cart!");
    }

    dispatch(Transert(item));
    cartData.push(item);
    localStorage.setItem("cart", JSON.stringify(cartData));
    localStorage.setItem("cart-booking", JSON.stringify(cartData));

    // Increment the item quantity by 1
    itemQuantities[item.id] = 0;
    localStorage.setItem("itemQuantities", JSON.stringify(itemQuantities));

    // Check if the item already exists in itemQuantities
    if (item.id in itemQuantities) {
      // Item already exists, increment the quantity by 1
      itemQuantities[item.id] += 1;
    } else {
      // Item doesn't exist, set the quantity to 1
      itemQuantities[item.id] = 1;
    }

    localStorage.setItem("itemQuantities", JSON.stringify(itemQuantities));
  };

  //dynamic urlN
  const params = useParams();
  const { partner_id } = params;
  const { company_name } = params;
  // console.log("partner_id" + partner_id);

  let finalDoc = 0;

  async function allData() {
    var formdata = new FormData();
    const lat = localStorage.getItem("Lat");
    const lng = localStorage.getItem("Lng");
    formdata.append("latitude", lat);
    formdata.append("longitude", lng);
    formdata.append("partner_id", `${partner_id}`);
    formdata.append("company_name", `${company_name}`);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(`${API_URL}/get_services`, requestOptions);

    const result = await response.json();
    setParentPicture(partner_id);
    return result;
  }

  useEffect(() => {
    document.title = `${company_name} | edemand`;

    allData()
      .then((response) => setData(response.data))
      .then((response) => setIsLoading(true));
    // .then((response) => console.log(response));
    api
      .get_providers()
      .then((response) => setProvider(response.data))
      .then((response) => setIsLoading(true));
    // .then((response) => console.log(response));
  }, []);

  return (
    <Layout>
      <Box
        bgcolor={theme.palette.background.box}
        paddingTop={"15px"}
        paddingBottom={"15px"}
        mb={"20px"}
      >
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
              onClick={() => navigate("/providers")}
            >
              {t("Providers")}
            </Link>
            <Typography color="text.primary">{t("Services")}</Typography>
          </Breadcrumbs>
          {isLoading ? (
            <>
              {provider.map((response) => {
                if (response.partner_id == partner_id)
                  return (
                    <>
                      {" "}
                      <Typography variant="h4" gutterBottom>
                        <strong>{response.company_name}</strong>
                      </Typography>
                    </>
                  );
              })}
            </>
          ) : (
            <Skeleton sx={{ width: "200px", height: "50px" }} />
          )}
        </Container>
      </Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.box,
                borderRadius: "10px",
                mb: 5,
              }}
            >
              <Typography variant="h5" ml={2} p={2}>
                <strong>{t("Our Services")}</strong>
              </Typography>
              <hr />

              <Box sx={{ p: 3 }}>
                <Box>
                  {isLoading ? (
                    <Box>
                      {data.map((response) => {
                        return (
                          <>
                            <Box sx={{ flexGrow: 1, borderRadius: "10px" }}>
                              <Card
                                sx={{
                                  display: "flex",
                                  boxShadow: "none",
                                  //change 200 from auto so auto adjustment
                                  height: "auto",
                                  p: 1,
                                }}
                              >
                                {/* PC SCREEN ONLY  */}
                                <Grid
                                  container
                                  display={{ xs: "none", sm: "flex" }}
                                  spacing={3}
                                >
                                  <Grid item md={4}>
                                    <CardMedia
                                      image={response.image_of_the_service}
                                      alt="hi"
                                      sx={{
                                        height: "180px",
                                        width: "200px",
                                        borderRadius: "4px",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item md={8}>
                                    <CardContent sx={{ ml: 2, p: 0 }}>
                                      <Box
                                        sx={{
                                          display: "block",
                                          textAlign: "start",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <Typography
                                            color={"#2560FC"}
                                            sx={{ marginRight: "auto" }}
                                          >
                                            {response.title}
                                          </Typography>
                                          <StarIcon sx={{ color: "gold" }} />
                                          {response.rating}
                                          <br />
                                        </Box>
                                        <Typography fontSize={14} pt={2}>
                                          {response.description}
                                        </Typography>
                                        <br /> <br />
                                        <Typography
                                          color={"gray"}
                                          fontSize={14}
                                          sx={{ mt: -4 }}
                                        >
                                          2 Person | 150 min
                                        </Typography>
                                        <br />
                                        <Box sx={{ display: "flex", mt: 3 }}>
                                          <Typography
                                            color={"#2560FC"}
                                            sx={{ marginRight: "auto" }}
                                          >
                                            ${response.discounted_price}
                                            <del style={{ color: "gray" }}>
                                              ${response.price}
                                            </del>
                                          </Typography>

                                          <Box sx={{ float: "right", mt: -1 }}>
                                            <Button
                                              variant="outlined"
                                              onClick={() =>
                                                handleOpen(response)
                                              }
                                              float="right"
                                              size="small"
                                            >
                                              {t("Add")}
                                            </Button>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </CardContent>
                                  </Grid>
                                </Grid>

                                {/* MOBILE SCREEN ONLY  */}
                                <Grid
                                  container
                                  display={{ xs: "flex", sm: "none" }}
                                  spacing={3}
                                >
                                  <Grid item md={12}>
                                    <CardMedia
                                      image={response.image_of_the_service}
                                      alt="hi"
                                      sx={{
                                        height: "200px",
                                        width: "400px",
                                        borderRadius: "4px",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item md={12}>
                                    <CardContent sx={{ ml: 2, p: 0 }}>
                                      <Box
                                        sx={{
                                          display: "block",
                                          textAlign: "start",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <Typography
                                            color={"#2560FC"}
                                            sx={{ marginRight: "auto" }}
                                          >
                                            {response.title}
                                          </Typography>
                                          <StarIcon sx={{ color: "gold" }} />
                                          {response.rating}
                                          <br />
                                        </Box>
                                        <Typography fontSize={14} pt={2}>
                                          {response.description}
                                        </Typography>
                                        <br /> <br />
                                        <Typography
                                          color={"gray"}
                                          fontSize={14}
                                          sx={{ mt: -4 }}
                                        >
                                          2 Person | 150 min
                                        </Typography>
                                        <br />
                                        <Box sx={{ display: "flex", mt: 3 }}>
                                          <Typography
                                            color={"#2560FC"}
                                            sx={{ marginRight: "auto" }}
                                          >
                                            ${response.discounted_price}
                                            <del style={{ color: "gray" }}>
                                              ${response.price}
                                            </del>
                                          </Typography>

                                          <Box sx={{ float: "right", mt: -1 }}>
                                            <Button
                                              variant="outlined"
                                              onClick={() =>
                                                handleOpen(response)
                                              }
                                              float="right"
                                              size="small"
                                            >
                                              {t("Add")}
                                            </Button>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </CardContent>
                                  </Grid>
                                </Grid>
                              </Card>
                              <Divider />
                            </Box>
                            <br />
                          </>
                        );
                      })}
                      <ToastContainer />
                    </Box>
                  ) : (
                    <Box>
                      <Skeleton
                        variant="rectangular"
                        height={200}
                        width={620}
                      />
                      <br />
                      <Skeleton
                        variant="rectangular"
                        height={200}
                        width={620}
                      />
                      <br />
                      <Skeleton
                        variant="rectangular"
                        height={200}
                        width={620}
                      ></Skeleton>
                      <br />
                      <Skeleton
                        variant="rectangular"
                        height={200}
                        width={620}
                      ></Skeleton>
                      <br />
                      <Skeleton
                        variant="rectangular"
                        height={200}
                        width={620}
                      ></Skeleton>
                      <br />
                      <Skeleton
                        variant="rectangular"
                        height={200}
                        width={620}
                      ></Skeleton>
                      <br />
                    </Box>
                  )}
                </Box>
              </Box>
              {/* <Box display={"flex"} justifyContent={"center"}>
                  <Stack spacing={2}>
                    <Pagination count={3} color="primary" />
                  </Stack>
                </Box> */}
              <br />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box>
              {isLoading ? (
                <>
                  {provider.map((response) => {
                    return (
                      <>
                        {response.partner_id === partner_id ? (
                          <>
                            <Card
                              sx={{
                                backgroundColor: theme.palette.background.box,
                              }}
                            >
                              <CardMedia
                                sx={{ height: 250 }}
                                image={response.banner_image}
                              />
                              <CardMedia
                                sx={{
                                  height: 80,
                                  width: 80,
                                  borderRadius: 50,
                                  ml: "auto",
                                  mr: "auto",
                                  border: "5px solid white",
                                  mt: -5,
                                }}
                                image={response.image}
                              />
                              <CardActions
                                sx={{ justifyContent: "space-around", mb: 4 }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{ textAlign: "start", fontSize: 15 }}
                                >
                                  <Avatar sx={{ bgcolor: "white" }}>
                                    <CheckCircleIcon
                                      sx={{
                                        bgcolor: "white",
                                        color: "blue",
                                        borderRadius: "50px",
                                      }}
                                    />
                                  </Avatar>
                                  <Box sx={{ ml: 2 }}>
                                    <h3>{response.number_of_orders}</h3>
                                    <p style={{ fontSize: 10 }}>
                                      {t("Orders Complete")}
                                    </p>
                                  </Box>
                                </Button>
                                <Button
                                  variant="contained"
                                  sx={{
                                    textAlign: "start",
                                    fontSize: 15,
                                    bgcolor: "#323232",
                                    "&:hover": { bgcolor: "#323232" },
                                  }}
                                >
                                  <Avatar sx={{ bgcolor: "white" }}>
                                    <StarIcon
                                      sx={{
                                        color: "gray",
                                        borderRadius: "50px",
                                      }}
                                    />
                                  </Avatar>
                                  <Box sx={{ ml: 2 }}>
                                    <h3>{response.ratings}</h3>
                                    <p style={{ fontSize: 10 }}>
                                      {t("provider rating")}
                                    </p>
                                  </Box>
                                </Button>
                              </CardActions>

                              <hr />

                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                >
                                  <strong> {t("Provider Address")} </strong>
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {response.address}
                                  <br />
                                  370001
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  mt={2}
                                >
                                  <strong> {t("Provider Information")} </strong>
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {response.about}
                                </Typography>
                              </CardContent>
                            </Card>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <Skeleton variant="rectangular" height={"800px"} />
              )}
            </Box>
            <Box
              sx={{
                backgroundColor: theme.palette.background.box,
                borderRadius: "10px",
                mb: 3,
                mt: 3,
              }}
            >
              <Typography variant="h5" pt={2} pb={2} pl={1}>
                <strong>{t("Reviews and Rating")}</strong>
              </Typography>
              <hr />
              <br />
              <RatingCard />
              <CustomerReview /> <Divider />
              {/* <Box sx={{m:1, pb:1, justifyContent: "center", display: "flex", bgcolor: "#343f53"}}> */}
              <Box sx={{ pl: 2, pr: 2 }}>
                <NavLink
                  to="/providers/services/reviews"
                  variant="contained"
                  fullWidth
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                    marginTop: 20,
                    background: "#343f53",
                    color: "white",
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: "4px",
                  }}
                >
                  {t("View All Review")}
                </NavLink>
              </Box>
              <br />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProviderServices;

const RatingCard = ({ }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        bgcolor: "#323232",
        color: "white",
        borderRadius: "10px",
        height: "200px",
        padding: 1,
        m: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          bgcolor: "white",
          borderRadius: "10px",
          color: "black",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            mb: 2,
            borderRadius: "60px",
            background: "#343f53",
            color: "white",
            alignItems: "center",
            textAlign: "center",
            p: 2,
          }}
        >
          4.3
        </Typography>
        <Rating
          name="average-rating"
          sx={{ gap: 1 }}
          value={3}
          precision={0.5}
          readOnly
          mb={1}
        />
        <Typography variant="h6" gutterBottom>
          4 reviews
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} mt={2}>
        <Box display={"flex"}>
          <GradeIcon sx={{ color: "yellow", mr: 1 }} /> 5
        </Box>
        <Box display={"flex"}>
          <GradeIcon sx={{ color: "yellow", mr: 1 }} /> 4
        </Box>
        <Box display={"flex"}>
          <GradeIcon sx={{ color: "yellow", mr: 1 }} /> 3
        </Box>
        <Box display={"flex"}>
          <GradeIcon sx={{ color: "yellow", mr: 1 }} /> 2
        </Box>
        <Box display={"flex"}>
          <GradeIcon sx={{ color: "yellow", mr: 1 }} /> 1
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" gutterBottom>
          User Ratings
        </Typography>
        <Box
          sx={{ display: "block", alignItems: "center", marginBottom: "8px" }}
        >
          <LinearProgress variant="determinate" value={100} /> <br />
          <LinearProgress variant="determinate" value={80} /> <br />
          <LinearProgress variant="determinate" value={60} /> <br />
          <LinearProgress variant="determinate" value={40} /> <br />
          <LinearProgress variant="determinate" value={20} /> <br />
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} mt={2}>
        <Typography>120</Typography>
        <Typography>100</Typography>
        <Typography>30</Typography>
        <Typography>10</Typography>
        <Typography>3</Typography>
      </Box>
    </Box>
  );
};
