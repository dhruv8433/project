import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Pnavigation from "../Components/Reusable/Profile/Pnavigation";
import { t } from "i18next";
import Layout from "../Components/layout/Layout";
import { API_URL } from "../config/config";
import { toast } from "react-toastify";

const Logout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  document.title = "Logout | eDemand";

  const handleLogout = () => {
    // Perform logout actions here
    logout()
    localStorage.setItem("ContactInfo", "");
    localStorage.setItem("isLoggedIn", "");
    localStorage.setItem("Token", "");
    handleClose();
    setTimeout(() => {
      window.location.assign('/');
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function logout() {
    var myHeaders = new Headers();
    const token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("all_device", "true");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${API_URL}/logout`, requestOptions)
      .then(response => response.text())
      .then(result => {
        toast.success(result.message)
      })
      .catch(error => console.log('error', error));
  }

  return (
    <Layout>
      <Container >
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
                    sx={{ background: theme.palette.background.box, height: 590 }}
                    className="logout-container"
                  >
                    <h1
                      className="logout-title"
                      style={{ color: theme.palette.background.navLink }}
                    >
                      {t("Logout Page")}
                    </h1>
                    <Button variant="contained" color="error" onClick={handleOpen}>
                      {t("Logout")}
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
                          {t("Logout Confirmation")}
                        </Typography>
                        <Typography
                          id="modal-description"
                          sx={{ mt: 2 }}
                          component="p"
                        >
                          {t("Are you sure you want to logout?")}
                        </Typography>
                        <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
                          {t("Logout")}
                        </Button>
                        <Button onClick={handleClose} sx={{ mt: 2 }}>
                          {t("Cancel")}
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
    </Layout>
  );
};

export default Logout;
