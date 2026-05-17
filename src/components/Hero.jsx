// Hero.jsx - Upgraded for Maximum Suffering
import React, { useState, useEffect, useCallback, useRef } from 'react'
import AppMockup from './AppMockup'

export default function Hero({ navigateTo }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [orderText, setOrderText] = useState('Order Now')
  const [liveUsers, setLiveUsers] = useState(3492)
  const [clickCount, setClickCount] = useState(0)
  const [evadesCount, setEvadesCount] = useState(0)
  const buttonRef = useRef(null)

  // 1. CONSTANT ANXIETY: The button violently shakes every few seconds
  const jiggle = useCallback(() => {
    setOffset({
      x: (Math.random() - 0.5) * 15, // Increased violent shake
      y: (Math.random() - 0.5) * 15,
    })
  }, [])

  useEffect(() => {
    const i = setInterval(jiggle, 800) // Shakes much faster now
    return () => clearInterval(i)
  }, [jiggle])

  // Fake live users counting down (people giving up)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => Math.max(12, prev - Math.floor(Math.random() * 5)))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // 2. THE TEXT GASLIGHTS THEM: Every click makes it harder to trust reality
  const handleOrderClick = () => {
    setClickCount(prev => prev + 1)
    
    if (evadesCount >= 3) {
      alert("🎉 Evasion threshold bypassed! Redirecting you to the Cursed Menu Page...")
      navigateTo('menu')
      return
    }

    const msgs = [
      'Are you sure?',
      'Processing... jk',
      'Card Declined? Try again',
      'Oops, ordered 5 pizzas instead',
      'Downloading virus...',
      'Error 404: Hunger Not Found',
      'Just close the tab honestly',
      'Fine, click me now!',
    ]
    
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)]
    setOrderText(randomMsg)

    // Trigger a fake alert box just to be evil on every 4th click
    if ((clickCount + 1) % 4 === 0) {
      alert("Confirm that you are not a robot by admitting your fries will be soggy.")
    }
  }

  // 3. TRUE EVIL MAGNET: The button actively runs AWAY from the mouse
  const handleMouseMove = (e) => {
    if (evadesCount >= 3) {
      // Tired out! Let them click it.
      if (orderText !== 'Fine, click me!') {
        setOrderText('Fine, click me!')
      }
      return
    }

    const btn = buttonRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const btnCenterX = rect.left + rect.width / 2
    const btnCenterY = rect.top + rect.height / 2

    const distX = e.clientX - btnCenterX
    const distY = e.clientY - btnCenterY

    // If mouse gets close, the button flees at mach speed
    if (Math.abs(distX) < 150 && Math.abs(distY) < 100) {
      setEvadesCount(prev => {
        const next = prev + 1
        if (next === 1) setOrderText('Wait, come back!')
        if (next === 2) setOrderText('Almost got it...')
        if (next >= 3) setOrderText('Fine, click me!')
        return next
      })

      const escapeX = distX > 0 ? -120 : 120;
      const escapeY = distY > 0 ? -80 : 80;

      btn.style.transform = `translate(${escapeX + offset.x}px, ${escapeY + offset.y}px)`
      btn.style.transition = "transform 0.1s ease-out" // Snappy escape
    }
  }

  const handleMouseLeave = () => {
    if (evadesCount >= 3) return
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(${offset.x}px, ${offset.y}px)`
    }
  }

  // 4. THE GHOST BUTTON CRIME
  const handleSafeClick = () => {
    alert("Error: You clicked 'Trust Us'. We find your lack of suspicion deeply concerning. Deducting ₹50 safety fee.")
  }

  return (
    <section className="hero" id="hero" style={{ cursor: 'wait' }}> {/* Forced permanent loading cursor */}
      <div className="hero-ambient ambient-1" />
      <div className="hero-ambient ambient-2" />

      <div className="hero-left">
        <div className="hero-eyebrow fade-in">
          making dinner worse since 2024
        </div>

        <div className="live-status fade-in">
          ● {liveUsers.toLocaleString()} people currently giving up on their dinner
        </div>

        <h1 className="hero-title fade-in fade-in-d1">
          <span className="strikethrough">
            Fast delivery. Hot food. Great service.
          </span>
          <br />
          Delivering <em className="hero-regret">Regret</em> Extra Warm 🍔
        </h1>

        <p className="hero-sub fade-in fade-in-d2">
          The worst food delivery app ever made.
          <br /><br />
          Cold fries. Wrong addresses. Surprise fees.
          <br /><br />
          Now with 0% customer support.
        </p>

        <div className="hero-buttons fade-in fade-in-d3">
          <div className="btn-wrap">
            <button
              ref={buttonRef}
              className="btn-primary"
              id="order-now-btn"
              onClick={handleOrderClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative', zIndex: 10 }}
            >
              {orderText}
            </button>
            <span className="btn-tiny-label">
              clicking agrees to sell your childhood memories
            </span>
          </div>

          <div className="btn-wrap">
            <button
              className="btn-ghost"
              id="safe-btn"
              onClick={handleSafeClick}
            >
              Trust Us 👍
            </button>
            <span className="btn-tiny-label">
              (do not click this)
            </span>
          </div>
        </div>

        <div className="tiny-disclaimer fade-in fade-in-d4">
          * delivery times are purely fictional and based on vibes
        </div>
      </div>

      <div className="hero-right fade-in fade-in-d4">
        <AppMockup />

        {/* Floating Notifications */}
        <div className="notif notif-1 drift">
          <span className="notif-icon">🚗</span>
          Driver saw a nice dog and stopped to pet it. ETA: Unlikely.
        </div>

        <div className="notif notif-2 float-slow">
          <span className="notif-icon">⚠️</span>
          Your burger is currently in a different time zone.
        </div>

        <div className="notif notif-3 rotate-soft">
          <span className="notif-icon">📍</span>
          Driver is 2 mins away for the last 3 business days.
        </div>

        <div className="notif notif-4 pulse-soft">
          <span className="notif-icon">💳</span>
          Added ₹250 "Breathing Air while Ordering" fee.
        </div>
      </div>
    </section>
  )
}