import { CloseRounded, DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import GoogleMapWithLocation from "../Sections/GoogleMapWithLocation";
import { t } from "i18next";
import { ThemeContext, useTheme } from "@emotion/react";
import AddressForm, { UpdateAddress, UpdateForm } from "./AddressForm";
import { API_URL } from "../../../config/config";

const Address = ({ onSelectAddress }) => {
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [defName, setDefName] = useState([]);
  const [defAddress, setDefAddress] = useState([]);
  const [edit, setEdit] = useState(false);
  const [deleteItem, isDeleteItem] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };

  const handleDelete = () => {
    isDeleteItem(true);
  };

  const handleDeleteClose = () => {
    isDeleteItem(false);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  let name = localStorage.getItem("userName");
  let address = localStorage.getItem("userAddress");

  const handleUpdate = () => {
    let updatedName = document.getElementById("updateName").value;
    let updatedEmail = document.getElementById("updatedAddress").value;

    localStorage.setItem("addressName", updatedName);
    localStorage.setItem("addressLocation", updatedEmail);
    setEdit(false);
  };

  return (
    <div>
      <Box>
        <DynamicAddress onSelectAddress={onSelectAddress} />
      </Box>
    </div>
  );
};

export const AddAddress = () => {
  const [openAdd, isOpenAdd] = useState(false);
  const [name, setName] = React.useState([]);
  const [address, setAddress] = React.useState([]);
  const [copy, setCopy] = useState(false);

  const handleOpenAddress = () => {
    isOpenAdd(true);
  };

  const handleCloseAdderss = () => {
    isOpenAdd(false);
  };

  const submit = () => {
    let name = document.getElementById("addressName").value;
    let location = document.getElementById("addressLocation").value;

    setName(name);
    setAddress(location);

    const userName = JSON.parse(localStorage.getItem("userName")) || [];
    const userAddress = JSON.parse(localStorage.getItem("userAddress")) || [];

    if (userName.length >= 3) {
      toast.warning("Address limit reached (maximum 3 addresses allowed).");
      isOpenAdd(false);
      return;
    }

    userName.push(name);
    userAddress.push(location);
    localStorage.setItem("userName", JSON.stringify(userName));
    localStorage.setItem("userAddress", JSON.stringify(userAddress));

    toast.success("Address Added Success");
    setCopy(true);

    isOpenAdd(false);
  };

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          mx: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{ marginTop: 3, height: 100 }}
          fullWidth
          onClick={handleOpenAddress}
        >
          +{t("Add New Address")}
        </Button>

        <Backdrop open={openAdd} sx={{ zIndex: 1000 }}>
          <Box
            sx={{ background: theme.palette.background.box, width: "1000px" }}
            borderRadius={"10px"}
            padding={3}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography>Add New Address</Typography>
              <IconButton sx={{ mt: -1 }} onClick={handleCloseAdderss}>
                <CloseRounded />
              </IconButton>
            </Box>
            <Divider />
            <br />
            <AddressForm />
          </Box>
        </Backdrop>
      </Box>
    </>
  );
};

export default Address;

// --------------------Dynamic Address-----------------------
export const DynamicAddress = ({ onSelectAddress }) => {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("coordinates");
    if (storedAddresses) {
      setAddressList(JSON.parse(storedAddresses));
    }
  }, []);

  const handleDelete = (index) => {
    setDeleteIndex(index);
  };

  const handleDeleteClose = () => {
    setDeleteIndex(null);
  };

  const handleSelect = (index) => {
    setSelectedAddress(index);
    const selectedAddress = addressList[index];
    onSelectAddress(selectedAddress); // Call the onSelectAddress function with the selected address object
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleEditClose = () => {
    setEditIndex(null);
    setOpen(false);
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = [...addressList];
    updatedAddresses.splice(index, 1);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setAddressList(updatedAddresses);
    setDeleteIndex(null);
  };

  const handleUpdate = (index, updatedAddress) => {
    const updatedAddresses = [...addressList];
    updatedAddresses[index] = updatedAddress;
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setAddressList(updatedAddresses);
    setEditIndex(null);
  };

  const theme = useTheme();

  useEffect(() => {
    var myHeaders = new Headers();
    const token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${API_URL}/get_address`, requestOptions)
      .then((response) => response.json())
      .then((address) => {
        setAddress(address.data)
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
    {address.length >= 0 ? (address.map((address, index) => (
        <Box
          key={index}
          sx={{
            my: 3,
            mx: 2,
            maxWidth: "100%",
            border: "1px solid gray",
            borderRadius: "10px",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", textAlign: "center" }}>
            <Grid container>
              <Grid item xs display={"flex"}>
                <Typography gutterBottom variant="p" component="div">
                  <Radio
                    checked={index === selectedAddress}
                    onChange={() => handleSelect(index)}
                    value={index}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  {address.city_name}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    height: "22px",
                    width: "auto",
                    ml: 1,
                    mt: 1,
                  }}
                >
                  {address.type}
                </Button>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => handleEdit(index)}
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    mr: 1,
                    borderRadius: 2,
                    "&:hover": {
                      background: "green",
                    },
                  }}
                >
                  <EditOutlined sx={{ fontSize: "large" }} />
                </IconButton>

                <Backdrop open={editIndex === index} sx={{ zIndex: 1000 }}>
                  <Box
                    sx={{
                      background: theme.palette.background.box,
                      width: "1000px",
                      borderRadius: "10px",
                      padding: 3,
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      marginBottom={2}
                    >
                      <Typography variant="h6">Update Address</Typography>
                      <IconButton onClick={handleEditClose}>
                        <CloseRounded />
                      </IconButton>
                    </Box>
                    <Divider />
                    {/* Render the UpdateAddress component with the appropriate address */}
                    {editIndex === index && (
                      <UpdateAddress
                        address={address}
                        addressUpdate={handleUpdate}
                        index={index}
                      />
                    )}
                  </Box>
                </Backdrop>

                <IconButton
                  aria-label="delete"
                  size="small"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: 2,
                    "&:hover": {
                      background: "red",
                    },
                  }}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteOutline sx={{ fontSize: "large" }} />
                </IconButton>
                <Backdrop open={deleteIndex === index}>
                  <Box sx={{ background: "white", p: 4 }}>
                    <Typography>
                      Are You Sure You Want to Delete This Address?
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteAddress(index)}
                    >
                      Delete
                    </Button>
                    <Button onClick={handleDeleteClose}>Close</Button>
                  </Box>
                </Backdrop>
              </Grid>
            </Grid>
          </Box>
          <Typography color="text.secondary" variant="body2">
            {address.area}
          </Typography>
        </Box>
      ))) : (<div>No Address Found</div>)}
      
    </>
  );
};
