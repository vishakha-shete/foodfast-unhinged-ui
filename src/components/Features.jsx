// Features.jsx - Upgraded for Peak Chaos and Disorientation
import React, { useState, useEffect } from 'react'

const initialFeatures = [
  {
    icon: '🔥',
    title: 'Late Food Tracking',
    desc: 'Track your food live while it stays in the same place for 45 minutes.',
    tag: '// still preparing',
  },
  {
    icon: '🎯',
    title: 'Almost Correct Delivery',
    desc: 'We deliver near your house. Sometimes even to the right one.',
    tag: '// close enough',
  },
  {
    icon: '🤖',
    title: 'Smart Excuses',
    desc: 'Our AI creates a brand new excuse every time your order is late.',
    tag: '// powered by lies',
  },
  {
    icon: '💳',
    title: 'Hidden Fees',
    desc: 'Your food costs ₹200. Somehow the final bill becomes ₹847.',
    tag: '// advanced calculation',
  },
  {
    icon: '⭐',
    title: 'Very Honest Reviews',
    desc: 'We only show reviews written by hungry people at 2 AM.',
    tag: '// definitely real',
  },
  {
    icon: '🔒',
    title: 'Privacy Maybe',
    desc: 'Your personal data is safe with us. Probably.',
    tag: '// trust required',
  },
]

export default function Features() {
  const [featureList, setFeatureList] = useState(initialFeatures)
  const [glitchIdx, setGlitchIdx] = useState(null)

  // 1. THE LAYOUT LIAR: Randomly shuffle the position of cards every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureList(prev => [...prev].sort(() => Math.random() - 0.5))
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // 2. TEXT BREAKDOWN: Periodically glitch a card's description into raw code errors
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * initialFeatures.length)
      setGlitchIdx(randomIdx)
      
      // Clear glitch after half a second
      setTimeout(() => setGlitchIdx(null), 600)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // 3. THE RUNAWAY CARD: Swaps card data instantly if the user hovers over it
  const handleCardMouseEnter = (index) => {
    setFeatureList(prev => {
      const newList = [...prev]
      const targetIdx = (index + 1) % newList.length
      // Swap current item with the next one to confuse the cursor
      const temp = newList[index]
      newList[index] = newList[targetIdx]
      newList[targetIdx] = temp
      return newList
    })
  }

  return (
    <section className="features" id="features">
      {/* small floating label */}
      <div className="features-mini-label">
        premium disappointment features™
      </div>

      <div className="features-header">
        <h2 className="features-title">
          Why people still use <em>FoodFast</em>
        </h2>

        <p className="features-desc" onClick={() => alert("Reading descriptions costs an additional ₹45 premium text fee.")}>
          Fast delivery. Random charges. Wrong addresses.
          <br /><br />
          Everything you need in one terrible app.
        </p>
      </div>

      <div className="features-grid">
        {featureList.map((f, i) => {
          const isGlitched = i === glitchIdx
          
          return (
            <div
              className={`feature-card fade-in ${i % 2 === 0 ? 'tilt-left' : 'tilt-right'}`}
              key={`${f.title}-${i}`} // Stable key incorporating string and index tracking
              onMouseEnter={() => handleCardMouseEnter(i)}
              style={{
                animationDelay: `${i * 0.1}s`,
                cursor: 'help', // Changes cursor to a confusing question mark
                transform: isGlitched ? 'scale(0.95) skewX(-10deg)' : 'none',
                filter: isGlitched ? 'blur(1px) contrast(2)' : 'none',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {/* tiny fake badge */}
              <div className="feature-badge" style={{ background: isGlitched ? 'red' : '' }}>
                {isGlitched ? '⚠️ OVERLOAD' : 'trusted by nobody'}
              </div>

              <span className="feat-icon" style={{ display: 'inline-block', transform: isGlitched ? 'rotate(180deg)' : 'none' }}>
                {f.icon}
              </span>

              <h3>
                {isGlitched ? 'System Failure' : f.title}
              </h3>

              <p style={{ fontFamily: isGlitched ? 'monospace' : 'inherit', color: isGlitched ? '#ff4d4d' : 'inherit' }}>
                {isGlitched 
                  ? 'fatal_error: stack_overflow at line 404. localized hunger detected.' 
                  : f.desc
                }
              </p>

              <span className="feat-tag">
                {isGlitched ? '// self_destruct_imminent' : f.tag}
              </span>
            </div>
          )
        })}
      </div>

      {/* tiny hidden joke */}
      <div className="features-warning">
        * features are purely fictional and depend heavily on our mood
      </div>
    </section>
  )
}