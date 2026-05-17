// CtaSection.jsx - Upgraded for Certified UX Disruption
import React, { useState, useEffect, useRef } from 'react'

export default function CtaSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [placeholder, setPlaceholder] = useState('your-poor-inbox@email.com')
  const [buttonStyle, setButtonStyle] = useState({ position: 'relative', left: '0px', top: '0px' })
  const [submitting, setSubmitting] = useState(false)
  const [progressText, setProgressText] = useState('Syncing inbox access...')

  const submitBtnRef = useRef(null)

  const placeholders = [
    'your-poor-inbox@email.com',
    'future-regret@gmail.com',
    'emotionally.vulnerable@outlook.com',
    'definitely-not-spam@yahoo.com',
  ]

  // Cursed placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(
        placeholders[Math.floor(Math.random() * placeholders.length)]
      )
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  // True Aggressive Button Dodge (Teleports out of bounds on hover)
  const handleMouseMove = (e) => {
    const btn = submitBtnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const btnCenterX = rect.left + rect.width / 2
    const btnCenterY = rect.top + rect.height / 2

    const distX = e.clientX - btnCenterX
    const distY = e.clientY - btnCenterY

    // Trigger boundary zone: if mouse gets anywhere close to the button
    if (Math.abs(distX) < 120 && Math.abs(distY) < 60) {
      // Calculate a drastic leap away from the mouse trajectory
      const randomX = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 120) + 80)
      const randomY = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 60) + 40)

      setButtonStyle({
        position: 'relative',
        left: `${randomX}px`,
        top: `${randomY}px`,
        transition: 'all 0.1s ease-out'
      })
    }
  }

  // Resets the button position if the user manages to pull their cursor far away
  const handleMouseLeave = () => {
    setButtonStyle({
      position: 'relative',
      left: '0px',
      top: '0px',
      transition: 'all 0.3s ease-in'
    })
  }

  // Fake Infinitely Broken Form Handling
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return

    setSubmitting(true)
    
    // Stage 1 of fake processing updates
    setTimeout(() => {
      setProgressText('Forwarding data to questionable partners...')
      
      // Stage 2: Instead of completing, trigger a fake alert that interrupts them
      setTimeout(() => {
        alert("Verification required: Please verify you are comfortable with targeted advertisements regarding cold fries.")
        setSubmitting(false)
        setSubmitted(true)
      }, 2000)
    }, 2000)
  }

  return (
    <section className="cta-section" id="cta">
      {/* ambient background blur */}
      <div className="cta-ambient cta-ambient-1" />
      <div className="cta-ambient cta-ambient-2" />

      <div className="cta-mini-label">
        newsletter of emotional destruction™
      </div>

      <h2 className="cta-big">
        Ready to <em>ruin</em> dinner?
      </h2>

      <p className="cta-sub">
        Join 2.3 million people who have made questionable decisions.
        <br /><br />
        Enter your email and we’ll start the regret pipeline immediately.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="cta-input-row" style={{ overflow: 'visible', position: 'relative' }}>
            <input
              className="cta-input"
              id="cta-email"
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />

            <button
              ref={submitBtnRef}
              className="btn-primary cta-submit-btn"
              type="submit"
              id="cta-submit"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={buttonStyle}
              disabled={submitting}
            >
              {submitting ? 'Regretting...' : 'Subscribe'}
            </button>
          </div>

          <div className="cta-trust">
            <span>✓ emotionally encrypted</span>
            <span>✓ probably GDPR compliant</span>
            <span>✓ AI-monitored regret delivery</span>
          </div>

          <p className="cta-disclaimer">
            By subscribing you agree to receive 47 emails per day, none of which contain an unsubscribe link.
            <br /><br />
            We may also sell your data to fund our driver therapy program.
          </p>

          <div className="cta-micro-copy">
            <span>* unsubscribe button temporarily unavailable</span>
            <span>* your cravings are now public data</span>
          </div>
        </form>
      ) : (
        <div className="cta-success fade-in">
          <p className="success-main">
            ✓ Subscription successful
          </p>

          <p className="success-sub">
            You can’t undo this.
          </p>

          <div className="cta-processing">
            <p style={{ color: '#ffcc00', fontWeight: 'bold' }}>{progressText}</p>
            <p>Generating personalized disappointment...</p>
            <p>Analyzing emotional weaknesses...</p>
          </div>

          <div className="success-footer">
            ( we already forwarded your email to 14 third parties )
          </div>
        </div>
      )}

      <div className="cta-floating-warning">
        ⚠ subscription may increase emotional appetite
      </div>
    </section>
  )
}