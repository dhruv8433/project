import {
  Avatar,
  Box,
  Breadcrumbs,
  Container,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navigation from "../../layout/Navigation";
import { useTheme } from "@emotion/react";
import { t } from "i18next";

const CustomerReview = () => {
  const theme = useTheme();
  const [review, setReview] = useState([]);
  useEffect(() => {
    var formdata = new FormData();
    const contactno = localStorage.getItem("ContactInfo")

    formdata.append("mobile",contactno);
    formdata.append("country_code", "91");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://edemand-test.thewrteam.in/api/v1/get_ratings",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => setReview(response.data))
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      {review == "" ?  <div style={{textAlign:"center"}}>
          <Box mt={5}>
            <img src={require('../../../Images/no-booking.png')} height={300} width={300} alt="not found"/>
          </Box>
          <p>{t("No Reviews Found")}</p>
      </div> : <Box
        sx={{
          background: theme.palette.background.box,
          padding: 2,
          borderRadius: "10px",
        }}
      >
        <Box
          marginTop={2}
          marginLeft={1}
          display={"flex"}
          textAlign={"start"}
          alignItems={"center"}
        >
          <Avatar alt="Remy Sharp" sx={{ height: "50px", width: "50px" }} />
          <Box marginLeft={3} width={"100%"}>
            <Box
              sx={{ float: "right", justifyContent: "end", textAlign: "end" }}
            >
              <Typography color={"gray"}>4.5</Typography>
              <Typography paddingTop={-2} color={"gray"}>
                45 days ago
              </Typography>
            </Box>
            <Typography variant="h6" fontSize={"medium"} color={"blue"}>
              <strong>Rashmi Hirani</strong>
            </Typography>
            <Rating
              name="read-only"
              sx={{ fontSize: "medium", gap: 1 }}
              value={4}
              readOnly
            />
          </Box>
        </Box>
        <Typography marginTop={2}>
          Good Honest worker, who shows exacetly what you requested. Thank You !
        </Typography>
        <Box marginTop={3} marginBottom={3}>
          <img
            src="https://picsum.photos/300/300"
            height={"60px"}
            width={"60px"}
            alt=""
            style={{ margin: 2, borderRadius: "10px" }}
          />
          <img
            src="https://picsum.photos/300/300"
            height={"60px"}
            width={"60px"}
            alt=""
            style={{ margin: 2, borderRadius: "10px" }}
          />
          <img
            src="https://picsum.photos/300/300"
            height={"60px"}
            width={"60px"}
            alt=""
            style={{ margin: 2, borderRadius: "10px" }}
          />
        </Box>
      </Box>}
      
    </div>
  );
};

export default CustomerReview;
