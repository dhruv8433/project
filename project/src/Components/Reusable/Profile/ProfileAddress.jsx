import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Heading from "./Heading";
import Address, { AddAddress } from "./Address";
import { useTheme } from '@mui/material/styles';
import Pnavigation from "./Pnavigation";
import { t } from "i18next";
import Layout from "../../layout/Layout";

const ProfileAddress = () => {
  document.title = "Profile - Address | eDemand";

  const theme = useTheme();

  return (
    <Layout>
      <Container>
        <Grid container spacing={3} sx={{ padding: 0 }}>
          <Grid item xs={12} md={4}>
            <Pnavigation />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                mt: 3,
                bgcolor: theme.palette.background.box,
                borderRadius: "10px",
                pb: 3,
              }}
            >
              <Heading heading={t("Select Address")} />
              <Grid
                container
                sx={{
                  backgroundColor: theme.palette.background.box,
                  borderRadius: "10px",
                }}
                boxShadow={"none"}
              >
                <Grid item xs={12}>
                  <AddAddress />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Address />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProfileAddress;
