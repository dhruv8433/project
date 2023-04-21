import React from 'react'
import Provider from "./Provider";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Container, Grid } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Providers = () => {
    return (
        <div>
            <Container maxWidth={"lg"}>
                <Grid container marginTop={"6%"} textAlign={"center"}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item><Provider /></Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item><Provider /></Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item><Provider /></Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item><Provider /></Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item><Provider /></Item>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Item><Provider /></Item>
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}


export default Providers