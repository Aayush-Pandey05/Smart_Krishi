import React from 'react'
import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <FeatureCard/>
      <WhyChooseUs/>
      <Footer/>
    </div>
  )
}

export default Home
