import React from 'react'
import ContactForm from '../Components/Reusable/ContactForm'
import Layout from '../Components/layout/Layout'

const Contact = () => {
  document.title = "Contact | eDemand"

  return (
    <div>
        <ContactForm />
    </div>
  )
}

export default Contact