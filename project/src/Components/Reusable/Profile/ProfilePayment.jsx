import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ProfileNavigation from "./ProfileNavigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Heading from "./Heading";
import { useTheme } from "@emotion/react";
import Pnavigation from "./Pnavigation";

function createData( id,method,date, amount,status) {
  return {  id, method, date, amount, status };
}

const rows = [
  createData("#pay_KaGu6fhrgu", "Rozorpay", "04-jan-2023" , "$2000.3" , "success"),
  createData("#pay_KaGu6fhrgv", "Rozorpay", "04-jan-2023" , "$2000.3" , "success"),
  createData("#pay_KaGu6fhrgw", "Rozorpay", "04-jan-2023" , "$2000.3" , "success"),
  createData("#pay_KaGu6fhrgx", "Rozorpay", "04-jan-2023" , "$2000.3" , "success"),
  createData("#pay_KaGu6fhrgy", "Rozorpay", "04-jan-2023" , "$2000.3" , "success"),
];

const ProfilePayment = () => {
  document.title = "profile - payment | eDemand"

  const theme = useTheme()
  return (
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
            <Heading heading="Payment"/>
            <Box sx={{p: 3}}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ background: "blue" }}>
                      <TableCell sx={{color:"white"}}>Transaction Id</TableCell>
                      <TableCell sx={{color:"white"}} align="start">Payment Method</TableCell>
                      <TableCell sx={{color:"white"}} align="start">Transaction Date</TableCell>
                      <TableCell sx={{color:"white"}} align="start">Amount</TableCell>
                      <TableCell sx={{color:"white"}} align="start">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right" sx={{textAlign: "start"}}>{row.method}</TableCell>
                        <TableCell align="right" sx={{textAlign: "start"}}>{row.date}</TableCell>
                        <TableCell align="right" sx={{textAlign: "start", color:"green"}}>{row.amount}</TableCell>
                        <TableCell align="right" sx={{textAlign: "start", color:"green"}}>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePayment;
