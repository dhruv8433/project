import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Divider,
  Skeleton,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import api from "../../API/Fetch_data_Api";
import { Transert } from "../../actions/action";
import { t } from "i18next";

const ProviderService = ({ match }) => {
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  const Data = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const islogined = localStorage.getItem("ContactInfo");

  const handleOpen = (item) => {
    // if user is logged in then success otherwise error 'please login'
    islogined === ""
      ? toast.error("Please Login...")
      : toast.success("Added Success...");
    console.info("clicked", item);

    dispatch(Transert(item));

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.push(item);
    localStorage.setItem("cart", JSON.stringify(cartData));

    // Add item with default quantity 1 to itemQuantities in localStorage
    const itemQuantities =
      JSON.parse(localStorage.getItem("itemQuantities")) || {};
    itemQuantities[item.id] = 1; // Add item with quantity 1
    localStorage.setItem("itemQuantities", JSON.stringify(itemQuantities));
  };

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const params = useParams();
  const { partner_id } = params;

  async function allData() {
    var formdata = new FormData();
    formdata.append("latitude", "23.2507356");
    formdata.append("longitude", "69.6689201");
    formdata.append("partner_id", `${partner_id}`);
    formdata.append("limit", itemsPerPage);
    formdata.append("page", `${currentPage}`);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `https://edemand.wrteam.me/api/v1/get_services`,
      requestOptions
    );
    setTotalPages(Math.ceil(response.headers["x-total-count"] / 5));
    const result = await response.json();
    // console.log(result);
    return result;
  }

  useEffect(() => {
    api
      .get_services()
      .then((response) => setServices(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));

    allData()
      .then((response) => setServices(response.data))
      .then((response) => setIsLoading(true))
      // .then((response) => console.log(response));
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(page);
  };

  const getPaginatedServices = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return services.slice(startIndex, endIndex);
  };

  return (
    <Box>
      {isLoading ? (
        <Box>
          {getPaginatedServices().map((response) => {
            if (response.id == `${partner_id}`) {
              return (
                <Box sx={{ flexGrow: 1 }} key={response.id}>
                  <Card
                    sx={{
                      display: "flex",
                      boxShadow: "none",
                      height: 200,
                      p: 1,
                    }}
                  >
                    <Grid container display={"flex"} spacing={3}>
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
                          <Box sx={{ display: "block", textAlign: "start" }}>
                            <Box sx={{ display: "flex" }}>
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
                                  onClick={() => handleOpen(response)}
                                  float="right"
                                  size="small"
                                >
                                  {t("Add")}
                                </Button>
                                <ToastContainer />
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                  <Divider />
                </Box>
              );
            }
          })}
          {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Stack spacing={2}>
              <Pagination count={3} color="primary" />
            </Stack>
          </Box> */}
        </Box>
      ) : (
        <Box>
          <Skeleton variant="rectangular" height={200} width={620} />
          <br />
          <Skeleton variant="rectangular" height={200} width={620} />
          <br />
          <Skeleton variant="rectangular" height={200} width={620}></Skeleton>
          <br />
          <Skeleton variant="rectangular" height={200} width={620}></Skeleton>
          <br />
          <Skeleton variant="rectangular" height={200} width={620}></Skeleton>
          <br />
          <Skeleton variant="rectangular" height={200} width={620}></Skeleton>
          <br />
        </Box>
      )}
    </Box>
  );
};

export default ProviderService;
