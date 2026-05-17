// Navbar.jsx - Upgraded for Ultimate Disorientation
import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [loginText, setLoginText] = useState('Login')
  const [invert, setInvert] = useState(false)
  const [cookieBanner, setCookieBanner] = useState(true)

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
  const handleLinkClick = (e, linkName) => {
    e.preventDefault()
    alert(`Error: The "${linkName}" section has been locked behind a premium subscription. Please look at our logo instead.`)
  }

  // 4. LOG OUT INSTEAD OF LOG IN
  const handleLoginClick = () => {
    alert("Success! You have been logged out of your real-life banking app. Have a nice day.")
  }

  return (
    <>
      <nav
        className="nav"
        style={{
          transition: 'all 0.3s ease',
          transform: invert ? 'rotateX(180deg)' : 'none', // Flips the navbar upside down
          ...(scrolled
            ? {
                borderBottomColor: 'rgba(200,97,42,.15)',
                background: 'rgba(26,23,20,.92)',
                position: 'fixed',
                top: 'auto',
                bottom: 0, // CRIME: Moves to the bottom of the screen when scrolling!
              }
            : {
                position: 'fixed',
                top: 0,
              }),
        }}
      >
        {/* Logo that lies */}
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); alert("Why are you clicking the logo? It doesn't love you."); }}>
          Food<span>Slow</span> {/* Changed from Fast */}
        </a>

        {/* Links that lead nowhere */}
        <ul className="nav-links">
          <li>
            <a href="#features" onClick={(e) => handleLinkClick(e, 'Features')}>
              Unfeatures
            </a>
          </li>
          <li>
            <a href="#reviews" onClick={(e) => handleLinkClick(e, 'Reviews')}>
              Fake Reviews
            </a>
          </li>
          <li>
            <a href="#cta" onClick={(e) => handleLinkClick(e, 'Pricing')}>
              Overpricing
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
              // The close button shifts randomly when hovered
              e.target.style.marginLeft = `${Math.random() * 200}px`;
            }}
            style={{ marginLeft: '10px', background: '#000', color: '#fff', border: 'none', padding: '2px 8px', cursor: 'pointer' }}
          >
            I Accept Everything Forever
          </button>
        </div>
      )}
    </>
  )
}