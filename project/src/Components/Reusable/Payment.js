import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import Provider from "./Provider";
import AddressPayment from "./AddressPayment";
import { useTheme } from "@emotion/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { PaystackButton } from "react-paystack";
import { loadScript } from "@paypal/paypal-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const steps = ["Select The Address", "Confirm Your Payment"];

export default function PaymentPage() {

  document.title = "payment | eDemand"

  const amount = localStorage.getItem("Pay") * 100;

  const [activeStep, setActiveStep] = React.useState(0);
  const stripePromise = loadStripe(
    "pk_test_51Hh90WLYfObhNTTwooBHwynrlfiPo2uwxyCVqGNNCWGmpdOHuaW4rYS9cDldKJ1hxV5ik52UXUDSYgEM66OX45550065US7tRX"
  );
  const publicKey = "pk_test_0c7a420e09aff08160ec866529f03a13eeaabc6a";
  const componentProps = {
    publicKey,
    amount,
    currency: "GHS",
    // amount: 100,
    text: "Pay Now",
    email: "xyz@gmail.com",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const theme = useTheme();

  // let price = localStorage.getItem("cart").discounted_price;

  //Payment of RazorPay...
  const handlePayment = () => {
    const options = {
      key: "rzp_test_k94uzC2zWjNsrD",
      //here we have to fetch data from cart and show payable amount
      amount, // Amount in paise (e.g., 10000 paise = ₹100)
      currency: "INR",
      name: "eDemmand",
      description: "Payment for Your Product",
      image: "https://yourcompany.com/logo.png",
      handler: function (response) {
        // Handle the success callback
        console.log(response);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#F37254",
      },
    };

    window.Razorpay.open(options);
  };

  const handleStripePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Hh90WLYfObhNTTwooBHwynrlfiPo2uwxyCVqGNNCWGmpdOHuaW4rYS9cDldKJ1hxV5ik52UXUDSYgEM66OX45550065US7tRX"
    );

    // Use the Stripe object to open the payment popup
    stripe.redirectToCheckout({
      lineItems: [{ price: "your_price_id", quantity: 1 }],
      mode: "payment",
      successUrl: "https://your-website.com/success",
      cancelUrl: "https://your-website.com/cancel",
    });
    // // Call your backend API to create a session
  };

  const onToken = (token) => {
    console.log(token);
  };

  return (
    <Box
      sx={{
        mt: 3,
        bgcolor: theme.palette.background.paper,
        mb: 3,
        overflow: "hidden",
      }}
    >
      <Container>
        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
                {/* Ternary operator for page changes  */}
                {activeStep == 0 ? (
                  <Box sx={{ mt: 2, mb: 1 }}>
                    {/* Select Address Page import here  */}
                    <AddressPayment />
                  </Box>
                ) : (
                  // incompelte because of not ui present
                  <Box>
                    <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        Payment method
                      </Typography>

                      <Grid
                        container
                        spacing={2}
                        justifyContent={"space-around"}
                        display={"flex"}
                      >
                        <Grid item spacing={2}>
                          <Box>
                            <PayPalScriptProvider
                              options={{ "client-id": "test" }}
                            >
                              <PayPalButtons
                                style={{ height: 50, width: 200 }}
                              />
                            </PayPalScriptProvider>
                          </Box>
                          <Button color="primary" onClick={handlePayment}>
                            <img
                              src={require("../../Images/RazorPay.png")}
                              alt="paypal"
                              width="200px"
                              height="80px"
                              style={{ borderRadius: "10px" }}
                            />
                          </Button>

                          {/* Stripe payment Error */}
                          <Box>
                            <Elements stripe={stripePromise}>
                              <StripeCheckout
                                token={onToken}
                                stripeKey="pk_test_51Hh90WLYfObhNTTwooBHwynrlfiPo2uwxyCVqGNNCWGmpdOHuaW4rYS9cDldKJ1hxV5ik52UXUDSYgEM66OX45550065US7tRX"
                              >
                                <img
                                  src={require("../../Images/Stripe.png")}
                                  alt="Stripe"
                                  width="200px"
                                  height="80px"
                                  style={{ borderRadius: "10px" }}
                                />
                              </StripeCheckout>
                            </Elements>

                            <Box>
                              {/* <img
                              src={require("../../Images/PayStack.png")}
                              alt="payStack"
                              width="200px"
                              height="80px"
                              style={{ borderRadius: "10px" }}
                            />{" "} */}
                              <Button color="primary">
                                <PaystackButton
                                  data-custom-button=""
                                  image={require("../../Images/PayStack.png")}
                                  {...componentProps}
                                ></PaystackButton>
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  </Box>
                )}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </Box>
  );
}
