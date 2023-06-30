// work left
// use Gird layout fot address locations

import { Box, Container, Grid } from "@mui/material";
import React from "react";
import ProfileNavigation from "./ProfileNavigation";
import Heading from "./Heading";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
  Delete,
  DeleteOutline,
  Edit,
  EditOutlined,
  RadioButtonChecked,
} from "@mui/icons-material";
import Address, { AddAddress } from "./Address";
import { useTheme } from "@emotion/react";
import Pnavigation from "./Pnavigation";
const ProfileAddress = () => {

  document.title = "profile - address | eDemand"


  const theme = useTheme();
  return (
    <div>
      <Container>
        <Grid container spacing={3} sx={{ padding: 0 }}>
          <Grid item xs={12} md={4}>
            <Pnavigation />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ mt: 3, bgcolor: theme.palette.background.box, borderRadius: "10px" }}>
              <Heading heading="Select Address" />
              <Grid
                container
                sx={{ backgroundColor: theme.palette.background.box, borderRadius: "10px" }}
                boxShadow={"none"}
              >
                <Grid item xs={12} sm={6}>
                  <Address />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AddAddress />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfileAddress;
