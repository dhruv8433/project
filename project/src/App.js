import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Providers from "./Pages/Provider";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Reviews from "./Components/Reusable/Sections/Reviews";
import ProfileNavigation from "./Components/Reusable/Profile/ProfileNavigation";
import ProfilePayment from "./Components/Reusable/Profile/ProfilePayment";
import { Container, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ProfileBooking from "./Components/Reusable/Profile/ProfileBooking";
import ProfileAddress from "./Components/Reusable/Profile/ProfileAddress";
import ProfileBookmark from "./Components/Reusable/Profile/ProfileBookmark";
import ProfileNotification from "./Components/Reusable/Profile/ProfileNotification";
import ProviderServices from "./Components/Reusable/Sections/ProviderServices";
import PaymentPage from "./Components/Reusable/Sections/Payment";
import "./CSS/style.css";
import { createStore } from "redux";
import allReducers from "./reducer";
// Provider can connect our global state our store to app
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import NavigateCategorys from "./Components/Reusable/Profile/NavigateCategorys";
import Logout from "./Pages/Logout";
import DeleteAccount from "./Pages/DeleteAccount";
import StartPage from "./Pages/StartPage";
import Privacy_Policy from "./Components/Reusable/Sections/Privacy_Policy";
import Terms from "./Components/Reusable/Sections/Terms";
import { SpecificProvider } from "./Components/Reusable/Sections/Provider";
import Test from "./Test";

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

  if (!localStorage.getItem("isLoggedIn")) {
    // Set the variable to an empty value if it doesn't exist
    localStorage.setItem("isLoggedIn", "");
  }
  if (!localStorage.getItem("ContactInfo")) {
    // Set the variable to an empty value if it doesn't exist
    localStorage.setItem("ContactInfo", "");
  }
  if (!localStorage.getItem("ProfilePicture")) {
    // Set the variable to an empty value if it doesn't exist
    localStorage.setItem("ProfilePicture", "");
  }
  if (!localStorage.getItem("language")) {
    // Set the variable to an empty value if it doesn't exist
    localStorage.setItem("language", 10);
  }

  let loginInfo = localStorage.getItem("isLoggedIn");
  let providerAvailable = localStorage.getItem("providerAvailable");
  const handlePlaceSelected = (place) => {
    // Your implementation when a place is selected
    console.log("Selected Place:", place);
  };
  useEffect(() => {
    providerAvailable = localStorage.getItem("providerAvailable");
  }, []);
  return (
    <Paper>
      <Provider store={myStore}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  providerAvailable ? (
                    <Home />
                  ) : (
                    <StartPage onPlaceSelected={handlePlaceSelected} />
                  )
                }
              />
              <>
                <Route
                  path="/about"
                  element={providerAvailable ? <About /> : <StartPage />}
                />
                <Route path="/test" element={<Test />} />
                <Route path="/providers" element={<Providers />} />
                <Route
                  path="/checkout"
                  element={loginInfo ? <PaymentPage /> : <Navigate to={"/"} />}
                />
                <Route
                  path="/providers/services/reviews"
                  element={providerAvailable ? <Reviews /> : <StartPage />}
                />
                <Route
                  path="/categories"
                  element={providerAvailable ? <Category /> : <StartPage />}
                />
                <Route
                  path="/contact"
                  element={providerAvailable ? <Contact /> : <StartPage />}
                />
                <Route
                  path="/providers/services/:partner_id/:company_name"
                  element={
                    providerAvailable ? <ProviderServices /> : <StartPage />
                  }
                />
                <Route
                  path="/categories/:id/:title"
                  element={
                    providerAvailable ? <NavigateCategorys /> : <StartPage />
                  }
                />
                <Route
                  path="/privacy-policies"
                  element={
                    providerAvailable ? <Privacy_Policy /> : <StartPage />
                  }
                />
                <Route
                  path="/terms-and-conditions"
                  element={providerAvailable ? <Terms /> : <StartPage />}
                />
                <Route
                  path="/categories/:id/providers/:name"
                  element={
                    providerAvailable ? <SpecificProvider /> : <StartPage />
                  }
                />
              </>

              {/* profile section */}

              <Route
                path="/profile/address"
                element={loginInfo ? <ProfileAddress /> : <Navigate to={"/"} />}
              />
              <Route
                path="/profile/payment"
                element={loginInfo ? <ProfilePayment /> : <Navigate to={"/"} />}
              />
              <Route
                path="/profile/booking"
                element={loginInfo ? <ProfileBooking /> : <Navigate to={"/"} />}
              />
              <Route
                path="/profile/bookmark"
                element={
                  loginInfo ? <ProfileBookmark /> : <Navigate to={"/"} />
                }
              />
              <Route
                path="/profile/notifications"
                element={
                  loginInfo ? <ProfileNotification /> : <Navigate to={"/"} />
                }
              />
              <Route
                path="/profile"
                element={
                  loginInfo ? (
                    <ProfileNavigation />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
              <Route
                path="/logout"
                element={loginInfo ? <Logout /> : <Navigate to={"/"} />}
              />
              <Route
                path="/delete-account"
                element={loginInfo ? <DeleteAccount /> : <Navigate to={"/"} />}
              />

              {/* 404 Page Not Found */}
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </Paper>
  );
}

export default App;
