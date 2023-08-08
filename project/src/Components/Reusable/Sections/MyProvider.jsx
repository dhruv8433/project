import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import ProviderService from "./ProviderService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const MyProvider = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box>
            <Typography variant="h5">Our Service</Typography>
            <hr />
            <ProviderService />
            <ProviderService />
            <ProviderService />
            <ProviderService />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </>
  );
};

const Provider = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Item>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            image="./demo1.jpg"
            sx={{ height: "250px", width: "300px" }}
          />
          <CardContent>
            <Box sx={{ display: "block", textAlign: "start" }}>
              <Box sx={{ display: "flex" }}>
                <Typography color={"#2560FC"} sx={{ marginRight: "auto" }}>
                  Car Service
                </Typography>
                <StarIcon sx={{ color: "gold" }} /> 4.3
                <br />
              </Box>
              <Typography marginTop={2}>
                if you are looking for good car repairing services.then look no
                further than maruti motors in mirzapar,Bhuj
              </Typography>
              <br /> <br />
              <Typography color={"gray"}>2 Person | 150 min</Typography>
              <br />
              <Box sx={{ display: "flex" }}>
                <Typography color={"#2560FC"} sx={{ marginRight: "auto" }}>
                  $200 <del style={{ color: "gray" }}>$249</del>{" "}
                </Typography>

                <Box sx={{ float: "right" }}>
                  <Button variant="outlined" float="right">
                    {" "}
                    Add
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Item>
    </Box>
  );
};
export default MyProvider;
