import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Heading from "./Heading";
import { useTheme } from '@mui/material/styles';
import Pnavigation from "./Pnavigation";
import { t } from "i18next";
import Layout from "../../layout/Layout";

function createData(id, method, date, amount, status) {
  return { id, method, date, amount, status };
}

const ProfilePayment = () => {
  document.title = "Profile - Payment | eDemand";

  const [data, setData] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    const token = localStorage.getItem("Token");
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append(
      "Cookie",
      "ci_session=2lrqfaokvv1lqe6fkgdkd92jjjjq0h25; csrf_cookie_name=832e7d562e94c023db5aa9dc4c69f96c"
    );

    var formdata = new FormData();
    formdata.append("partner_id", "5");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://edemand.wrteam.me/api/v1/get_transactions", requestOptions)
      .then((response) => response.json())
      .then((response) => setData(response.data))
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);

  const theme = useTheme();
  return (
    <Layout>
      <Container>
        <Grid container spacing={3} sx={{ padding: 0 }}>
          <Grid item xs={12} md={4}>
            <Pnavigation />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                mt: 3,
                background: theme.palette.background.box,
                borderRadius: "10px",
                height: "580px",
              }}
            >
              <Heading heading={t("Payment")} />
              <Box sx={{ p: 3 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ background: "blue" }}>
                        <TableCell sx={{ color: "white" }}>
                          Transaction Id
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="start">
                          Payment Method
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="start">
                          Transaction Date
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="start">
                          Amount
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="start">
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data != "" ? (
                        <>
                          {data.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.id}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ textAlign: "start" }}
                              >
                                {row.method}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ textAlign: "start" }}
                              >
                                {row.date}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ textAlign: "start", color: "green" }}
                              >
                                {row.amount}
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ textAlign: "start", color: "green" }}
                              >
                                {row.status}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ) : (
                        <>
                          <TableRow>
                            <TableCell colSpan={15} align="center">
                              No Transaction Found
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProfilePayment;
