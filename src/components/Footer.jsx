// Footer.jsx - Upgraded for Final Stage User Hostility
import React, { useState } from 'react'

export default function Footer() {
  const [sinkLevel, setSinkLevel] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  // 1. THE INVISIBLE FLOOD: Every time they hover over the footer, it sinks into the bottom of the screen
  const handleFooterMouseEnter = () => {
    setSinkLevel(prev => Math.min(prev + 35, 140)) // Sinks lower and lower
  }

  // 2. THE REFUND SCAM LINK
  const handleRefundClick = (e) => {
    e.preventDefault()
    alert("💸 REFUND REQUEST RECEIVED: To process your refund, please transfer an additional ₹500 processing fee to our corporate account. Thank you.")
  }

  // 3. THE IMPOSSIBLE SUPPORT DESK
  const handleSupportClick = (e) => {
    e.preventDefault()
    setClickCount(prev => prev + 1)

    if (clickCount < 3) {
      alert(`Connecting to Support... (Queue Position: ${14502 + clickCount * 45})`)
    } else {
      alert("⚠️ CHAT TERMINATED: Our support AI bot has disconnected because it found your tone 'unreasonably hungry'. Please try again next month.")
      setClickCount(0)
    }
  }

  // 4. CAREERS BAIT-AND-SWITCH
  const handleCareersClick = (e) => {
    e.preventDefault()
    alert("Application Received! Your current browser history has been automatically attached as your resume. Welcome to the team.")
  }

  return (
    <footer 
      className="footer"
      onMouseEnter={handleFooterMouseEnter}
      style={{
        transform: `translateY(${sinkLevel}px)`, // Drops down past the viewport edge
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        cursor: 'no-drop', // Changes cursor to a red circle with a line through it
        background: '#1a1714',
        borderTop: '2px solid rgba(200,97,42,.15)',
        padding: '40px 20px'
      }}
    >
      {/* left side */}
      <div className="footer-left">
        <div className="footer-logo" onClick={() => setSinkLevel(0)} style={{ cursor: 'pointer' }}>
          Food<span>Slow</span> {/* Consistency update with the navbar */}
        </div>

        <div className="footer-status">
          making dinner worse since 2024
        </div>
      </div>

      {/* middle */}
      <div className="footer-mid">
        <p>
          © 2026 FoodSlow Inc.
        </p>

        <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>
          Cold food. Wrong orders. Zero accountability.
        </p>

        <p className="footer-small" style={{ fontSize: '9px', opacity: 0.4, lineHeigh: '8px' }}>
          By reading this text you implicitly waive your right to a warm meal, legal representation, or financial compensation for flat soda.
        </p>
      </div>

      {/* right side */}
      <div className="footer-right" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a href="#careers" onClick={handleCareersClick}>
          Careers (unpaid internship)
        </a>

        <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy update: We have sold your current GPS coordinates to an advertising agency specializing in midnight snacks."); }}>
          Privacy (none)
        </a>

        <a href="#refunds" onClick={handleRefundClick} style={{ color: '#ffcc00', fontWeight: 'bold' }}>
          Refund Policy 💸
        </a>

        <a href="#support" onClick={handleSupportClick}>
          Contact Support (AI Bot)
        </a>
      </div>

      {/* tiny hidden joke */}
      <div className="footer-warning" style={{ width: '100%', marginTop: '20px', textAlign: 'center', opacity: 0.5 }}>
        * if your driver is trying their best, please tell them to stop. it isn't working.
      </div>
    </footer>
  )
}