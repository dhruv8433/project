import React, { Children } from 'react'
import Navigation from '../Components/Navigation'
import Footer from '../Components/Footer'

const Layout = () => {
  return (
    <div>
        <Navigation />
        <div>
            {Children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout