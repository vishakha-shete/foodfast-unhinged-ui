import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import FloatingChaos from './components/FloatingChaos'
import MenuPage from './components/MenuPage'
import CheckoutPage from './components/CheckoutPage'
import SuccessPage from './components/SuccessPage'
import SoundEmoji from './components/SoundEmoji'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [currentPage])

  // Konami Code Secret
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      // Allow lowercase or uppercase b/a
      if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          document.body.classList.add('nightmare-mode');
          alert("🚨 NIGHTMARE MODE ACTIVATED. MAY GOD HAVE MERCY ON YOUR SOUL.");
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (page) => {
    setPageLoading(true)
    const messages = [
      'Processing click with low-efficiency algorithms...',
      'Rerouting through secure microwave link...',
      'Consulting with spiritual advisors...',
      'Encrypting credentials with ROT13...',
      'Selling user telemetry to highest bidder...',
      'Double checking if you are still hungry...',
      'Verifying creditworthiness with generic synthetics...'
    ]
    setLoadingMessage(messages[Math.floor(Math.random() * messages.length)])
    
    setTimeout(() => {
      setCurrentPage(page)
      setPageLoading(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 1000)
  }

  return (
    <>
      <CursorGlow />
      <FloatingChaos />
      <SoundEmoji />
      <Navbar currentPage={currentPage} setCurrentPage={navigateTo} cart={cart} />
      
      {pageLoading && (
        <div className="chaos-page-loader">
          <div className="chaos-page-loader-spinner"></div>
          <div className="chaos-page-loader-text">{loadingMessage}</div>
        </div>
      )}

      {currentPage === 'home' && (
        <>
          <Hero navigateTo={navigateTo} />
          <TrustStrip />
          <Features />
          <Testimonials />
          <CtaSection />
          <Footer />
        </>
      )}

      {currentPage === 'menu' && (
        <>
          <MenuPage cart={cart} setCart={setCart} navigateTo={navigateTo} />
          <Footer />
        </>
      )}

      {currentPage === 'checkout' && (
        <>
          <CheckoutPage cart={cart} setCart={setCart} navigateTo={navigateTo} />
        </>
      )}

      {currentPage === 'success' && (
        <>
          <SuccessPage navigateTo={navigateTo} setCart={setCart} />
        </>
      )}
    </>
  )
}