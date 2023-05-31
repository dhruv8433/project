import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Drawer,
  Divider,
  Skeleton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import api from "../../API/Fetch_data_Api";
import { useDispatch} from "react-redux";
import { Transert } from "../../actions/action";
import { Visibility } from "@mui/icons-material";

const ProviderService = (item) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  // const list_item = useSelector((state) => state.reducer);
  // const myData = useSelector(state => state.myReducer);
  // here we call our data that we print in console
  // const Data = useSelector(getData)

  // Here we create a function that open drawer as well as add item to that drawer
  // Working

  const handleOpen = (item) => {
    setOpen(true);
    console.info("clicked", item);
    dispatch(Transert(item));
  };


  const [service, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ApiProviders = () => {
    api
      .get_services()
      .then((response) => setServices(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    ApiProviders();
    // dispatch(TransferReducer(item))
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Box>
          {service.map((response) => {
            return (
              <Box sx={{ flexGrow: 1 }}>
                <Card
                  sx={{ display: "flex", boxShadow: "none", height: 200, p: 1 }}
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
                            <StarIcon sx={{ color: "gold" }} />{" "}
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
                              ${response.discounted_price}{" "}
                              <del style={{ color: "gray" }}>
                                ${response.price}
                              </del>{" "}
                            </Typography>

                            <Box sx={{ float: "right", mt: -1 }}>
                              <Button
                                variant="outlined"
                                onClick={() => handleOpen(response)}
                                float="right"
                                size="small"
                              >
                                Add
                              </Button>
                              {/* ➡️ Open Drawer When user Click on Add Button  */}
                              <Drawer anchor="right" open={open} hideBackdrop  >
                                <Box sx={{backgroundColor:"white"}} >
                                  <Box
                                    display={"flex"}
                                    textAlign="center"
                                    width="500px"
                                    marginTop={3}
                                  >
                                    {
                                      <NavigateBeforeIcon
                                        onClick={handleClose}
                                        fontSize="large"
                                        sx={{ marginLeft: "20px" }}
                                      />
                                    }
                                    <Typography fontSize={20} marginLeft={3}>
                                      From: World Clean Pvt Ltd
                                    </Typography>
                                  </Box>
                                  <hr />

                                  {/* All Data come Dynamicly  */}
                                  <Box>
                                    {service.map((response) => {
                                      /* we have to do something here that we can 
                                      compare item id with our response id so get
                                      only those data */

                                      // if (data.id === response.id)
                                      return (
                                        <Box
                                          sx={{
                                            flexGrow: 1,
                                            border: "1px solid",
                                            m: 1,
                                          }}
                                        >
                                          <Card
                                            sx={{
                                              display: "flex",
                                              boxShadow: "none",
                                              height: 200,
                                              p: 1,
                                              width: 520,
                                            }}
                                          >
                                            <Grid
                                              container
                                              display={"flex"}
                                              spacing={1}
                                            >
                                              <Grid item md={2}>
                                                <CardMedia
                                                  image={
                                                    response.image_of_the_service
                                                  }
                                                  alt="hi"
                                                  sx={{
                                                    height: "80px",
                                                    width: "100px",
                                                    borderRadius: "4px",
                                                  }}
                                                />
                                              </Grid>
                                              <Grid item md={10}>
                                                <CardContent
                                                  sx={{ ml: 2, p: 0 }}
                                                >
                                                  <Box
                                                    sx={{
                                                      display: "block",
                                                      textAlign: "start",
                                                    }}
                                                  >
                                                    <Box
                                                      sx={{ display: "flex" }}
                                                    >
                                                      <Typography
                                                        color={"#2560FC"}
                                                        sx={{
                                                          marginRight: "auto",
                                                        }}
                                                      >
                                                        {response.title}
                                                      </Typography>
                                                      <StarIcon
                                                        sx={{ color: "gold" }}
                                                      />{" "}
                                                      {response.rating}
                                                      <br />
                                                    </Box>
                                                    <Typography
                                                      fontSize={14}
                                                      pt={2}
                                                    >
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
                                                    <Box
                                                      sx={{
                                                        display: "flex",
                                                        mt: 3,
                                                      }}
                                                    >
                                                      <Typography
                                                        color={"#2560FC"}
                                                        sx={{
                                                          marginRight: "auto",
                                                        }}
                                                      >
                                                        $
                                                        {
                                                          response.discounted_price
                                                        }{" "}
                                                        <del
                                                          style={{
                                                            color: "gray",
                                                          }}
                                                        >
                                                          ${response.price}
                                                        </del>{" "}
                                                      </Typography>
                                                    </Box>
                                                  </Box>
                                                </CardContent>
                                              </Grid>
                                            </Grid>
                                          </Card>
                                        </Box>
                                      );
                                    })}
                                  </Box>

                                  <Box
                                    sx={{
                                      backgroundColor: "#343F53",
                                      color: "white",
                                      width: "500px",
                                      margin: 3,
                                      borderRadius: 2,
                                      alignItem: "center",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        backgroundColor: "gray",
                                        margin: 3,
                                        borderRadius: 2,
                                        alignItem: "center",
                                        mt: 6,
                                      }}
                                    >
                                      <NavLink
                                        to={"/providers/services/payment"}
                                        size="small"
                                        style={{
                                          backgroundColor: "#343f53",
                                          display: "flex",
                                          color: "white",
                                          padding: "10px",
                                          textDecoration: "none",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Box sx={{ display: "block" }}>
                                          <p style={{ fontSize: 10 }}>
                                            {" "}
                                            4 items
                                          </p>{" "}
                                          $2296
                                        </Box>
                                        <Box>Continue</Box>
                                      </NavLink>
                                    </Box>
                                  </Box>
                                </Box>
                              </Drawer>
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
          })}
        </Box>
      ) : (
        <Box>
          <Skeleton variant="rectangular" height={200} width={620}></Skeleton>{" "}
          <br />
          <Skeleton variant="rectangular" height={200} width={620}></Skeleton>
          <br />
          <Skeleton
            variant="rectangular"
            height={200}
            width={620}
          ></Skeleton>{" "}
          <br />
          <Skeleton
            variant="rectangular"
            height={200}
            width={620}
          ></Skeleton>{" "}
          <br />
          <Skeleton
            variant="rectangular"
            height={200}
            width={620}
          ></Skeleton>{" "}
          <br />
          <Skeleton
            variant="rectangular"
            height={200}
            width={620}
          ></Skeleton>{" "}
          <br />
        </Box>
      )}
    </Box>
  );
};

export default ProviderService;