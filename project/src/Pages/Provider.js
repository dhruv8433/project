import React from "react";
import Providers from "../Components/Reusable/Sections/Providers";
import Layout from "../Components/layout/Layout";
import SearchProvider from "../Components/Reusable/Sections/SearchProvider";

const Provider = () => {
  document.title = "Providers | eDemand"
  return (
    <Layout>
      <div>
        <SearchProvider />
        <Providers />
      </div>
    </Layout>
  );
};

export default Provider;
