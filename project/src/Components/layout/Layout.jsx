import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../../Theme";
import { Paper } from "@mui/material";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === "true");
    }
  }, []);

  const handleChangeLight = () => {
    setDarkMode(false);
    localStorage.setItem("darkMode", "false");
  };

  const handleChangeDark = () => {
    setDarkMode(true);
    localStorage.setItem("darkMode", "true");
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper>
        <Navigation
          check={darkMode}
          changeLight={handleChangeLight}
          changeDark={handleChangeDark}
        />
        <div style={{ minHeight: 620, paddingTop: 65 }}>{children}</div>
        <Footer />
      </Paper>
    </ThemeProvider>
  );
};

export default Layout;