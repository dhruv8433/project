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
import { t } from "i18next";

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
  localStorage.setItem("Pay", totalPrice);

  return (
    <>
      <Card sx={{ display: "flex", boxShadow: "none", border: "1px solid #97979752" }}>
        <Box height={162} width={160} display={"flex"} justifyContent={"center"}>
        <CardMedia
          component="img"
          image={item.image_of_the_service}
          alt={item.title}
          sx={{ maxWidth: 200 }}
        />
        </Box>
      
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

  const [tax, setTax] = useState(0);

  useEffect(() => {
    const storedTax = JSON.parse(localStorage.getItem("tax"));
    setTax(storedTax || 0);
  }, []);

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
    const apiUrl = "https://edemand.wrteam.me/api/v1/manage_cart";
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    if (!cartItems || cartItems.length === 0) {
      console.log("Cart is empty. Cannot make API request.");
      return;
    }

    const data = {
      items: cartItems.map((item) => ({
        service_id: item.id,
        qty: itemQuantities[item.id] || 1,
        tax: tax,
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
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        console.log("API request successful");
        // setCart(false);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    navigate("/checkout");
  };

  const subTotal = cartData.reduce(
    (total, item) =>
      total + item.discounted_price * (itemQuantities[item.id] || 1),
    0
  );

  // Calculate the total price
  const totalPrice =
    cartData.reduce(
      (total, item) =>
        total + item.discounted_price * (itemQuantities[item.id] || 1),
      0
    ) + tax;

  return (
    <div>
      <Box padding={1}>
        <Typography variant="h5" textAlign={"center"}>
          {t("Cart")}
        </Typography>
        <Divider />
        <br />
        {cartData.length === 0 ? (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={require('../../../Images/no-provider.png')}
              alt="Nothing in cart"
              style={{
                width: "220px",
                borderRadius: "500px",
              }}
            />
            <h3>{t("No Products here!")}</h3>
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
            <hr style={{ borderTop: "1px dashed" }} />
            <Typography
              variant="body2"
              sx={{ textAlign: "right", marginTop: 2 }}
            >
              {t("Sub Total")}: ${subTotal.toFixed(2)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", marginTop: 2 }}
            >
              {t("Tax")}: ${tax.toFixed(2)}
            </Typography>
            <br />
            <hr />
            <Typography
              variant="body2"
              sx={{ textAlign: "right", marginTop: 2 }}
            >
              {t("Total")}: ${totalPrice.toFixed(2)}
            </Typography>
          </>
        )}
      </Box>
    </div>
  );
};

export default Cart;
