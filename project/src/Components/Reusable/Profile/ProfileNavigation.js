import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout/Layout";
import Pnavigation from "./Pnavigation";

const ProfileNavigation = () => {
  document.title = "Profile | eDemand"
  const url = "/profile"
  return (
    <Layout>
      <Container>
        <Grid container spacing={3} sx={{ padding: 0 }}>
          <Grid item xs={12} md={4}>
            <Pnavigation />
          </Grid>
          <Grid xs={12} md={4} sx={{ marginTop: 8, marginBottom: 3, padding: 0 }}>
            {url === '/profile' ? (
              <>
                <Box display={"flex"} justifyContent={"center"} textAlign={"center"} height={400} width={800}>
                  <img src={require("../../../Images/no-booking.png")} style={{ borderRadius: 10 }} width={"auto"} height="380px" alt="Empty state" />
                </Box>
                <Box width={800}>
                  <Typography color={"#5e6870"} fontSize={"30px"} textAlign={"center"}>Nothing Here !</Typography>
                </Box>
              </>
            ) : (<>
            </>)}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProfileNavigation;
