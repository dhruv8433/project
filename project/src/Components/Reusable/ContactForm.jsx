import {
  AccessTime,
  AlternateEmail,
  Call,
  Label,
  LocationCity,
  LocationOn,
  LocationOnOutlined,
  LockClock,
  Mail,
  Map,
  PunchClock,
  Timeline,
  Watch,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormLabel,
  Grid,
  Link,
  List,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";


const ContactForm = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginBottom: 1, marginTop: 1 }}
        >
           <Link sx={{cursor: "pointer", textDecoration: "none"}} color="inherit" onClick={()=>navigate("/")}>
          Home
        </Link>
          <Typography color="text.primary">Contact</Typography>
        </Breadcrumbs>
        <Typography variant="h4" gutterBottom>
          <>Contact Us</>
        </Typography>

        <Grid
          container
          spacing={3}
          borderRadius={"10px"}
          marginTop={1}
          sx={{ background: theme.palette.background.box }}
        >
          {/* Grid settign for left navigation/section */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box sx={{ padding: { xs: "16px", md: "20px" } }}>
              <Typography variant="h6" color={"blue"} fontSize={16}>
                Let's Talk
              </Typography>
              <Typography variant="h5" gutterBottom>
                <strong>Get In Touch With Us!</strong>
              </Typography>

              {/* Contact Menu */}
              <Box display={"flex"} marginBottom={3} marginTop={3}>
                <Call
                  sx={{
                    height: "30px",
                    width: "30px",
                    border: "2px solid",
                    p: 1,
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
                <Box ml={2}>
                  <Typography variant="p" color={"blue"}>
                    Let's Talk
                  </Typography>
                  <Typography
                    variant="h6"
                    fontSize={18}
                    fontWeight={400}

                  >
                    +91 01234 56789
                  </Typography>
                </Box>
              </Box>
              <hr />

              <Box display={"flex"} marginBottom={3} marginTop={3}>
                <AlternateEmail
                  sx={{
                    height: "30px",
                    width: "30px",
                    border: "2px solid",
                    p: 1,
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
                <Box ml={2}>
                  <Typography variant="p" color={"blue"}>
                    Quick Email
                  </Typography>
                  <Typography
                    variant="h6"
                    fontSize={18}
                    fontWeight={400}

                  >
                    info@edemand.com
                  </Typography>
                </Box>
              </Box>
              <hr />

              <Box display={"flex"} marginBottom={3} marginTop={3}>
                <LocationOnOutlined
                  sx={{
                    height: "30px",
                    width: "30px",
                    border: "2px solid",
                    p: 1,
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
                <Box ml={2}>
                  <Typography variant="p" color={"blue"}>
                    Office Address
                  </Typography>
                  <Typography
                    variant="h6"
                    fontSize={18}
                    fontWeight={400}

                  >
                    Time Square Empire Time <br /> Square Empire, Bhuj, Gujrat,{" "}
                    <br /> 370001{" "}
                  </Typography>
                </Box>
              </Box>
              <hr />

              <Box display={"flex"} marginBottom={3} marginTop={3}>
                <AccessTime
                  sx={{
                    height: "30px",
                    width: "30px",
                    border: "2px solid",
                    p: 1,
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "5px",
                  }}
                />
                <Box ml={2}>
                  <Typography variant="p" color={"blue"}>
                    Opening Houres
                  </Typography>
                  <Typography
                    variant="h6"
                    fontSize={18}
                    fontWeight={400}
                  >
                    9:00 AM to 7:00 PM
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* grid setting for right navigation/section  */}
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            sx={{
              borderLeft: "2px solid lightgray",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Box
                component="form"
                sx={{
                  padding: { xs: "16px", md: "32px" },
                  marginTop: 8,
                  marginLeft: { xs: 0 },
                }}
                height={"500px"}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                marginTop={10}
              >
                <Typography variant="h3" display={{ xs: "block", md: "none" }}>
                  Contact us{" "}
                </Typography>
                <Box display={{ xs: "none", md: "flex" }}>
                  <Typography
                    justifyContent={"start"}
                    variant="h6"
                    fontSize={16}
                  >
                    Name
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    marginLeft={{ xs: 10, md: 39 }}
                    variant="h6"
                    fontSize={16}
                  >
                    Email
                  </Typography>
                </Box>

                <Box
                  sx={{ display: { xs: "block", md: "flex" }, marginBottom: 6 }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="name"
                    placeholder="Enter Name"
                    variant="outlined"
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      marginBottom: { xs: 4, md: 0 },
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    placeholder="Enter Email"
                    variant="outlined"
                    sx={{
                      marginLeft: { xs: 0, md: 1 },
                      backgroundColor: theme.palette.background.paper,
                    }}
                  />
                </Box>

                <Typography
                  justifyContent={"start"}
                  variant="h6"
                  display={{ xs: "none", md: "block" }}
                  fontSize={16}
                >
                  Subject
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  id="email"
                  placeholder="Enter Subject"
                  variant="outlined"
                  sx={{ marginBottom: 6, backgroundColor: theme.palette.background.paper,}}
                />

                <Typography
                  justifyContent={"start"}
                  variant="h6"
                  display={{ xs: "none", md: "block" }}
                  fontSize={16}
                >
                  Message
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Enter Message"
                  variant="outlined"
                  sx={{
                    marginBottom: "16px",
                    backgroundColor: theme.palette.background.paper,
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    marginTop: "16px",
                    marginLeft: { xs: "auto%", md: "78%" },
                    backgroundColor: "#343f53",
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Box>

            {/* contact form for mobile devices  */}
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                marginBottom: 6,
                height:"650px",
                border: "1px solid",
                borderRadius: "10px",
                padding: "8PX",
                marginRight:3
              }}
            >
              <Typography textAlign={"center"} variant="h5">
               <strong> Contact Form </strong>
              </Typography>
              {/* <FormLabel>
                <Label>Contact Form</Label>
              </FormLabel> */}
              <Typography variant="h6"> Name: </Typography>
              <TextField
                fullWidth
                size="small"
                id="name"
                placeholder="Enter Name"
                variant="outlined"
                sx={{
                  backgroundColor: "#f2f1f6",
                  marginBottom: 4,
                }}
              />
              <Typography variant="h6"> Email: </Typography>

              <TextField
                fullWidth
                size="small"
                id="email"
                placeholder="Enter Email"
                variant="outlined"
                sx={{
                  backgroundColor: "#f2f1f6",
                  marginBottom: 4,
                }}
              />
              <Typography variant="h6">Subject:</Typography>

              <TextField
                fullWidth
                size="small"
                id="email"
                placeholder="Enter Subject"
                variant="outlined"
                sx={{ marginBottom: 6, backgroundColor: "#f2f1f6" }}
              />

              <Typography variant="h6">Message:</Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Enter Message"
                variant="outlined"
                sx={{
                  marginBottom: "16px",
                  backgroundColor: "#f2f1f6",
                }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: "16px",
                  float: "right",
                  backgroundColor: "#343f53",
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Map of location Time Square  */}
      <Box marginTop={3} marginBottom={3} sx={{marginLeft: -3}}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.2857315616134!2d69.63917367160323!3d23.232687241309453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39511e6ca04d886d%3A0xd8714f0b27255ba9!2sTime%20Square%20Properties%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1682322988724!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
      </Container>
    </>
  );
};

export default ContactForm;