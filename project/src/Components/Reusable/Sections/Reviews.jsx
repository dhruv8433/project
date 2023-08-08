import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CustomerReview from "./CustomerReview";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";
import Layout from "../../layout/Layout";
import { t } from "i18next";

const Review = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Layout>
      <Container>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginBottom: 1, marginTop: 1 }}
        >
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            {t("Home")}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/providers")}
          >
            {t("providers")}
          </Link>
          <Typography color="text.primary">{t("All Reviews")}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" gutterBottom>
          <strong>{t("All Reviews")}</strong>
        </Typography>

        <Box
          sx={{
            background: theme.palette.background.box,
            padding: 2,
            borderRadius: "10px",
            marginBottom: 4,
            minHeight: 520,
          }}
        >
          <Typography variant="h5">{t("Review & Rating")}</Typography> <hr />
          <CustomerReview />
        </Box>
        <Stack
          spacing={2}
          marginBottom={3}
          display={"flex"}
          flexDirection={"row-reverse"}
        >
          {/* <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      /> */}
        </Stack>
      </Container>
    </Layout>
  );
};

export default Review;
