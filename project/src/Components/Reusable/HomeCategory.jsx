import React from "react";
import Categorys from "./Categorys";
import FetchingCategorys from "./FetchingCategorys";
import { Box, Button, Container, Typography } from "@mui/material";
import FetchingServies, {
  FetchingCar,
  FetchingLaundry,
  FetchingPlumbing,
} from "./FetchingServies";
import Providers from "./Providers";
import { useTheme } from "@emotion/react";
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from "react-router";
// create a function and calling and setting here \

const HomeCategory = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <div>
      <Container maxWidth="100%">
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            height: "auto",
            justifyContent: "center",
            display: "flex",
            background: theme.palette.background.box
          }}
        >
          {/* function for fetching all categorys  */}
          <FetchingCategorys />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            background: theme.palette.background.box,
            height: "auto",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {/* function for fetching all home services  */}
          <FetchingServies />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            background: theme.palette.background.box,
            height: "auto",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {/* function for fetching all plumbing services  */}
          <FetchingPlumbing />
        </Box>

        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            background: theme.palette.background.box,
            height: "auto",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {/* function for fetching all laundry services  */}
          <FetchingLaundry />
        </Box>

        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            background: theme.palette.background.box,
            height: "auto",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {/* function for fetching all car services  */}
          <FetchingCar />
        </Box>

        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            background: theme.palette.background.box,
            height: "auto",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Container  >
            <Box>
              <Typography variant="h4">
                Our Valuabale Service Providers
              </Typography>
              <hr color="Whitesmoke"/>
            </Box>
            <Box gap={-1} marginTop={-4} sx={{background: "white"}}>
            {/* our provider is already created and i juts call that function and set here with some editing  */}
            <Providers />
            <Box sx={{padding: 2, display: "flex", justifyContent: "end", marginTop: -4}}>
              <Button variant="outlined" onClick={()=> navigate('/providers')} endIcon={<EastIcon /> }> View all Proiders</Button>
              </Box>
            </Box>
          
          </Container>
        </Box>
      </Container>
    </div>
  );
};

export default HomeCategory;
