import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Providers from "./Pages/Provider";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Footer from "./Components/layout/Footer";
import Reviews from "./Components/Reusable/Reviews";
import Navigation from "./Components/layout/Navigation";
import ProfileNavigation from "./Components/Reusable/Profile/ProfileNavigation";
import ProfilePayment from "./Components/Reusable/Profile/ProfilePayment";
import { Button, Container, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProfileBooking from "./Components/Reusable/Profile/ProfileBooking";
import ProfileAddress from "./Components/Reusable/Profile/ProfileAddress";
import ProfileBookmark from "./Components/Reusable/Profile/ProfileBookmark";
import ProfileNotification from "./Components/Reusable/Profile/ProfileNotification";
import ProviderServices from "./Components/Reusable/ProviderServices";
import PaymentPage from "./Components/Reusable/Payment";
import "./CSS/style.css";
import { createStore } from "redux";
import allReducers from "./reducer";
// Provider can connect our global state our store to app
import { Provider } from "react-redux";
import theme, { darkTheme, lightTheme } from "./Theme";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import NavigateCategorys from "./Components/Reusable/Profile/NavigateCategorys";
// import Logout from "./Components/layout/Logout";
// import Countervalue from "./reducer/Countervalue";
// import HandleSubmit, { GetCities } from "./Components/Reusable/Firebase";
// import Firebase from "./Components/Reusable/Firebase";
// import CssBaseline from "@mui/material/CssBaseline";
// import theme from "./Theme";
// import MyApp from "./Components/layout/ThemeButton";
// import ToggleColorMode from "./Components/layout/ThemeButton";

// Store -> Globalized State
let myStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleChangeLight = () => {
    setDarkMode(false);
  };

  const handleChangeDark = () => {
    setDarkMode(true);
  };

  return (
    // <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper>
        {/* Store for Redux */}
        <Provider store={myStore}>
          <div className="App">
            <BrowserRouter>
              <Navigation
                check={darkMode}
                changeLight={handleChangeLight}
                changeDark={handleChangeDark}
              />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/providers" element={<Providers />}></Route>
                <Route
                  path="/providers/services"
                  element={<ProviderServices />}
                ></Route>
                <Route
                  path="/providers/services/payment"
                  element={<PaymentPage />}
                ></Route>
                <Route
                  path="/providers/services/reviews"
                  element={<Reviews />}
                ></Route>
                <Route
                  path="/categorys"
                  element={
                    <div style={{ marginBottom: "100px" }}>
                      <Category />
                    </div>
                  }
                ></Route>
                <Route path="/contact" element={<Contact />}></Route>

                <Route
                  path="/categorys/:id"
                  element={<NavigateCategorys />}
                ></Route>

                {/* profile section  */}

                <Route
                  path="/profile/address"
                  element={<ProfileAddress />}
                ></Route>
                <Route
                  path="/profile/payment"
                  element={<ProfilePayment />}
                ></Route>
                <Route
                  path="/profile/booking"
                  element={<ProfileBooking />}
                ></Route>
                <Route
                  path="/profile/bookmark"
                  element={<ProfileBookmark />}
                ></Route>
                {/* <Route
                  path="/profile/logout"
                  element={<Logout />}
                >  
                </Route> */}
                <Route
                  path="/profile/notifications"
                  element={<ProfileNotification />}
                ></Route>
                <Route
                  path="/profile"
                  element={
                    <>
                      <Container>
                        <ProfileNavigation />
                      </Container>
                    </>
                  }
                ></Route>

                {/* 404 Page Not Found */}
                <Route path="/*" element={<PageNotFound />}></Route>
              </Routes>
              <Footer />
            </BrowserRouter>
          </div>
        </Provider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
