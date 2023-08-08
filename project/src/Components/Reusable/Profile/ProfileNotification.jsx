import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useTheme } from '@mui/material/styles';
import Pnavigation from "./Pnavigation";
import { t } from "i18next";
import Layout from "../../layout/Layout";

const ProfileNotification = () => {
  document.title = "Profile - Notifications | eDemand";

  const theme = useTheme();
  return (
    <Layout>
      <Container sx={{ marginBottom: 3 }}>
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
              <Heading heading={t("Notifications")} />
              <Box sx={{ minHeight: "500px" }}>
                <NotificationList />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export const NotificationList = () => {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    var myHeaders = new Headers();
    const token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://edemand.wrteam.me/api/v1/get_notifications", requestOptions)
      .then((response) => response.json())
      .then((response) => setNotification(response.data))
      .then((response) => setLoading(true))
      .catch((error) => console.log("error", error));
  });
  const theme = useTheme();
  return (
    <>
      <List
        sx={{
          maxWidth: "100%",
          bgcolor: theme.palette.background.box,
          padding: 0,
        }}
      >
        {loading ? (
          <>
            {notification ? (
              <>
                {notification.map((response) => {
                  return (
                    <>
                      <ListItem key={response.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <img src={response.image} alt="notification" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={response.title}
                          secondary={response.message}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  );
                })}
              </>
            ) : (
              <h1> NO </h1>
            )}
          </>
        ) : (
          <Container>
            <Skeleton sx={{ height: "100px" }} />
            <Skeleton sx={{ height: "100px" }} />
            <Skeleton sx={{ height: "100px" }} />
            <Skeleton sx={{ height: "100px" }} />
            <Skeleton sx={{ height: "100px" }} />
            <Skeleton sx={{ height: "100px" }} />
          </Container>
        )}
      </List>
    </>
  );
};

export default ProfileNotification;
