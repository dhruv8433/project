import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Pnavigation from "../Components/Reusable/Profile/Pnavigation";
import { t } from "i18next";
import Layout from "../Components/layout/Layout";
import { API_URL } from "../config/config";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  document.title = "Delete account | eDemand"

  const handleDeleteAccount = () => {
    var myHeaders = new Headers();
    const token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${API_URL}/delete_user_account`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        toast.success(result.message);
      })
      .catch(error => console.log('error', error));

      handleClose();
      window.location.href("/");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("ContactInfo");
      localStorage.removeItem("Token");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Layout>
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
                  <Box sx={{ background: theme.palette.background.box, height: 590 }}>
                    <div className="logout-container">
                      <h1
                        className="logout-title"
                        style={{ color: theme.palette.background.navLink }}
                      >
                        {t("Delete Account")}
                      </h1>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleOpen}
                      >
                        {t("Delete")}
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
                            {t("Delete Account Confirmation")}
                          </Typography>
                          <Typography
                            id="modal-description"
                            sx={{ mt: 2 }}
                            component="p"
                          >
                            {t("Are you sure you want to Delete This Account?")}
                          </Typography>
                          <Button variant="contained" color="error" onClick={handleDeleteAccount} sx={{ mt: 2 }}>
                            {t("Delete")}
                          </Button>
                          <Button onClick={handleClose} sx={{ mt: 2 }}>
                            {t("Cancel")}
                          </Button>
                        </Box>
                      </Modal>
                    </div>
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

export default DeleteAccount;
