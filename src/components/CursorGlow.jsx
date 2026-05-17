// CursorGlow.jsx - Upgraded for Peak Visual Irritation
import React, { useEffect, useState, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)
  const [panicLevel, setPanicLevel] = useState(0)
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e) => {
      const now = Date.now()
      const dt = now - lastPos.current.time
      
      if (dt > 0) {
        // Calculate velocity (pixels per millisecond)
        const dx = e.clientX - lastPos.current.x
        const dy = e.clientY - lastPos.current.y
        const speed = Math.sqrt(dx * dx + dy * dy) / dt

        // If they move the mouse fast, increase the chaos level
        if (speed > 1.5) {
          setPanicLevel(prev => Math.min(prev + 1, 5))
        }
      }

      // THE CRIME: Introduce an intentional layout delay/lag using a timeout
      setTimeout(() => {
        // Offset the glow slightly so it doesn't align with the actual cursor center
        el.style.left = `${e.clientX + 15}px`
        el.style.top = `${e.clientY + 15}px`
      }, 120) // 120ms lag is the ultimate sweet spot for driving people crazy

      lastPos.current = { x: e.clientX, y: e.clientY, time: now }
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Passive recovery: calm down the panic level if they stop moving wildly
  useEffect(() => {
    const interval = setInterval(() => {
      setPanicLevel(prev => Math.max(prev - 1, 0))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Trigger a native block if they lose their temper and shake the mouse too hard
  useEffect(() => {
    if (panicLevel >= 5) {
      alert("⚠️ MOTION SICKNESS DETECTED: You are moving your mouse with excessive aggression. Please hold perfectly still for 10 seconds to stabilize your breakfast.")
      setPanicLevel(0)
    }
  }, [panicLevel])

  return (
    <>
      {/* The Glow Element */}
      <div 
        ref={ref} 
        className="cursor-glow" 
        style={{
          position: 'fixed',
          pointerEvents: 'none', // Keeps it non-clickable so it passes through to underlying elements
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          // Expand the glow radius based on how panicked the user is to block their view
          width: `${150 + panicLevel * 60}px`,
          height: `${150 + panicLevel * 60}px`,
          background: panicLevel > 2 ? 'rgba(255, 0, 0, 0.25)' : 'rgba(200, 97, 42, 0.15)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        }}
      />

      {/* Bonus Subtitle that trails nearby to distract them */}
      <div
        style={{
          position: 'fixed',
          left: `${lastPos.current.x + 30}px`,
          top: `${lastPos.current.y + 40}px`,
          zIndex: 9998,
          pointerEvents: 'none',
          fontSize: '0.65rem',
          color: '#ff4d4d',
          background: '#1a1714',
          padding: '2px 6px',
          borderRadius: '4px',
          opacity: panicLevel > 0 ? 0.8 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {panicLevel > 2 ? 'Calm down.' : 'Hurry up!'}
      </div>
    </>
  )
}