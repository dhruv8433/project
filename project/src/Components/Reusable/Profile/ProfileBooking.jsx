import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import Heading from "./Heading";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import {
  AccessTime,
  LocationOffRounded,
  LocationOnOutlined,
  PunchClockOutlined,
} from "@mui/icons-material";
import Booking from "./Booking";
import { useTheme } from '@mui/material/styles';
import Pnavigation from "./Pnavigation";
import { useNavigate } from "react-router";
import { t } from "i18next";
import Layout from "../../layout/Layout";

const ProfileBooking = () => {
  document.title = "Profile - Booking | eDemand";

  const theme = useTheme();

  const cartData = JSON.parse(localStorage.getItem("cart-booking")) || [];
  const [tax, setTax] = useState(0);

  useEffect(() => {
    const storedTax = JSON.parse(localStorage.getItem("tax"));
    setTax(storedTax || 0);
  }, []);
  
  // localStorage.setItem("totalPrice", 0);

  const sub_total = localStorage.getItem("totalPrice");
  const total = parseInt(sub_total) + tax;

  localStorage.setItem("Pay", total);

  const isAnyBooking = localStorage.getItem("Booking");
  const navigate = useNavigate()
  return (
    <Layout>
      <Container>
        <Grid spacing={3} container sx={{ padding: 0 }}>
          <Grid item xs={12} md={4}>
            <Pnavigation />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                mt: 3,
                background: theme.palette.background.box,
                pb: 2,
                mb: 1,
                borderRadius: "10px",
              }}
            >
              {" "}
              <Heading heading={t("Booking Information")} />
              {isAnyBooking ? (
                <>
                  <Box
                    sx={{
                      bgcolor: theme.palette.background.addressBox,
                      border: "1px solid #dedddd",
                      borderRadius: "10px",
                      p: 1,
                      ml: 4,
                      mr: 4,
                      mb: 2,
                      minHeight: 500,
                    }}
                  >
                    <>
                      <Box sx={{ my: 1, mx: 2, display: "flex" }}>
                        <Grid container alignItems="center">
                          <Grid
                            item
                            xs
                            display={"flex"}
                            justifyContent={"center"}
                            textAlign={"center"}
                          >
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="div"
                            >
                              {t("Your Booking Info")}
                            </Typography>
                          </Grid>
                          <Grid item></Grid>
                        </Grid>
                      </Box>
                      <br />
                      <Divider />

                      <Box sx={{ pl: 3 }}>
                        <ListItem>
                          <ListItemAvatar>
                            <AccessTime />
                          </ListItemAvatar>
                          <ListItemText
                            primary="01:00 PM, 20-jan-2023"
                            secondary="schedule"
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemAvatar>
                            <LocationOnOutlined />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Vacation"
                            secondary="July 20, 2014"
                          />
                        </ListItem>
                      </Box>
                      <Divider />

                      {/* my bookings  */}
                      <Box sx={{ mt: 1, ml: 3, mr: 3 }}>
                        <Box sx={{ mt: 2, mb: 2 }}>
                          <Booking />
                        </Box>
                      </Box>
                      <Divider />

                      <Box
                        sx={{ background: theme.palette.background.booking }}
                      >
                        <Box sx={{ ml: 3, pt: 2, pb: 3, mr: 3 }}>
                          <Grid container alignItems="center" sx={{ ml: 1 }}>
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="h6"
                                fontSize={18}
                              >
                                sub total :
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h6"
                                fontSize={18}
                              >
                                Tax :
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h6"
                                fontSize={18}
                              >
                                <strong>Total :</strong>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                gutterBottom
                                variant="h6"
                                textAlign={"end"}
                                fontSize={18}
                                color={"grey"}
                              >
                                ${localStorage.getItem("totalPrice")}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h6"
                                textAlign={"end"}
                                fontSize={18}
                                color={"grey"}
                              >
                                ${tax.toFixed(2)}
                              </Typography>
                              <Divider />
                              <Typography
                                gutterBottom
                                variant="h6"
                                textAlign={"end"}
                                fontSize={18}
                                color={""}
                              >
                                <strong>${total}</strong>
                              </Typography>
                            </Grid>
                          </Grid>
                          <br />
                        </Box>
                      </Box>
                    </>
                  </Box>
                </>
              ) : (
                <div style={{ textAlign: "center", minHeight: "447px" }}>
                  <h2>{t("There is no any bookings yet!")}</h2>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    sx={{textAlign: "center" }}
                  >
                    <img
                      src={require("../../../Images/no-booking.png")}
                      height={"300px"}
                      width={"300px"}
                      alt="no bookings"
                    />
                  </Box>
                  <p>{t("Explore and book your first service")}</p> <br />
                  <Button variant="outlined" onClick={()=>navigate('/providers')}>{t("Explore")}</Button>
                </div>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProfileBooking;
