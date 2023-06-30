import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const CartItem = ({ item, onDelete, onQuantityChange, itemQuantities }) => {
  const handleIncrement = () => {
    onQuantityChange(item.id, (itemQuantities[item.id] || 0) + 1);
  };

  const handleDecrement = () => {
    if ((itemQuantities[item.id] || 0) > 1) {
      onQuantityChange(item.id, (itemQuantities[item.id] || 0) - 1);
    }
  };

  const totalPrice = item.discounted_price * (itemQuantities[item.id] || 1);

  return (
    <>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          height="180"
          width="200"
          image={item.image_of_the_service}
          alt={item.title}
          sx={{ maxWidth: 200 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body1" color="text.secondary">
            ${item.discounted_price}
          </Typography>
          <Box display="flex" alignItems="center" marginTop={2}>
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body2">
              {itemQuantities[item.id] || 1}
            </Typography>
            <IconButton onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="body2">
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions sx={{ alignSelf: "flex-end" }}>
          <IconButton
            color="error"
            aria-label="Delete"
            onClick={() => onDelete(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <br />
    </>
  );
};

const Cart = () => {
  // localStorage.removeItem("itemQuantity")

  const [cartData, setCartData] = useState(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cart"));
    return storedCartData || [];
  });

  const navigate = useNavigate();

  const [itemQuantities, setItemQuantities] = useState(() => {
    const storedItemQuantities = JSON.parse(
      localStorage.getItem("itemQuantities")
    );
    return storedItemQuantities || {};
  });

  useEffect(() => {
    localStorage.setItem("itemQuantities", JSON.stringify(itemQuantities));
  }, [itemQuantities]);

  const handleQuantityChange = (itemId, quantity) => {
    const updatedQuantities = {
      ...itemQuantities,
      [itemId]: quantity,
    };

    setItemQuantities(updatedQuantities);
    localStorage.setItem("itemQuantities", JSON.stringify(updatedQuantities));
  };

  const handleDelete = (itemId) => {
    setCartData((prevCartData) => {
      const updatedCartData = prevCartData.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCartData));
      return updatedCartData;
    });

    setItemQuantities((prevItemQuantities) => {
      const updatedItemQuantities = { ...prevItemQuantities };
      delete updatedItemQuantities[itemId];
      localStorage.setItem(
        "itemQuantities",
        JSON.stringify(updatedItemQuantities)
      );
      return updatedItemQuantities;
    });
  };

  const handleRequest = () => {
    const apiUrl = "https://edemand-test.wrteam.in/api/v1/manage_cart";
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    if (!cartItems || cartItems.length === 0) {
      console.log("Cart is empty. Cannot make API request.");
      return;
    }

    const data = {
      items: cartItems.map((item) => ({
        service_id: item.id,
        qty: itemQuantities[item.id] || 1,
      })),
    };

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzkzOTQwNzYsImlzcyI6ImVkZW1hbmQiLCJleHAiOjE3MTA5MzAwNzYsInN1YiI6ImVkZW1hbmRfYXV0aGVudGljYXRpb24iLCJ1c2VyX2lkIjoiNTUzIn0.gaszZFmh4bfyEpBQTAKVJMyxYAkKx8BYzx8EJZjimZI`
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
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        console.log("API request successful");
        toast.success("Added to cart")
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    navigate("/providers/services/payment");
  };

  // Calculate the total price
  const totalPrice = cartData.reduce(
    (total, item) =>
      total + item.discounted_price * (itemQuantities[item.id] || 1),
    0
  );

  return (
    <div>
      <Box padding={1}>
        <Typography variant="h4">Cart</Typography>
        <Divider />
        <br />
        {cartData.length === 0 ? (
          <Box sx={{ textAlign: "center" }}>
            <img src="https://img.freepik.com/free-vector/corrugated-box-white-background_1308-111117.jpg"
              style={{
                width: "220px",
                borderRadius: "500px",
                marginTop: "150px",
              }} />
            <h3>No Products here!</h3>

          </Box>
        ) : (
          <>
            {cartData.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                onDelete={handleDelete}
                onQuantityChange={handleQuantityChange}
                itemQuantities={itemQuantities}
              />
            ))}
            <Typography
              variant="body2"
              sx={{ textAlign: "right", marginTop: 2 }}
            >
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </>
        )}
        {cartData.length === 0 ? (
          ""
        ) : (
          <Button fullWidth variant="contained" onClick={handleRequest}>
            Continue
          </Button>
        )}

        <ToastContainer />
      </Box>
    </div>
  );
};

export default Cart;
