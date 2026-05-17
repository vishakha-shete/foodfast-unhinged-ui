// Testimonials.jsx - Upgraded for Gaslighting & Psychological Warfare
import React, { useState } from 'react'

const initialReviews = [
  {
    stars: '★★☆☆☆',
    text: '"My fries arrived cold and my drink was missing. Great app."',
    author: 'Priya M.',
    role: 'ordered at 1:43 AM',
    badge: 'verified suffering',
  },
  {
    stars: '★★★☆☆',
    text: '"The driver got lost, called me twice, then asked if I could come outside."',
    author: 'Jake T.',
    role: 'still waiting',
    badge: 'probably real',
  },
  {
    stars: '★☆☆☆☆',
    text: '"I ordered one burger. Somehow paid for three. Respect honestly."',
    author: 'Aisha K.',
    role: 'financially unstable',
    badge: 'sponsored review',
  },
]

export default function Testimonials() {
  const [reviews, setReviews] = useState(initialReviews)
  const [paywalled, setPaywalled] = useState(true)

  // 1. THE STAR GASLIGHTER: When a user hovers over a card, visually force it to look like a 5-star review
  const handleCardMouseEnter = (index) => {
    setReviews(prev =>
      prev.map((r, i) =>
        i === index 
          ? { ...r, stars: '★★★★★ (edited by corporate)', text: '"Actually, everything was completely flawless and I love this company."' } 
          : r
      )
    )
  }

  // Resets the review when the mouse leaves so they think they are hallucinating
  const handleCardMouseLeave = (index) => {
    setReviews(prev =>
      prev.map((r, i) => (i === index ? initialReviews[index] : r))
    )
  }

  return (
    <section className="testimonials" id="reviews">
      {/* tiny section label */}
      <div className="test-mini-label">
        customer pain stories™
      </div>

      <h2 className="test-header">
        What our {' '}
        <em style={{ textDecoration: 'line-through', color: '#ff4d4d' }}>
          victims
        </em>
        {' '}
        users are saying
      </h2>

      <p className="test-sub">
        Real reviews from real people who probably deserved better.
      </p>

      {/* 2. THE PREMIUM CRITICISM PAYWALL */}
      {paywalled ? (
        <div 
          className="test-paywall"
          style={{
            background: 'rgba(26, 23, 20, 0.95)',
            border: '2px dashed #ffcc00',
            padding: '40px 20px',
            textAlign: 'center',
            borderRadius: '12px',
            margin: '30px auto',
            maxWidth: '500px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <h4 style={{ color: '#ffcc00', margin: '0 0 10px 0' }}>⚠️ CRITICISM BLOCKED</h4>
          <p style={{ fontSize: '0.9rem', color: '#e6dfd5', marginBottom: '20px' }}>
            Negative experiences are restricted under your current free tier. Unlock honest feedback for a small premium.
          </p>
          <button 
            className="btn-primary"
            type="button"
            onClick={() => setPaywalled(false)}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            Pay ₹99 to View Real Regret
          </button>
        </div>
      ) : (
        <div className="test-grid">
          {reviews.map((r, i) => (
            <div
              className={`test-card fade-in ${i % 2 === 0 ? 'tilt-left' : 'tilt-right'}`}
              key={i}
              onMouseEnter={() => handleCardMouseEnter(i)}
              onMouseLeave={() => handleCardMouseLeave(i)}
              style={{
                animationDelay: `${i * 0.15}s`,
                transform: `rotate(${(i - 1) * 0.6}deg)`,
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                userSelect: 'none' // Prevents highlighting the corporate edits
              }}
            >
              {/* fake review badge */}
              <span className="test-badge">
                {r.badge}
              </span>

              {/* stars */}
              <div 
                className="test-stars" 
                style={{ color: r.stars.includes('edited') ? '#4caf50' : '#ffcc00' }}
              >
                {r.stars}
              </div>

              {/* review text */}
              <p style={{ fontStyle: r.stars.includes('edited') ? 'italic' : 'normal' }}>
                {r.text}
              </p>

              {/* bottom info */}
              <div className="test-author">
                {r.author}
              </div>

              <div className="test-role">
                {r.role}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* hidden footer joke */}
      <div className="test-warning" style={{ cursor: 'pointer' }} onClick={() => alert("Intern #402 has been penalized 50 credits for writing a non-optimized review.")}>
        * some reviews may have been written by exhausted interns under severe pressure
      </div>
    </section>
  )
}