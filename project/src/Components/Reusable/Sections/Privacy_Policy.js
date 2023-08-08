import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import Layout from "../../layout/Layout";
import api from '../../../API/Fetch_data_Api'
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
const Privacy_Policy = () => {

  const [privacy, setPrivacy] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    api.get_settings().then((setting) => {
      console.log(setting.data.about_us);
      setPrivacy(setting.data.privacy_policy.privacy_policy);
    });
  }, []);

  return (
    <Layout>
      <div>
        <Box
          paddingTop={"15px"}
          paddingBottom={"15px"}
          mb={"20px"}
          sx={{ background: theme.palette.background.heading }}
        >
          <Container maxWidth="lg">
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ marginBottom: 1, marginTop: 1 }}
            >
              <Link
                sx={{ cursor: "pointer", textDecoration: "none" }}
                color="inherit"
                onClick={() => navigate("/")}
              >
                {t("Home")}
              </Link>
              <Typography color="text.primary">{t("About")}</Typography>
            </Breadcrumbs>
            <Typography variant="h4" gutterBottom>
              <>{t("Privacy Policy")}</>
            </Typography>
          </Container>
        </Box>
        <Container maxWidth={"lg"} sx={{ mt: 2, mb: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: privacy }} />
        </Container>
      </div>
    </Layout>
  );
};

export default Privacy_Policy;
