import React, { useEffect } from 'react'
import HomePage, { HomePageSmallDevice } from '../Components/Reusable/HomePage'
import HomeCategory from '../Components/Reusable/HomeCategory'
import { Grid } from '@mui/material'

const Home = () => {
  useEffect(() => {
    document.title = "Home | eDemand"
  }, [])
  return (
    <div>
      {/* calling just two function for home page Homepage contained only image slider with inputs and HomeCategory contianed all services   */}
      <Grid container xs={12} display={{xs: "none", md:"block"}}>
          <HomePage />
      </Grid>
      <Grid container md={12} display={{ xs: "block", md: "none" }}>
        <HomePageSmallDevice />
      </Grid>
      <HomeCategory />
    </div>
  )
}

export default Home