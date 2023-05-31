import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import CustomerReview from "./CustomerReview";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router";

const Review = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginBottom: 1, marginTop: 1 }}
        >
          <Link underline="hover" color="inherit" sx={{cursor: "pointer"}} onClick={() => navigate("/")}>
            Home
          </Link>
          <Link underline="hover" color="inherit" sx={{cursor: "pointer"}} onClick={() => navigate("/provider")}>
            providers
          </Link>
          <Link underline="hover" color="inherit" sx={{cursor: "pointer"}} onClick={() => navigate("/providers/services")}>
            Services
          </Link>
          <Typography color="text.primary">All Reviews</Typography>
        </Breadcrumbs>
        <Typography variant="h4" gutterBottom>
          <strong>All Reviews</strong>
        </Typography>

        <Box sx={{ background: theme.palette.background.box , padding: 2, borderRadius: "10px",marginBottom: 4}}>
          <Typography variant="h5"> Review & Rating</Typography> <hr />
        <CustomerReview /> <hr />
        <CustomerReview /> <hr />
        <CustomerReview /> <hr />
        <CustomerReview />  
         </Box>
      </Container>
    </>
  );
};

export default Review;
