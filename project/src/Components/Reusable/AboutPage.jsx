import React from 'react';
import { Breadcrumbs, Container, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { AboutList } from './Aboutparagraph';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router';

function AboutPage() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 1, marginTop: 1}}>
        <Link sx={{cursor: "pointer", textDecoration: "none"}} color="inherit" onClick={()=>navigate("/")}>
          Home
        </Link>
        <Typography color="text.primary">About</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        About Us
        
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src="https://placeimg.com/640/480/tech" alt="technology" style={{ width: '100%',maxHeight: "500px", objectFit: "cover", borderRadius: "10px"}} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
           Know About Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada, massa eu aliquet convallis,
            lectus orci accumsan felis, eu lacinia enim arcu non mi. Etiam aliquam, massa vel hendrerit vulputate,
            enim nibh tincidunt nunc, a pharetra ipsum turpis a lectus. Sed sit amet felis euismod, egestas leo eget,
            malesuada enim. Integer tempor, nulla at ornare elementum, urna sapien dictum mi, eget fringilla elit
            elit eu metus.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Vestibulum luctus, massa ac suscipit consequat, sapien neque porta dui, at faucibus nisi dolor non ante.
            Nulla quis libero ac lectus accumsan vestibulum. Quisque lobortis eget est quis luctus. Proin bibendum
            euismod sapien, eget sagittis quam commodo sit amet. Ut euismod tristique dui in eleifend. Praesent
            aliquet elit elit, eu viverra dui rutrum sed.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nulla faucibus ligula vel enim tincidunt mollis. Duis commodo est eros, eget tristique tellus auctor ac.
            Fusce aliquet turpis eu libero lacinia, at iaculis sapien facilisis. Donec fermentum, velit id interdum
            gravida, lorem felis tincidunt erat, eu suscipit felis est non nisi. Sed non quam non purus consequat
            egestas ac vitae lorem. Suspendisse potenti. In at neque odio. Suspendisse potenti.
          </Typography>
          <AboutList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutPage;

