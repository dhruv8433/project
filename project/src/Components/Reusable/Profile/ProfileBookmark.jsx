import React from "react";
import Heading from "./Heading";
import { Box, Container, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Bookmark from "./Bookmark";
import { useParams } from "react-router";
import Pnavigation from "./Pnavigation";
import { t } from "i18next";
import Layout from "../../layout/Layout";
import { API_URL } from "../../../config/config";

const ProfileBookmark = () => {
  document.title = "Profile - Bookmark | eDemand";

  const theme = useTheme();
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
