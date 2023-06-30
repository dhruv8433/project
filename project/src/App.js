import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { Container, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
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
import { darkTheme, lightTheme } from "./Theme";
import { useEffect, useState } from "react";
import NavigateCategorys from "./Components/Reusable/Profile/NavigateCategorys";
import Logout from "./Pages/Logout";
import DeleteAccount from "./Pages/DeleteAccount";
import StartPage from "./Pages/StartPage";
import Access from "./Pages/Access";
import { ToastContainer, toast } from "react-toastify";
import Privacy_Policy from "./Components/Reusable/Privacy_Policy";
import Terms from "./Components/Reusable/Terms";

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

  if (!localStorage.getItem('isLoggedIn')) {
    // Set the variable to an empty value if it doesn't exist
    localStorage.setItem('isLoggedIn', '');
  }
  if (!localStorage.getItem('ContactInfo')) {
    // Set the variable to an empty value if it doesn't exist
    localStorage.setItem('ContactInfo', '');
  }
  if (!localStorage.getItem('ProfilePicture')) {
    // Set the variable to an empty value if it doesn't exist
    localStorage.setItem('ProfilePicture', '');
  }

  const handlePlaceSelected = (place) => {
    // Handle the selected place here
    console.log("Selected place:", place);
  };

  let loginInfo = localStorage.getItem("isLoggedIn");
  let providerAvailable = localStorage.getItem("providerAvailable");

  useEffect(() => { providerAvailable = localStorage.getItem("providerAvailable") }, [])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper>
        {/* Store for Redux */}
        <Provider store={myStore}>
          <div className="App">
            <BrowserRouter>
              {providerAvailable ? (
                <Navigation
                  check={darkMode}
                  changeLight={handleChangeLight}
                  changeDark={handleChangeDark}
                />
              ) : null}
              <br />
              <br />
              <br />
              <Routes>
                <Route
                  path="/"
                  element={
                    providerAvailable ? <Home /> : <StartPage />
                  }
                />
                <>
                  {/* <Route
                    path="/home"
                    element={providerAvailable ? 
                      <Home onPlaceSelected={handlePlaceSelected} /> : <StartPage />
                    }
                  /> */}
                  <Route path="/about" element={providerAvailable ? <About /> : <StartPage />} />
                  <Route path="/providers" element={<Providers />} />
                  <Route
                    path="/providers/services/payment"
                    element={providerAvailable ? <PaymentPage /> : <StartPage />}
                  />
                  <Route
                    path="/providers/services/reviews"
                    element={providerAvailable ? <Reviews /> : <StartPage />}
                  />
                  <Route
                    path="/categories"
                    element={providerAvailable ?
                      <div style={{ marginBottom: "100px" }}>
                        <Category />
                      </div> : <StartPage />
                    }
                  />
                  <Route path="/contact" element={providerAvailable ? <Contact /> : <StartPage />} />
                  <Route
                    path="/providers/services/:partner_id/:company_name"
                    element={providerAvailable ? <ProviderServices /> : <StartPage />}
                  />
                  <Route
                    path="/categories/:id/:title"
                    element={providerAvailable ? <NavigateCategorys /> : <StartPage />}
                  />
                  <Route
                    path="/privacy-policies"
                    element={providerAvailable ? <Privacy_Policy /> : <StartPage />}
                  />
                  <Route
                    path="/terms-and-conditions"
                    element={providerAvailable ? <Terms /> : <StartPage />}
                  />
                </>
                )

                {/* profile section */}

                <Route
                  path="/profile/address"
                  element={loginInfo ? <ProfileAddress /> : <Navigate to={'/'} /> }
                />
                <Route
                  path="/profile/payment"
                  element={loginInfo ? <ProfilePayment /> : <Navigate to={'/'} />}
                />
                <Route
                  path="/profile/booking"
                  element={loginInfo ? <ProfileBooking /> : <Navigate to={'/'} />}
                />
                <Route
                  path="/profile/bookmark"
                  element={loginInfo ? <ProfileBookmark /> : <Navigate to={'/'} />}
                />
                <Route
                  path="/profile/notifications"
                  element={loginInfo ? <ProfileNotification /> : <Navigate to={'/'} />}
                />
                <Route
                  path="/profile"
                  element={
                    loginInfo ? 
                    <>
                      <Container>
                        <ProfileNavigation />
                      </Container>
                      </> : <Navigate to={'/'} />
                  }
                />
                <Route path="/profile/logout" element={loginInfo ? <Logout /> : <Navigate to={'/'} />} />
                <Route
                  path="/profile/delete"
                  element={loginInfo ? <DeleteAccount /> : <Navigate to={'/'} />}
                />

                {/* 404 Page Not Found */}
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
              {providerAvailable ? <Footer /> : null}
            </BrowserRouter>
          </div>
        </Provider>
      </Paper>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
