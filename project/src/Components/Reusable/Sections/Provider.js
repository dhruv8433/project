import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Rating,
  Skeleton,
} from "@mui/material";
import { ArrowRightAltOutlined, Done } from "@mui/icons-material";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../../../API/Fetch_data_Api";
import { useTheme } from "@emotion/react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Checkbox } from "@mui/material";
import slugify from "slugify";
import { ToastContainer, toast } from "react-toastify";
import { t } from "i18next";
import { Link as MyLink } from "@mui/material";
import Layout from "../../layout/Layout";
import { PartnerSkeleton } from "./Skeletons";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Provider() {
  const [provider, setProvider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  useEffect(() => {
    // Load checked state from Local Storage on component mount
    const storedChecked = localStorage.getItem("isChecked");
    if (storedChecked === "true") {
      setChecked(true);
    }
  }, []);

  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedItems")) || [];
    setBookmarkedItems(storedBookmarks);
  }, []);

  const ApiProviders = () => {
    api
      .get_providers()
      .then((response) => setProvider(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };

  const handle = (item) => {
    const isBookmarked = bookmarkedItems.some(
      (bookmark) => bookmark.partner_id === item.partner_id
    );
    console.log(item);

    if (isBookmarked) {
      // Remove logic here (e.g., handleremove(item))
      const updatedBookmarks = bookmarkedItems.filter(
        (bookmark) => bookmark.partner_id !== item.partner_id
      );
      setBookmarkedItems(updatedBookmarks);
      localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
    } else {
      const updatedBookmarks = [...bookmarkedItems, item];
      setBookmarkedItems(updatedBookmarks);
      localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
    }

    var formdata = new FormData();
    const lat = localStorage.getItem("Lat");
    const lng = localStorage.getItem("Lng");
    formdata.append("type", "add");
    formdata.append("partner_id", item.partner_id);
    formdata.append("latitude", lat);
    formdata.append("longitude", lng);

    api.get_bookmarks(formdata).then((response) => {
      console.log(response);
    });

    if (checked) {
      localStorage.setItem("isChecked", "true"); // Update Local Storage
    }
    setChecked(true);
    isLogin ? <></> : toast.error("Please Login !");
  };

  //we have to apply some logic for remove data from bookmark
  const handleremove = (item) => {
    const bookData = localStorage.getItem("bookmark") || [];
    bookData.pop(item);
    localStorage.removeItem("bookmark", item);
    toast.info("Removed from bookmark");
  };

  useEffect(() => {
    ApiProviders();
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();
  // console.log("Bookmark" + bookmart);

  const isLogin = localStorage.getItem("isLoggedIn");

  const bookmarked = localStorage.getItem("bookmarkedItems");
  console.log(bookmarked);

  return (
    <Box
      display={"flex"}
      gridColumn={3}
      flexWrap={"wrap"}
      sx={{ gap: "22px", justifyContent: "space-around", margin: 0 }}
    >
      {isLoading ? (
        <>
          {provider.map((response) => {
            const slug = slugify(response.company_name, { lower: true });
            return (
              <>
                <Card
                  key={response.id}
                  sx={{
                    maxWidth: 345,
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      mt: "1px",
                      ml: "306px",
                      position: "absolute",
                      borderRadius: "6px",
                      background: "black",
                    }}
                  >
                    <Checkbox
                      size="small"
                      sx={{ color: "white" }}
                      {...label}
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={
                        bookmarkedItems.some(
                          (bookmark) =>
                            bookmark.partner_id === response.partner_id
                        ) ? (
                          <BookmarkIcon onClick={() => handle(response)} />
                        ) : (
                          <BookmarkBorderIcon
                            onClick={() => handle(response.partner_id)}
                            sx={{ color: "white" }}
                          />
                        )
                      }
                      onClick={(event) => {
                        event.stopPropagation();
                        handle(response);
                      }}
                    />
                  </Box>
                  <Link
                    to={
                      "/providers/services/" + response.partner_id + "/" + slug
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      sx={{ height: 240 }}
                      image={response.banner_image}
                    />
                    <CardMedia
                      sx={{
                        height: 80,
                        width: 80,
                        border: "5px solid white",
                        borderRadius: "50px",
                        marginTop: "-40px",
                        marginLeft: "35%",
                        cursor: "pointer",
                      }}
                      image={response.image}
                    />
                    <Box textAlign={"center"}>
                      <CardContent
                        onClick={() =>
                          navigate(
                            "/providers/services/" +
                              response.partner_id +
                              "/" +
                              slug
                          )
                        }
                      >
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          textAlign={"center"}
                          color={theme.palette.color.catLink}
                        >
                          {response.company_name}
                        </Typography>
                        <Rating
                          name="read-only"
                          value={response.number_of_ratings}
                          readOnly
                          sx={{ alignContent: "center" }}
                        />
                        <Button variant="contained" startIcon={<Done />}>
                          {response.number_of_orders} {t("Order Completed")}
                        </Button>

                        <div className="lines" style={{ paddingTop: "30px" }}>
                          <hr />
                        </div>
                        <Box>
                          <NavLink
                            to={
                              "/providers/services/" +
                              response.partner_id +
                              "/" +
                              slug
                            }
                            style={{
                              textAlign: "center",
                              justifyContent: "center",
                              display: "flex",
                              textDecoration: "none",
                              color: theme.palette.color.navLink,
                              fontSize: 16,
                              marginTop: 10,
                            }}
                          >
                            {t("View All Services")} <ArrowRightAltOutlined />
                          </NavLink>
                        </Box>
                      </CardContent>
                    </Box>
                  </Link>
                </Card>
              </>
            );
          })}
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid
            item
            lg={12}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-evenly"}
            gap={2}
          >
            <>
              <PartnerSkeleton />
              <PartnerSkeleton />
              <PartnerSkeleton />
 
              <PartnerSkeleton />
              <PartnerSkeleton />
              <PartnerSkeleton />
 
              <PartnerSkeleton />
              <PartnerSkeleton />
              <PartnerSkeleton />
            </>
          </Grid>
        </Grid>
      )}
      <ToastContainer />
    </Box>
  );
}

export const MySkeleton = () => {
  return (
    <Skeleton
      sx={{ height: "500px", width: "345px" }}
      variant="rectangular"
    ></Skeleton>
  );
};

export const SpecificProvider = () => {
  const [provider, setProvider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const param = useParams();
  const { id } = param;

  const get_provider = () => {
    var formdata = new FormData();
    formdata.append("latitude", "23.2507356");
    formdata.append("longitude", "69.6339007");
    // formdata.append("filter", "discount");
    formdata.append("sub_category_id", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://edemand.wrteam.me/api/v1/get_providers", requestOptions)
      .then((response) => response.json())
      .then((response) => setProvider(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log("error", error));
  };

  const { name } = param;
  const formattedName = name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
  document.title = `${formattedName} | edemand`;

  useEffect(() => {
    get_provider();
  }, []);

  const theme = useTheme();
  return (
    <Layout>
      <Box
        bgcolor={theme.palette.background.heading}
        paddingTop={"15px"}
        paddingBottom={"15px"}
        mb={"20px"}
      >
        <Container maxWidth="lg">
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ marginBottom: 1, marginTop: 1 }}
          >
            <MyLink
              sx={{ cursor: "pointer", textDecoration: "none" }}
              color="inherit"
              onClick={() => navigate("/")}
            >
              {t("Home")}
            </MyLink>
            <MyLink
              sx={{ cursor: "pointer", textDecoration: "none" }}
              color="inherit"
              onClick={() => navigate("/categories")}
            >
              {t("Sub Categories")}
            </MyLink>
            <Typography color="text.primary">
              {t(`${formattedName}`)}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h4" gutterBottom>
            <>{formattedName} Providers</>
          </Typography>
        </Container>
      </Box>
      <Container>
        <Box
          display={"flex"}
          gridColumn={3}
          flexWrap={"wrap"}
          sx={{
            gap: "22px",
            justifyContent: "space-around",
            margin: 0,
            background: theme.palette.background.box,
            minHeight: 620,
          }}
        >
          {isLoading ? (
            <>
              {provider.length > 0 ? (
                <>
                  {provider.map((response) => {
                    const slug = slugify(response.company_name, {
                      lower: true,
                    });
                    const company = response.company_name;
                    return (
                      <>
                        <Link
                          to={
                            "/providers/services/" +
                            response.partner_id +
                            "/" +
                            slug
                          }
                          style={{ textDecoration: "none" }}
                        >
                          <Card
                            key={response.id}
                            sx={{
                              maxWidth: 345,
                              display: "inline-block",
                              mt: 5,
                              mb: 5,
                            }}
                          >
                            <CardMedia
                              sx={{ height: 240 }}
                              image={response.banner_image}
                              alt="Banner Image"
                            />
                            <CardMedia
                              sx={{
                                height: 80,
                                width: 80,
                                border: "5px solid white",
                                borderRadius: "50px",
                                cursor: "pointer",
                                marginTop: "-40px",
                                marginLeft: "35%",
                              }}
                              image={response.image}
                            />
                            <Box textAlign={"center"}>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  textAlign={"center"}
                                >
                                  {response.company_name}
                                </Typography>
                                <Rating
                                  name="read-only"
                                  value={response.number_of_ratings}
                                  readOnly
                                  sx={{ alignContent: "center" }}
                                />
                                <Button
                                  variant="contained"
                                  startIcon={<Done />}
                                >
                                  {response.number_of_orders} Order Completed
                                </Button>

                                <div
                                  className="lines"
                                  style={{ paddingTop: "30px" }}
                                >
                                  <hr />
                                </div>
                                <Box>
                                  <NavLink
                                    to={
                                      "/providers/services/" +
                                      response.partner_id +
                                      "/" +
                                      slug
                                    }
                                    className={"provider-link"}
                                    activeClassName="active-navlink"
                                    style={{
                                      textAlign: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                      textDecoration: "none",
                                      color: theme.palette.color.navLink,
                                      fontSize: 16,
                                      marginTop: 10,
                                    }}
                                  >
                                    View All Services <ArrowRightAltOutlined />
                                  </NavLink>
                                </Box>
                              </CardContent>
                            </Box>
                          </Card>
                        </Link>
                      </>
                    );
                  })}
                </>
              ) : (
                <img
                  src={require("../../../Images/no-provider.png")}
                  alt="There is no providers"
                  width={"100%"}
                  height={"auto"}
                />
              )}
            </>
          ) : (
            <Grid container spacing={2}>
              <Grid
                item
                lg={12}
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"space-evenly"}
                gap={2}
                mt={5}
              >
                <MySkeleton />
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
