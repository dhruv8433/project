import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2560fc",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      paper: "#f2f1f6", // Set the color of the paper background
      box: "white",
      card: "white",
      addressBox: "#Fdfdfd",
      input: "white",
      provider: "white",
      booking: "#f9f8f8",
      heading: "#e8e8e8f2",
      categories : "white",
      navLink:"black,"
    },
    color: {
      navLink: "black",
      logo: "blue",
      catLink: 'black',
      secondary: '#575757',
      phone: "#2664f7"
      // inputTag: "black"
    },
    fonts: {
      h1: "24pt",
      h2: "20pt",
      h3: "16pt",
      h4: "12pt",
    },
    icons: {
      icon: "black"
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2560fc",
    },
    secondary: {
      main: "#343f53",
    },
    background: {
      paper: "#041C32", // Set the color of the paper background
      box: "#041C32",
      addressBox: "#343F53",
      card: "#343f53",
      input: "#3d3f48",
      provider: "#1b3145",
      booking: "#041C32",
      heading: "#041C32",
      categories: "#11283d",
      navLink: "white",

    },
    color: {
      navLink: "white",
      logo: "white",
      catLink: "white",
      secondary: "white",
      phone: "white",

      // inputTag: "black",
    },
    fonts: {
      h1: "24pt",
      h2: "20pt",
      h3: "16pt",
      h4: "12pt",
    },
    icons: {
      icon: "white"
    }
  },
});


export { darkTheme, lightTheme };