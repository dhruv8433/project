import React from "react";
import Heading from "./Heading";
import { Box, Button, Container, Grid, Rating } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Bookmark from "./Bookmark";
import { useParams } from "react-router";
import Pnavigation from "./Pnavigation";
import { t } from "i18next";
import Layout from "../../layout/Layout";

const ProfileBookmark = () => {

  document.title = "Profile - Bookmark | eDemand"


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
    <Layout>
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
                <Heading heading={t("Bookmarks")} />
                <Box sx={{ m: 2 }}>
                  <Bookmark /> <br />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default ProfileBookmark;
