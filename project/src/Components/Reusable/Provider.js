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
import { NavLink } from "react-router-dom";
import api from "../../API/Fetch_data_Api";

export default function Provider() {
  const [provider, setProvider] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ApiProviders = () => {
    api
      .get_providers()
      .then((response) => setProvider(response.data))
      .then((response) => setIsLoading(true))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    ApiProviders();
  }, []);

  return (
    <Box
      display={"flex"}
      gridColumn={3}
      flexWrap={"wrap"}
      sx={{ gap: "22px", justifyContent: "space-around" }}
    >
      {isLoading ? (
        <>
          {provider.map((response) => {
            return (
              <>
                <Card sx={{ maxWidth: 345, display: "inline-block" }}>
                  <CardMedia
                    sx={{ height: 240 }}
                    image={response.banner_image}
                    title="green iguana"
                  />

                  <CardMedia
                    sx={{
                      height: 80,
                      width: 80,
                      border: "5px solid white",
                      borderRadius: "50px",
                      marginTop: "-40px",
                      marginLeft: "35%",
                    }}
                    image={response.image}
                    title="green iguana"
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
                      <Box sx={{ marginTop: 3 }}>
                        <NavLink
                          to="/providers/services"
                          style={{
                            textAlign: "center",
                            justifyContent: "center",
                            display: "flex",
                            textDecoration: "none",
                            color: "black",
                            fontSize: 16,
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
            <Grid item lg={12} display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} gap={2}>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>
              <Skeleton
                sx={{ height: "500px", width: "345px" }}
                variant="rectangular"
              ></Skeleton>              
            </Grid>
          </Grid>
      )}
    </Box>
  );
}
