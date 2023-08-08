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
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Provider from "./Provider";
import AddressPayment from "./AddressPayment";
import { useTheme } from '@mui/material/styles';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { PaystackButton } from "react-paystack";
import { loadScript } from "@paypal/paypal-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Address, { AddAddress } from "../Profile/Address";
import { ToastContainer, toast } from "react-toastify";
import Cart from "./CartItem";
import { t } from "i18next";
import { useNavigate } from "react-router";
import Layout from "../../layout/Layout";

const steps = ["Select The Address", "Confirm Your Payment"];

export default function PaymentPage() {
  document.title = "Payment | eDemand";

  const amount = localStorage.getItem("Pay") * 100;
  const orderConfirm = () => {
    const myHeaders = new Headers();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const Token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append("payment_method", paymentMethod);
    formdata.append("address_id", "10");
    formdata.append("status", "Awaiting");
    formdata.append("order_note", "test");
    formdata.append("date_of_service", formattedDate);
    formdata.append("starting_time", "16:30:00");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://edemand.wrteam.me/api/v1/place_order", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(localStorage.setItem("Booking", true))
      .catch((error) => console.log("error", error));


    navigate('/');
    localStorage.removeItem("cart");
    toast.success("Order Placed Success");
  };
  const navigate = useNavigate();

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
    email: "xyz@gmail.com",
    onSuccess: orderConfirm,
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


  //Payment of RazorPay...
  const handlePayment = () => {
    const options = {
      key: "rzp_test_k94uzC2zWjNsrD",
      //here we have to fetch data from cart and show payable amount
      amount, // Amount in paise (e.g., 10000 paise = ₹100)
      currency: "INR",
      name: "eDemand",
      description: "Payment for Your Product",
      image: "https://yourcompany.com/logo.png",
      handler: function (response) {
        // Handle the success callback
        console.log(response);
        orderConfirm();
      },
      prefill: {
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
    stripe
      .redirectToCheckout({
        lineItems: [{ price: "your_price_id", quantity: 1 }],
        mode: "payment",
        successUrl: "https://your-website.com/success",
        cancelUrl: "https://your-website.com/cancel",
      })
      .then(() => {
        orderConfirm(); // Call orderConfirm function after successful payment
      });
    // // Call your backend API to create a session
  };

  // PayPal payment configuration
  const paypalOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
    // onSuccess: orderConfirm
  };

  // Callback function after PayPal payment is approved
  const onApprove = (data, actions) => {
    // Call orderConfirm function after successful payment
    orderConfirm();
    // Do additional processing or handle the payment data
    console.log("PayPal payment approved:", data);
    // Capture the funds using the order ID
    return actions.order.capture();
  };

  const onToken = (token) => {
    // console.log(token);
    let a = token;
  };
  const [paymentMethod, setPaymentMethod] = React.useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const [deliveryAddress, setDeliveryAddress] = React.useState(null);

  const handleDeliverHere = (address) => {
    setDeliveryAddress(address);
  };

  React.useEffect(() => {
    handleDeliverHere();
  }, []);

  const [itemQuantities, setItemQuantities] = React.useState(() => {
    const storedItemQuantities = JSON.parse(
      localStorage.getItem("itemQuantities")
    );
    return storedItemQuantities || {};
  });

  const handleRequest = () => {
    const apiUrl = "https://edemand.wrteam.me/api/v1/manage_cart";
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    if (!cartItems || cartItems.length === 0) {
      console.log("Cart is empty.");
      return;
    }

    const data = {
      items: cartItems.map((item) => ({
        service_id: item.id,
        qty: itemQuantities[item.id] || 1,
      })),
    };

    var myHeaders = new Headers();
    const Token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    const uniqueItems = data.items.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.service_id === item.service_id)
    );

    var formdata = new FormData();
    data.items.forEach((item) => {
      formdata.append("service_id", item.service_id);
      formdata.append("qty", item.qty);
    });

    fetch(apiUrl, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      console.log("API request successful");
    })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handleDelivery = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    handleRequest();

    if (!cartItems || cartItems.length === 0) {
      toast.info("Cart is empty.");
      return;
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Layout>
      <Box
        sx={{
          mt: 3,
          bgcolor: theme.palette.background.box,
          mb: 3,
          overflow: "hidden",
          minHeight: 500
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
                  {activeStep == 0 ? (
                    //One side Addresses and another side Cart Details
                    <Box>
                      <Box minHeight={"520px"}>
                        <Grid
                          container
                          spacing={15}
                          sx={{
                            backgroundColor: theme.palette.background.box,
                            borderRadius: "10px",
                          }}
                          boxShadow={"none"}
                        >
                          <Grid item xs={12} md={6}>
                            <Box mt={1}>
                              <AddAddress />
                              <Address onSelectAddress={handleDeliverHere} />
                              {deliveryAddress && (
                                <Button
                                  variant="contained"
                                  onClick={handleDelivery}
                                  sx={{ ml: 2 }}
                                >
                                  {t("Select This Address")}
                                </Button>
                              )}
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ border: "1px dashed", mt: -1 }}>
                              <Cart />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ minHeight: 500 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                              Payment method
                            </Typography>

                            <FormControl component="fieldset" sx={{ mt: 2 }}>
                              <FormLabel component="legend">
                                Select Payment Method
                              </FormLabel>
                              <RadioGroup
                                aria-label="paymentMethod"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                              >
                                <FormControlLabel
                                  value="paypal"
                                  control={<Radio />}
                                  label="PayPal"
                                />
                                <FormControlLabel
                                  value="razorpay"
                                  control={<Radio />}
                                  label="RazorPay"
                                />
                                <FormControlLabel
                                  value="stripe"
                                  control={<Radio />}
                                  label="Stripe"
                                />
                                <FormControlLabel
                                  value="paystack"
                                  control={<Radio />}
                                  label="Paystack"
                                />
                              </RadioGroup>
                            </FormControl>

                            <Divider sx={{ width: 240 }} />

                            {paymentMethod === "paypal" && (
                              <Grid item spacing={2}>
                                <Box width={80} mt={4}>
                                  <PayPalScriptProvider options={paypalOptions} onSuccess={orderConfirm}>
                                    <PayPalButtons
                                      style={{ layout: "vertical" }}
                                    />
                                  </PayPalScriptProvider>
                                </Box>
                              </Grid>
                            )}

                            {paymentMethod === "razorpay" && (
                              <Box sx={{ marginTop: 4 }}>
                                <Button
                                  color="primary"
                                  variant="outlined"
                                  onClick={handlePayment}
                                >
                                  Pay with Razorpay
                                </Button>
                              </Box>
                            )}

                            {paymentMethod === "stripe" && (
                              <Box sx={{ mt: 4 }}>
                                <Elements stripe={stripePromise}>
                                  <StripeCheckout
                                    token={onToken}
                                    stripeKey="pk_test_51Hh90WLYfObhNTTwooBHwynrlfiPo2uwxyCVqGNNCWGmpdOHuaW4rYS9cDldKJ1hxV5ik52UXUDSYgEM66OX45550065US7tRX"
                                  >
                                    <Button variant="outlined">
                                      Pay with Stripe
                                    </Button>
                                  </StripeCheckout>
                                </Elements>
                              </Box>
                            )}

                            {paymentMethod === "paystack" && (
                              <Box sx={{ mt: 4 }}>
                                <PaystackButton
                                  className="myPaystrack"
                                  {...componentProps}
                                >
                                  <Button
                                    variant="outlined"
                                    sx={{ background: "none" }}
                                  >
                                    Pay with Paystack
                                  </Button>
                                </PaystackButton>
                              </Box>
                            )}
                          </React.Fragment>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ border: "1px dashed", mt: -1 }}>
                            <Cart />
                          </Box>
                        </Grid>
                      </Grid>
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
                </Box>
              </React.Fragment>
            )}
            <ToastContainer />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}
