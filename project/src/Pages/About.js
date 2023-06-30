import React, { useEffect } from 'react'
import AboutPage from '../Components/Reusable/AboutPage'
import Layout from '../Components/layout/Layout'

const About = () => {
  useEffect(()=>{
    document.title = "about | eDemand"
  },[])
  return (
    <div>
        <AboutPage />
    </div>
  )
}

export default About