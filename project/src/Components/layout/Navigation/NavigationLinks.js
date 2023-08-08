import { useTheme } from "@emotion/react";
import { Box, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationLinks = () => {
  const activeTabStyle = {
    "&.Mui-selected": {
      "& .MuiTab-label": {
        textDecoration: "underline",
      },
    },
  };

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCurrentTab(0);
    } else if (path === "/about") {
      setCurrentTab(1);
    } else if (path === "/categories") {
      setCurrentTab(2);
    } else if (path === "/providers") {
      setCurrentTab(3);
    } else if (path === "/contact") {
      setCurrentTab(4);
    } else {
      setCurrentTab("");
    }
  }, [location]);

  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [navValue, setNavValue] = useState(0);

  const handleNavChange = (event, newValue) => {
    setNavValue(newValue);
  };

  return (
    <div>
      <Box display={{ xs: "none", lg: "block" }}>
        <Tabs
          sx={{ marginLeft: "auto" }}
          indicatorColor="primary"
          value={currentTab}
          onChange={handleNavChange}
        >
          <Tab
            value={0}
            onClick={() => navigate("/")}
            sx={currentTab === 0 ? activeTabStyle : {}}
            label={t("Home")}
          />
          <Tab
            value={1}
            onClick={() => navigate("/about")}
            sx={currentTab === 1 ? activeTabStyle : {}}
            label={t("About Us")}
          />
          <Tab
            value={2}
            onClick={() => navigate("/categories")}
            sx={currentTab === 2 ? activeTabStyle : {}}
            label={t("Categories")}
          />
          <Tab
            value={3}
            onClick={() => navigate("/providers")}
            sx={currentTab === 3 ? activeTabStyle : {}}
            label={t("Providers")}
          />
          <Tab
            value={4}
            onClick={() => navigate("/contact")}
            sx={currentTab === 4 ? activeTabStyle : {}}
            label={t("Contact")}
          />
        </Tabs>
      </Box>
    </div>
  );
};

export default NavigationLinks;


export const PhoneNavigationLinks = () => {

  const theme = useTheme();

  const myLink = {
    color: theme.palette.color.navLink,
    textDecoration: "none",
  };
  return (
    <>
      <NavLink style={myLink} to="/">
        {t("Home")}
      </NavLink>
      <br />
      <br />
      <NavLink style={myLink} to="/about">
        {t("About")}
      </NavLink>
      <br />
      <br />
      <NavLink style={myLink} to="/categories">
        {t("Categories")}
      </NavLink>
      <br />
      <br />
      <NavLink style={myLink} to="/providers">
        {t("Providers")}
      </NavLink>
      <br />
      <br />
      <NavLink style={myLink} to="/contact">
        {t("Contact")}
      </NavLink>
      <br />
      <br />
    </>
  );
};
