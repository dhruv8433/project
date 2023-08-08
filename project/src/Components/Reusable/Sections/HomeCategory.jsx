import React from "react";
import FetchingCategorys from "./FetchingCategorys";
import { Box, Button, Container, Typography } from "@mui/material";
import FetchingServies, {
  FetchingCar,
  FetchingLaundry,
  FetchingPlumbing,
} from "./FetchingServies";
import { useTheme } from "@emotion/react";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router";
// import { HomeProvider } from "./Provider";
import { t } from "i18next";
// create a function and calling and setting here \

const HomeCategory = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const available = localStorage.getItem("providerAvailable");
  
  return (
    <div>
      {available ? 
       <Container maxWidth="100%">
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            height: "auto",
            justifyContent: "center",
            display: "flex",
            background: theme.palette.background.box,
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
          <Container>
            <Box sx={{background: theme.palette.background.box}}>
              <>
                <Typography variant="h4" sx={{fontSize: theme.palette.fonts.h2}}>
                  {t("Our Valuable Service Providers")}
                </Typography> <br />
                <hr color="Whitesmoke" />
                <br />
              </>
              <Box gap={-1} marginTop={2} sx={{  }}>
                {/* our provider is already created and i juts call that function and set here with some editing  */}
                {/* <HomeProvider /> */}
                <Box
                  sx={{
                    padding: 2,
                    display: "flex",
                    justifyContent: "end",
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/providers")}
                    endIcon={<EastIcon />}
                  >
                    {t("View all Providers")}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>:
      <></>}
    </div>
  );
};

export default HomeCategory;