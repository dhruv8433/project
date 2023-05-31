import React from "react";
import HomePage from "../Components/Reusable/HomePage";
import HomeCategory from "../Components/Reusable/HomeCategory";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      {/* calling just two function for home page Homepage contained only image slider with inputs and HomeCategory contianed all services   */}
      <HomePage />
      <HomeCategory />
    </Box>
  );
};

export default Home;
