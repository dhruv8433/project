import React from "react";
import Providers from "../Components/Reusable/Providers";
import Layout from "../Components/layout/Layout";
import SearchProvider from "../Components/Reusable/SearchProvider";

const Provider = () => {
  return (
    <div>
      <SearchProvider />
      <Providers />
    </div>
  );
};

export default Provider;
