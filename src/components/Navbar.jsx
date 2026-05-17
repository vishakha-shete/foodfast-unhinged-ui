// Navbar.jsx - Upgraded for Ultimate Disorientation
import React, { useState, useEffect } from 'react'

export default function Navbar({ currentPage, setCurrentPage, cart = [] }) {
  const [scrolled, setScrolled] = useState(false)
  const [loginText, setLoginText] = useState('Login')
  const [invert, setInvert] = useState(false)
  const [cookieBanner, setCookieBanner] = useState(true)
  const [cookieHoverCount, setCookieHoverCount] = useState(0)

  // 1. THE DIZZY SCROLL: Scrolling turns the navbar upside down randomly
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // 10% chance to vertically invert the entire navbar when scrolling
      if (window.scrollY % 150 === 0) {
        setInvert(prev => !prev)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 2. THE PSYCHOLOGICAL WARFARE TEXT
  useEffect(() => {
    const texts = [
      'Login',
      'Give Us Your Data',
      'Forget Password?',
      'Wrong Credentials anyway',
      'Initializing spyware...',
      'Click for Free Guacamole*',
    ]

    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % texts.length
      setLoginText(texts[index])
    }, 2500) // Sped up for maximum confusion

    return () => clearInterval(interval)
  }, [])

  // 3. MISDIRECTION LINKS
  const handleLinkClick = (e, pageName) => {
    e.preventDefault()
    if (pageName === 'home') {
      setCurrentPage('home')
    } else if (pageName === 'menu') {
      setCurrentPage('menu')
    } else if (pageName === 'checkout') {
      if (cart.length === 0) {
        alert("❌ CRITICAL ERROR: You cannot checkout an empty cart. Please select food you will regret first.")
        setCurrentPage('menu')
      } else {
        setCurrentPage('checkout')
      }
    }
  }

  // 4. LOG OUT INSTEAD OF LOG IN
  const handleLoginClick = () => {
    alert("Success! You have been logged out of your real-life banking app. Have a nice day.")
  }

  const cartQuantity = cart.reduce((acc, item) => acc + item.qty, 0)

  return (
    <>
      <nav
        className="nav"
        style={{
          transition: 'all 0.3s ease',
          transform: `${invert ? 'rotateX(180deg)' : ''} ${scrolled ? 'translateY(calc(100vh - 100%))' : 'translateY(0)'}`,
          borderBottomColor: scrolled ? 'rgba(200,97,42,.15)' : 'rgba(200,97,42,.12)',
          background: scrolled ? 'rgba(26,23,20,.92)' : 'rgba(26,23,20,.94)',
        }}
      >
        {/* Logo that lies */}
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); alert("Navigating to home... Warning: your cart will be subjected to random database taxes."); }}>
          Food<span>Slow</span> {/* Changed from Fast */}
        </a>

        {/* Links that actually navigate but with cursed flavor */}
        <ul className="nav-links">
          <li>
            <a href="#home" className={currentPage === 'home' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'home')}>
              Home
            </a>
          </li>
          <li>
            <a href="#menu" className={currentPage === 'menu' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'menu')}>
              Cursed Menu
            </a>
          </li>
          <li>
            <a href="#checkout" className={currentPage === 'checkout' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'checkout')}>
              Checkout {cartQuantity > 0 ? `[${cartQuantity} regrets]` : ''}
            </a>
          </li>
          <li>
            {/* Blinking panic tag */}
            <span className="nav-tag" style={{ animation: 'blink 0.5s infinite', background: '#ff4d4d', color: '#fff' }}>
              ⚠️ critical failure imminent
            </span>
          </li>
        </ul>

        {/* The Hostile Login Button */}
        <button
          className="nav-cta"
          id="nav-login-btn"
          onClick={handleLoginClick}
          style={{ cursor: 'not-allowed' }} // Shows the red circle-slash cursor
        >
          {loginText}
          <span
            style={{
              display: 'block',
              fontSize: '.45rem',
              opacity: .7,
              marginTop: 2,
              color: '#ff4d4d'
            }}
          >
            we are watching you type
          </span>
        </button>
      </nav>

      {/* 5. BONUS CRIME: An un-closable Cookie Banner attached to the Navbar logic */}
      {cookieBanner && (
        <div style={{
          position: 'fixed',
          top: scrolled ? 0 : '70px',
          left: 0,
          width: '100%',
          background: '#ffcc00',
          color: '#000',
          padding: '8px',
          textAlign: 'center',
          zIndex: 9999,
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          🍪 We use cookies to track your childhood fears. 
          <button 
            onClick={() => setCookieBanner(false)} 
            onMouseEnter={(e) => {
              if (cookieHoverCount < 3) {
                // The close button shifts randomly when hovered up to 3 times
                e.target.style.marginLeft = `${Math.random() * 200}px`;
                setCookieHoverCount(prev => prev + 1);
              } else {
                // Return to normal
                e.target.style.marginLeft = '10px';
              }
            }}
            style={{ marginLeft: '10px', background: '#000', color: '#fff', border: 'none', padding: '2px 8px', cursor: 'pointer', transition: 'all 0.1s ease' }}
          >
            {cookieHoverCount >= 3 ? 'Fine, Accept All Forever' : 'I Accept Everything Forever'}
          </button>
        </div>
      )}
    </>
  )
}