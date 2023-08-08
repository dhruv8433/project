import {
  ArrowRightAltOutlined,
  DoneRounded,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { t, use } from "i18next";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import slugify from "slugify";
import { API_URL } from "../../../config/config";

const Bookmark = () => {
  const [bookData, setBookData] = useState(() => {
    const storedBookData = JSON.parse(localStorage.getItem("bookmark"));
    return storedBookData || [];
  });

  const [bookmark, setBookmark] = useState([]);

  const navigate = useNavigate();

  const handleDelete = (partnerId) => {
    setBookData((prevBookData) => {
      const updatedBookData = prevBookData.filter(
        (item) => item.partner_id !== partnerId
      );
      localStorage.setItem("bookmark", JSON.stringify(updatedBookData));
      return updatedBookData;
    });
  };

  // Filter out duplicate providers based on their partner_id
  const distinctProviders = bookData.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.partner_id === item.partner_id)
  );

  useEffect(() => {
    var myHeaders = new Headers();
    const token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    const lat = localStorage.getItem("Lat");
    const lng = localStorage.getItem("Lng");
    formdata.append("type", "list");
    formdata.append("latitude", lat);
    formdata.append("longitude", lng);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${API_URL}/book_mark`, requestOptions)
      .then((response) => response.json())
      .then((result) => setBookmark(result.data))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div>
      {bookmark.length <= 0 ? (
        <div style={{ textAlign: "center", minHeight: "432px" }}>
          <h2>{t("There is no Bookmark")}</h2>
          <Box display={"flex"} justifyContent={"center"}>
            <img
              src={require("../../../Images/no-booking.png")}
              height={"300px"}
              width={"300px"}
              alt="no bookings"
            />
          </Box>
          <Button variant="outlined" onClick={() => navigate("/providers")}>
            {t("Add Bookmark")}
          </Button>
        </div>
      ) : (
        bookmark.map((response) => (
          <>
            <Card
              sx={{
                display: "flex",
                maxHeight: 300,
                border: "1px solid gray",
                boxShadow: "none",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 150, borderRadius: "8px" }}
                image={response.banner_image}
                alt="Live from space album cover"
              />
              <CardMedia
                component="img"
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "100px",
                  border: "5px solid white",
                  ml: -3,
                  mt: 6,
                }}
                image={response.image}
                alt="Live from space album cover"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Grid container alignItems="center" sx={{ ml: 1 }}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h6" fontSize={18}>
                      {response.company_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={<DoneRounded />}
                      variant="contained"
                      sx={{ mt: 1, mr: 2 }}
                      size="small"
                    >
                      {response.number_of_orders} orders Completed
                    </Button>
                  </Grid>
                </Grid>
                <Box display={"flex"}>
                  <Rating readOnly value={response.ratings}></Rating>
                  <Typography variant="p" ml={1}>
                    {response.ratings}/5
                  </Typography>
                </Box>

                <Box
                  display={"grid"}
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={2}
                >
                  <Box gridColumn={"span 8"}>
                    <Button
                      endIcon={<ArrowRightAltOutlined />}
                      sx={{ mt: 8, mr: "auto", mb: 1 }}
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        navigate(
                          "/providers/services/" +
                            response.partner_id +
                            "/" +
                            slugify(response.company_name, { lower: true })
                        )
                      }
                    >
                      {t("View all Services")}
                    </Button>
                  </Box>
                  <Box gridColumn={"span 4"}>
                    <Button
                      startIcon={<DeleteOutline />}
                      size="small"
                      variant="outlined"
                      color="error"
                      sx={{ marginRight: 1, mt: 8, ml: 8 }}
                      onClick={() => handleDelete(response.partner_id)}
                    >
                      {t("Delete")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
            <br />
          </>
        ))
      )}
    </div>
  );
};

export default Bookmark;
