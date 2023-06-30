import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Rating, Skeleton } from "@mui/material";
import { ArrowRight, ArrowRightAltOutlined, Done } from "@mui/icons-material";
import ProviderServices from "./ProviderServices";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../API/Fetch_data_Api";
import { useTheme } from "@emotion/react";
import ProviderBookmark from "./ProviderBookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Checkbox } from "@mui/material";
import slugify from "slugify";
import { ToastContainer, toast } from "react-toastify";
import { t } from "i18next";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Provider() {
  const [provider, setProvider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmart, isBookmarke] = useState(false);

  const ApiProviders = () => {
    api
      .get_providers()
      .then((response) => setProvider(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };

  const handle = (item) => {
    const bookData = JSON.parse(localStorage.getItem("bookmark")) || [];
    bookData.push(item);
    localStorage.setItem("bookmark", JSON.stringify(bookData));

    isLogin ? toast.success("Added to bookmark") : toast.error("Please Login !");
  };

  //we have to apply some logic for remove data from bookmark
  const handleremove = (item) => {
    const bookData = localStorage.getItem("bookmark") || [];
    bookData.pop(item);
    localStorage.removeItem("bookmark", item);
    toast.info("Removed from bookmark")
  };

  useEffect(() => {
    ApiProviders();
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();
  // console.log("Bookmark" + bookmart);

  const isLogin = localStorage.getItem("isLoggedIn")

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
                  sx={{ maxWidth: 345, display: "inline-block", cursor: "pointer" }}
                >
                  <Box
                    sx={{
                      mt: "1px",
                      ml: "306px",
                      position: "absolute",
                      borderRadius: "6px",
                      background: "black"
                    }}
                  >
                    {/*user should able to Bookmark
                    but i want to remove book mark when user click on next buttom  */}
                    <Checkbox
                      size="small"
                      sx={{ color: "white" }}
                      {...label}
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={
                       isLogin ? <BookmarkIcon onClick={() => handleremove(response)} /> : <BookmarkBorderIcon sx={{color: "white"}}/>
                      }
                      onClick={() => handle(response)}
                    />
                    
                  </Box>

                  <CardMedia
                    sx={{ height: 240 }}
                    image={response.banner_image}
                    onClick={() =>
                      navigate("/providers/services/" + response.partner_id + '/' + slug)}
                  />
                  <CardMedia
                    onClick={() =>
                      navigate("/providers/services/" + response.partner_id + '/' + slug)
                    }
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
                    <CardContent onClick={() =>
                      navigate("/providers/services/" + response.partner_id + '/' + slug)
                    }>
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
                      <Button variant="contained" startIcon={<Done />}>
                        {response.number_of_orders} {t("Order Completed")}
                      </Button>

                      <div className="lines" style={{ paddingTop: "30px" }}>
                        <hr />
                      </div>
                      <Box>
                        <NavLink
                          to={"/providers/services/" + response.partner_id + "/" + slug}
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
            <MySkeleton />
            <MySkeleton />
            <MySkeleton />

            <MySkeleton />
            <MySkeleton />
            <MySkeleton />

            <MySkeleton />
            <MySkeleton />
            <MySkeleton />
          </Grid>
        </Grid>
      )}
      <ToastContainer />
    </Box>
  );
}

export const HomeProvider = () => {
  const [provider, setProvider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const ApiProviders = () => {
    api
      .get_home_providers()
      .then((response) => setProvider(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    ApiProviders();
  }, []);

  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      gridColumn={3}
      flexWrap={"wrap"}
      sx={{
        gap: "22px",
        justifyContent: "space-around",
        margin: 0,
        background: theme.palette.background.box,
      }}
    >
      {isLoading ? (
        <>
          {provider.map((response) => {
            const slug = slugify(response.company_name, { lower: true });
            return (
              <>
                <Card
                  onClick={() =>
                    navigate("/providers/services/" + response.partner_id + '/' + slug)
                  }
                  key={response.id}
                  sx={{ maxWidth: 345, display: "inline-block" }}
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
                      <Button variant="contained" startIcon={<Done />}>
                        {response.number_of_orders} Order Completed
                      </Button>

                      <div className="lines" style={{ paddingTop: "30px" }}>
                        <hr />
                      </div>
                      <Box>
                        <NavLink
                          to={"/providers/services/" + response.partner_id}
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
            <MySkeleton />
            <MySkeleton />
            <MySkeleton />
            <MySkeleton />
            <MySkeleton />
            <MySkeleton />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export const MySkeleton = () => {
  return (
    <Skeleton
      sx={{ height: "500px", width: "345px" }}
      variant="rectangular"
    ></Skeleton>
  );
};
