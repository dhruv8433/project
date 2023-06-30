import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import ProfileNavigation from "../Components/Reusable/Profile/ProfileNavigation";
import { useTheme } from "@emotion/react";
import Pnavigation from "../Components/Reusable/Profile/Pnavigation";

const DeleteAccount = () => {
  const theme = useTheme();

  document.title = "profile - delete account | eDemand"

  const handleLogout = () => {
    localStorage.removeItem("ContactInfo");
    localStorage.setItem("isLoggedIn", "");
    window.location.assign('/');
  };
  return (
    <Container>
      <Grid container spacing={3} sx={{ padding: 0 }}>
        <Grid item xs={12} md={4}>
          <Pnavigation />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ marginTop: 3 }}>
            <Grid
              container
              sx={{
                backgroundColor: theme.palette.background.box,
                borderRadius: "10px",
              }}
              boxShadow={"none"}
            >
              <Grid item xs={12}>
                <Box sx={{ background: theme.palette.background.box }}>
                  <div className="logout-container">
                    <h1
                      className="logout-title"
                      style={{ color: theme.palette.color.navLink }}
                    >
                      Delete Account
                    </h1>
                    <p className="logout-message">
                      Are you sure you want to Delete Account?
                    </p>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleLogout}
                    >
                      Delete
                    </Button>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DeleteAccount;
