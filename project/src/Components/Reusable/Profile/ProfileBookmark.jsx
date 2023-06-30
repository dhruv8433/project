import React from "react";
import Heading from "./Heading";
import { Box, Button, Container, Grid, Rating } from "@mui/material";
import ProfileNavigation from "./ProfileNavigation";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import {
  ArrowCircleLeft,
  ArrowRight,
  ArrowRightAltOutlined,
  Done,
  DoneRounded,
} from "@mui/icons-material";
import Bookmark from "./Bookmark";
import { useNavigate, useParams } from "react-router";
import Pnavigation from "./Pnavigation";

const ProfileBookmark = () => {

  document.title = "profile - bookmark | eDemand"


  const theme = useTheme();

  const params = useParams();
  const { partner_id } = params;

  async function allData() {
    var formdata = new FormData();
    formdata.append("latitude", "23.2507356");
    formdata.append("longitude", "69.6689201");
    formdata.append("partner_id", `${partner_id}`);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "https://edemand.wrteam.me/api/v1/get_services",
      requestOptions
    );
    const result = await response.json();
    // console.log(result);
    return result;
  }

  return (
    <div>
      <Box>
        <Container>
          <Grid container spacing={3} sx={{ padding: 0 }}>
            <Grid item xs={12} md={4}>
              <Pnavigation />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  mt: 3,
                  background: theme.palette.background.box,
                  borderRadius: "10px",
                }}
              >
                <Heading heading="Bookmark" />
                <Box sx={{ m: 2 }}>
                  <Bookmark /> <br />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default ProfileBookmark;
