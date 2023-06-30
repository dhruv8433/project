import React from "react";
import Provider from "./Provider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Grid } from "@mui/material";

import { useNavigate } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.provider,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  border: 0,
}));

const Providers = () => {
  const navigate = useNavigate();
  return (
    <div style={{display: "flex", justifyContent: "space-around"}}>
      <Container maxWidth={"lg"}>
        <Grid
          container
          sx={{
            borderRadius: "10px",
            display: "flex",
          }}
          marginTop={"2%"}
          marginBottom={"6%"}
          boxShadow={"none"}
        >
          <Grid item xs={12}>
            <Item>
              <Provider />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Providers;
