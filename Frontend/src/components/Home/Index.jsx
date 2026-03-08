import React from 'react'
import Navbar from '../Navbar/Index.jsx'
import Footer from '../Footer/Index.jsx'
import Star from '../Star/Index.jsx'
import AppUsing from '../AppUsing/Index.jsx'
import StartingPage from '../StartingPage/Index.jsx'

const Index = () => {
  return (
    <div>
      <Navbar />
      <StartingPage />
      <AppUsing />
      <Star />
      <Footer />
    </div>
  )
}

export default Index
