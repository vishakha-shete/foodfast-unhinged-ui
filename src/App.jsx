import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'

export default function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero />
      <TrustStrip />
      <Features />
      <Testimonials />
      <CtaSection />
      <Footer />
    </>
  )
}