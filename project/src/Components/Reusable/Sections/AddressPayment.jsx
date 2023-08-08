import React, { useState } from "react";
import Address, { AddAddress } from "../Profile/Address";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import GoogleMapWithLocation from "./GoogleMapWithLocation";
import Cart from "./CartItem";

const AddressPayment = () => {
  const theme = useTheme();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [activeStep, setActiveStep] = useState(0); // Add active step state

  const handleDeliverHere = (address) => {
    setDeliveryAddress(address);
  };

  const handleDelivery = () => {
    // Handle the delivery action for the selected address
    console.log("Deliver to:", deliveryAddress);
    // Perform the necessary actions for delivering to the selected address
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <div>
      <Box minHeight={"520px"}>
        <Grid
          container
          spacing={15}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
          }}
          boxShadow={"none"}
        >
          <Grid item xs={12} md={6}>
            <Box mt={1}>
              <AddAddress />
              <Address onSelectAddress={handleDeliverHere} />
              {deliveryAddress && (
                <Button variant="contained" onClick={handleDelivery} sx={{ml:2}}>
                  Deliver Here
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: "1px dashed" }}>
              <Cart />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddressPayment;
