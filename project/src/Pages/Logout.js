import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import Pnavigation from "../Components/Reusable/Profile/Pnavigation";

const Logout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  document.title = "profile - logout | eDemand";

  const handleLogout = () => {
    // Perform logout actions here
    localStorage.setItem("ContactInfo", "");
    localStorage.setItem("isLoggedIn", "");
    handleClose();
    window.location.assign('/');

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
                <Box
                  sx={{ background: theme.palette.background.box }}
                  className="logout-container"
                >
                  <h1
                    className="logout-title"
                    style={{ color: theme.palette.color.navLink }}
                  >
                    Logout Page
                  </h1>
                  <Button variant="contained" color="error" onClick={handleOpen}>
                    Logout
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    sx={{ borderRadius: "10px" }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Typography id="modal-title" variant="h6" component="h2">
                        Logout Confirmation
                      </Typography>
                      <Typography
                        id="modal-description"
                        sx={{ mt: 2 }}
                        component="p"
                      >
                        Are you sure you want to logout?
                      </Typography>
                      <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
                        Logout
                      </Button>
                      <Button onClick={handleClose} sx={{ mt: 2 }}>
                        Cancel
                      </Button>
                    </Box>
                  </Modal>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Logout;
