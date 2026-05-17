// TrustStrip.jsx - Upgraded for Fraudulent Metrics & Mathematical Warfare
import React, { useState, useEffect } from 'react'

const initialStats = [
  {
    num: '2,314,801',
    label: 'orders delivered to questionable locations',
    type: 'orders'
  },
  {
    num: '14 min',
    label: 'delivery time shown before checkout',
    type: 'time'
  },
  {
    num: '97%',
    label: 'of users said “never again”',
    type: 'regret'
  },
  {
    num: '4.8 ★',
    label: 'rating given by our own team',
    type: 'rating'
  },
]

export default function TrustStrip() {
  const [stats, setStats] = useState(initialStats)
  const [isThreatening, setIsThreatening] = useState(false)

  // 1. THE INFLATION ENGINE: Live-manipulate stats to make them increasingly chaotic
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats =>
        prevStats.map(s => {
          if (s.type === 'orders') {
            // Unending stream of messy deliveries
            const currentNum = parseInt(s.num.replace(/,/g, ''), 10)
            return { ...s, num: (currentNum + Math.floor(Math.random() * 7)).toLocaleString() }
          }
          if (s.type === 'time') {
            // Delivery clock ticks upwards the longer you browse
            const randomCursedTimes = ['14 min', '48 min', '3.5 days', 'Calculating...', 'Infinity']
            return { ...s, num: randomCursedTimes[Math.floor(Math.random() * randomCursedTimes.length)] }
          }
          if (s.type === 'regret') {
            // Defying the laws of percentages
            const currentPct = parseFloat(s.num)
            const nextPct = currentPct + 0.1
            return { ...s, num: nextPct >= 105 ? '100%' : `${nextPct.toFixed(1)}%` }
          }
          return s // Leave corporate rating pristine
        })
      )
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  // 2. CORPORATE PANIC MODE: Scramble metrics into legal safe-speak if hovered
  const handleMouseEnter = () => {
    setIsThreatening(true)
    setStats(prev =>
      prev.map(s => {
        if (s.type === 'regret') return { ...s, num: '0.0%', label: 'active lawsuits pending' }
        if (s.type === 'time') return { ...s, num: '*Fast*', label: 'subjective interpretation of speed' }
        if (s.type === 'orders') return { ...s, num: 'Classified', label: 'under advice of legal counsel' }
        return s
      })
    )
  }

  // Restore the gaslit statistics when the user leaves
  const handleMouseLeave = () => {
    setIsThreatening(false)
    setStats(initialStats)
  }

  return (
    <section 
      className="trust-strip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: isThreatening ? '#2b1111' : '',
        transition: 'background-color 0.3s ease',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* tiny floating label */}
      <div className="trust-mini-label" style={{ color: isThreatening ? '#ff4d4d' : '' }}>
        {isThreatening ? '⚠️ INTERNAL AUDIT IN PROGRESS' : 'definitely trustworthy statistics™'}
      </div>

      <div className="trust-grid" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '100%' }}>
        {stats.map((s, i) => (
          <div
            className="trust-item fade-in"
            key={`${s.type}-${i}`} // Dynamic, stable key combination
            style={{
              animationDelay: `${i * 0.15}s`,
              transform: isThreatening ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.2s ease-in-out',
              opacity: isThreatening && s.type === 'rating' ? 0.2 : 1 // Hide our team's rating when legal is looking
            }}
          >
            <span 
              className="trust-num"
              style={{
                fontFamily: 'monospace',
                color: isThreatening ? '#ff4d4d' : (s.type === 'regret' ? '#ffcc00' : 'inherit')
              }}
            >
              {s.num}
            </span>

            <span className="trust-label">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* hidden tiny disclaimer */}
      <div 
        className="trust-warning"
        onClick={() => alert("Audit log #77B: Stat tracking database is heavily corrupted by pizza grease.")}
        style={{ cursor: 'pointer', textDecoration: isThreatening ? 'underline' : 'none' }}
      >
        {isThreatening 
          ? '* do not screenshot this component context' 
          : '* numbers generated with extreme confidence and zero mathematical oversight'
        }
      </div>
    </section>
  )
}