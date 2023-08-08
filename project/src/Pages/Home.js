import React, { useEffect } from 'react'
import HomePage, { HomePageSmallDevice } from '../Components/Reusable/Sections/HomePage'
import HomeCategory from '../Components/Reusable/Sections/HomeCategory'
import HomeSection from '../Components/Reusable/Sections/HomeSection'
import HomeFinal from '../Components/Reusable/Sections/HomeFinal'
import Layout from '../Components/layout/Layout'

const Home = () => {
  useEffect(() => {
    document.title = "Home | eDemand"
  }, [])  
  return (
    <Layout>
      <HomeFinal />
    </Layout>
  )
}

export default Home