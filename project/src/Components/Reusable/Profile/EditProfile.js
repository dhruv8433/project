import { useTheme } from "@emotion/react";
import { Avatar, Badge, Box, Button, FormLabel, TextField } from "@mui/material";
import { t } from "i18next";
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { toast } from "react-toastify";
import { API_URL } from "../../../config/config";

const EditProfile = () => {
    const theme = useTheme();

    const submite = () => {
        let Myname = document.getElementById("editName").value;
        let email = document.getElementById("editEmail").value;
        let phone = document.getElementById("editPhone").value;

        // console.log(Myname);
        // console.log(email);
        // console.log(phone)

        localStorage.setItem("currentuser", Myname);
        localStorage.setItem("currentemail", email);
        localStorage.setItem("currentphone", phone);

        const contact = localStorage.getItem("ContactInfo");

        var formdata = new FormData();
        formdata.append("mobile", contact);
        formdata.append("country_code", "91");
        formdata.append("username", Myname);
        formdata.append("email", email);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${API_URL}/manage_user`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                toast.success(result.message);
            })
            .catch(error => console.log('error', error));
    };
    return (
        <div>
            <Avatar
                size="lg"
                sx={{
                    height: "80px",
                    width: "80px",
                    border: "5px solid black",
                    borderRadius: "100px",
                    marginTop: "30px",
                    marginBottom: "30px",
                    marginInlineStart: "122px",
                }}
            ></Avatar>
            <Badge>
                <EditRoundedIcon
                    sx={{
                        color: "white",
                        background: "blue",
                        borderRadius: "50px",
                        ml: 23,
                        mt: -9,
                        border: "3px solid white",
                        cursor: "pointer",
                    }}
                />
            </Badge>

            <Box display={"block"}>
                <FormLabel>{t("Name")}</FormLabel>
                <br />
                <form>
                    <TextField
                        id="editName"
                        placeholder="Enter name"
                        size="small"
                        fullWidth
                        variant="outlined"
                        name="name"
                        required
                        sx={{ background: theme.palette.background.input }}
                    />
                    <br />
                    <br />
                    <FormLabel>{t("Email")}</FormLabel>
                    <br />
                    <TextField
                        id="editEmail"
                        placeholder="Enter Email"
                        size="small"
                        fullWidth
                        variant="outlined"
                        name="email"
                        type="email"
                        required
                        sx={{ background: theme.palette.background.input }}
                    />
                    <br />
                    <br />
                    <FormLabel>{t("Phone")}</FormLabel>
                    <br />
                    <TextField
                        id="editPhone"
                        placeholder="Enter Phone"
                        size="small"
                        fullWidth
                        required
                        disabled
                        variant="outlined"
                        sx={{ background: theme.palette.background.input }}
                    />
                    <br />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{ width: "350px" }}
                        onClick={submite}
                    >
                        {t("Save Profile")}
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default EditProfile;
