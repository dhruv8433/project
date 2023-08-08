import React from 'react'
import AboutPage from '../Components/Reusable/Sections/AboutPage'
import Layout from '../Components/layout/Layout'

const About = () => {
  document.title = "About | eDemand"
  return (
    <Layout>
      <div>
        <AboutPage />
      </div>
    </Layout>
  )
}

export default About