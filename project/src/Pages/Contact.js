import React from 'react'
import ContactForm from '../Components/Reusable/Sections/ContactForm'
import Layout from '../Components/layout/Layout'
const Contact = () => {
  document.title = "Contact | eDemand"
  return (
    <Layout>
      <div>
        <ContactForm />
      </div>
    </Layout>

  )
}

export default Contact