import { useTheme } from "@emotion/react";
import { ArrowRightAltOutlined, Done } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import slugify from "slugify";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Partner = ({ partner }) => {
  const theme = useTheme();
  const slug = slugify(partner.company_name, {
    lower: true, // Convert the slug to lowercase
  });

  const isLogin = localStorage.getItem("isLoggedIn");

  const handle = (item) => {
    const bookData = JSON.parse(localStorage.getItem("bookmark")) || [];
    bookData.push(item);
    localStorage.setItem("bookmark", JSON.stringify(bookData));

    isLogin ? <></> : toast.error("Please Login !");
  };

  //we have to apply some logic for remove data from bookmark
  const handleremove = (item) => {
    const bookData = localStorage.getItem("bookmark") || [];
    bookData.pop(item);
    localStorage.removeItem("bookmark", item);
    toast.info("Removed from bookmark")
  };

  return (
    <Card
      key={partner.id}
      sx={{
        maxWidth: 345,
        display: "inline-block",
      }}
    >
      <Box
        sx={{
          mt: "1px",
          ml: "282px",
          position: "absolute",
          borderRadius: "6px",
          background: "black",
        }}
      >
        <Checkbox
          size="small"
          sx={{ color: "white" }}
          {...label}
          icon={<BookmarkBorderIcon />}
          checkedIcon={
            isLogin ? (
              <BookmarkIcon onClick={() => handleremove(partner)} />
            ) : (
              <BookmarkBorderIcon
                onClick={() => handle(partner)}
                sx={{ color: "white" }}
              />
            )
          }
          onClick={(event) => {
            event.stopPropagation();
            handle(partner);
          }}
        />
      </Box>
      <Link
        key={partner.id}
        to={"/providers/services/" + partner.id + "/" + slug}
        style={{ textDecoration: "none" }}
      >
        <CardMedia sx={{ height: 240 }} image={partner.banner_image} />

        <CardMedia
          sx={{
            height: 80,
            width: 80,
            border: "5px solid white",
            borderRadius: "50px",
            cursor: "pointer",
            marginTop: "-40px",
            marginLeft: "35%",
          }}
          image={partner.image}
        />
        <Box textAlign={"center"}>
          <CardContent>
            <Typography
              gutterbottom
              variant="h5"
              component="div"
              textAlign={"center"}
            >
              {partner.company_name}
            </Typography>
            <Rating
              name="read-only"
              value={partner.number_of_ratings}
              readOnly
              sx={{ alignContent: "center" }}
            />
            <Button variant="contained" startIcon={<Done />}>
              {partner.number_of_orders} Order Completed
            </Button>

            <div className="lines" style={{ paddingTop: "30px" }}>
              <hr />
            </div>
            <Box mt={3}>
              <NavLink
                to={"/providers/services/" + partner.partner_id + "/" + slug}
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  textDecoration: "none",
                  color: theme.palette.color.navLink,
                  fontSize: 16,
                  // position: "absolute", // Added position absolute
                  right: 0, // Added right position
                  top: "50%", // Added top position
                  transform: "translateY(-50%)", // Added transform property
                  transition: "transform 0.3s", // Added transition property
                  "&:hover": {
                    transform: "translateX(5px) translateY(-50%)", // Added transform property on hover
                  },
                  zIndex: 1,
                }}
              >
                View All Services <ArrowRightAltOutlined />
              </NavLink>
            </Box>
          </CardContent>
        </Box>
      </Link>
    </Card>
  );
};

export default Partner;
