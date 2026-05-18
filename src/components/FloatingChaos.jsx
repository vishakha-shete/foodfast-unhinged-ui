import React, { useState, useEffect, useRef } from 'react'
import '../styles/chaos.css'
import { dispatchEmoji } from './SoundEmoji'

const FLOATING_PRESETS = [
  {
    id: 'driver-give-up',
    title: 'Driver status',
    icon: '🚗',
    body: 'Your driver saw a minor incline in the road and has decided to go home.',
    btnText: 'Offer therapist',
    btnPrimary: true,
    styleClass: 'style-red',
    x: '10%',
    y: '20%',
  },
  {
    id: 'emotional-restaurant',
    title: 'Restaurant Status',
    icon: '💔',
    body: 'The head chef is feeling emotionally unavailable today. Burgers will be delayed.',
    btnText: 'Send flowers',
    btnPrimary: false,
    styleClass: 'style-charcoal',
    x: '65%',
    y: '15%',
  },
  {
    id: 'extra-fee',
    title: 'Inflation alert',
    icon: '💸',
    body: 'A micro-climate adjustment fee of $4.99 has been added to your potential cart.',
    btnText: 'Pay double',
    btnPrimary: true,
    styleClass: 'style-orange',
    x: '70%',
    y: '60%',
  },
  {
    id: 'still-hungry',
    title: 'System inquiry',
    icon: '🍔',
    body: 'We noticed you haven\'t ordered anything you will regret yet. Is everything okay?',
    btnText: 'Probably not',
    btnPrimary: false,
    styleClass: 'style-charcoal',
    x: '15%',
    y: '55%',
  },
  {
    id: 'vibe-delay',
    title: 'Vibe status',
    icon: '🌊',
    body: 'Delivery speeds are currently throttled due to unfavorable cosmic alignment.',
    btnText: 'Do vibe check',
    btnPrimary: true,
    styleClass: 'style-orange',
    x: '40%',
    y: '45%',
  },
  {
    id: 'security-warning',
    title: 'Security Alert',
    icon: '🚨',
    body: 'Suspicious hunger activity detected. Order confidence too low.',
    btnText: 'I am starving',
    btnPrimary: false,
    styleClass: 'style-red',
    x: '50%',
    y: '80%',
  }
]

const CURSOR_TRAILS = [
  'Need help?',
  'We noticed hesitation.',
  'Is the truth too much?',
  'Just click something.',
  'Are you still here?',
  'Your mouse coordinates are public.',
  'Nice hover.',
  'Buying time?'
]

const AI_NOTIFS = [
  { title: 'AI Prediction', icon: '🤖', body: 'AI models predict a 94.2% chance of heartburn.' },
  { title: 'Smart Failure', icon: '⚙️', body: 'Smart delivery failure enabled for optimal distress.' },
  { title: 'Copilot Tip', icon: '💡', body: 'Recommended user action: Deep breathing exercises.' },
  { title: 'Autocorrect', icon: '🍔', body: 'Healthy food choice detected. Autocorrecting to grease.' }
]

export default function FloatingChaos() {
  // State for all components of chaos
  const [updateText, setUpdateText] = useState('NEW: Faster disappointment delivery now available.')
  const [updateAction, setUpdateAction] = useState('Optimize')
  const [activePopups, setActivePopups] = useState([])
  const [cookieState, setCookieState] = useState('banner') // 'banner', 'pref', 'hidden', 'lied'
  const [sessionState, setSessionState] = useState('active') // 'active', 'prompt', 'logging-in', 'stuck', 'ssn'
  const [aiToasts, setAiToasts] = useState([])
  const [cursorText, setCursorText] = useState(CURSOR_TRAILS[0])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cookieAcceptPos, setCookieAcceptPos] = useState({ x: 0, y: 0 })
  const [loginInput, setLoginInput] = useState('')
  const [loginProgress, setLoginProgress] = useState(0)

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMsg, setChatMsg] = useState("Need help?")

  const cookieContainerRef = useRef(null)
  const acceptBtnRef = useRef(null)
  const lastMousePos = useRef({ x: 0, y: 0 })

  // Trigger floating popups dynamically
  useEffect(() => {
    // Show first 2 popups quickly, then spawn others
    const timer1 = setTimeout(() => {
      setActivePopups([FLOATING_PRESETS[0], FLOATING_PRESETS[1]])
    }, 4000)

    const interval = setInterval(() => {
      setActivePopups(prev => {
        if (prev.length >= 3) return prev
        const remaining = FLOATING_PRESETS.filter(p => !prev.some(ap => ap.id === p.id))
        if (remaining.length === 0) return prev
        const randomPreset = remaining[Math.floor(Math.random() * remaining.length)]
        dispatchEmoji('notify') // Ping!
        return [...prev, randomPreset]
      })
    }, 12000)

    return () => {
      clearTimeout(timer1)
      clearInterval(interval)
    }
  }, [])

  // Trigger Fake AI Notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAi = AI_NOTIFS[Math.floor(Math.random() * AI_NOTIFS.length)]
      const id = Date.now()
      dispatchEmoji('notify') // Ping!
      setAiToasts(prev => [...prev, { ...randomAi, id }])

      // Auto dismiss AI toasts
      setTimeout(() => {
        setAiToasts(prev => prev.filter(t => t.id !== id))
      }, 5000)
    }, 18000)

    return () => clearInterval(interval)
  }, [])

  // Trigger Idle User Messages
  useEffect(() => {
    let idleTimer
    const resetIdle = () => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        const idleMessages = ["Still here?", "We admire your patience.", "You seem uncertain."]
        const msg = idleMessages[Math.floor(Math.random() * idleMessages.length)]
        const id = Date.now()
        dispatchEmoji('idle') // Hum...
        setAiToasts(prev => [...prev, { title: 'System', icon: '👀', body: msg, id }])
        
        setTimeout(() => {
          setAiToasts(prev => prev.filter(t => t.id !== id))
        }, 5000)
      }, 18000) // 18 seconds idle
    }

    window.addEventListener('mousemove', resetIdle)
    window.addEventListener('keydown', resetIdle)
    resetIdle()
    
    return () => {
      window.removeEventListener('mousemove', resetIdle)
      window.removeEventListener('keydown', resetIdle)
      clearTimeout(idleTimer)
    }
  }, [])

  // Trigger Session Expired Modal
  useEffect(() => {
    // Expire session after 25 seconds for the ultimate surprise
    const timer = setTimeout(() => {
      setSessionState('prompt')
    }, 25000)

    return () => clearTimeout(timer)
  }, [])

  // Track Mouse for Cursor Following Toast & Cookie Evading Button
  useEffect(() => {
    const handleMouseMove = (e) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY }

      // 1. Update delayed cursor follow positions
      setTimeout(() => {
        setCursorPos({ x: e.clientX + 15, y: e.clientY + 20 })
      }, 100)

      // 2. Cookie button evasion logic
      if (cookieState === 'banner' && acceptBtnRef.current && cookieContainerRef.current) {
        const acceptRect = acceptBtnRef.current.getBoundingClientRect()
        const containerRect = cookieContainerRef.current.getBoundingClientRect()

        const buttonCenterX = acceptRect.left + acceptRect.width / 2
        const buttonCenterY = acceptRect.top + acceptRect.height / 2

        const dx = e.clientX - buttonCenterX
        const dy = e.clientY - buttonCenterY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // If cursor gets close (within 75px), evade!
        if (distance < 75) {
          // Calculate random position inside the container boundaries
          const maxX = containerRect.width - acceptRect.width - 24
          const maxY = containerRect.height - acceptRect.height - 24

          // Move randomly or away from the cursor vector
          let newX = Math.random() * maxX
          let newY = Math.random() * maxY

          // Ensure it's not directly under the cursor
          const cursorLocalX = e.clientX - containerRect.left
          const cursorLocalY = e.clientY - containerRect.top
          
          if (Math.abs(newX - cursorLocalX) < 60 && Math.abs(newY - cursorLocalY) < 60) {
            newX = (newX + 100) % maxX
            newY = (newY + 100) % maxY
          }

          setCookieAcceptPos({ x: newX, y: newY })

          // Cycle cursor text on evasion
          setCursorText(prev => {
            const nextIdx = (CURSOR_TRAILS.indexOf(prev) + 1) % CURSOR_TRAILS.length
            return CURSOR_TRAILS[nextIdx]
          })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cookieState])

  // Handle popup button click actions
  const handlePopupAction = (presetId, actionText, e) => {
    dispatchEmoji('random_click', e)
    if (presetId === 'extra-fee') {
      alert('💸 Cart upgraded! Double fee accepted. Thank you for supporting our digital waste fund.')
    } else if (presetId === 'driver-give-up') {
      alert('💬 Sending driver a generic therapeutic message: "It is okay to be average."')
    } else if (presetId === 'emotional-restaurant') {
      alert('🌸 Flower delivery ordered for head chef. Expected delivery: 2029.')
    } else {
      alert(`Action "${actionText}" logged to database. No outcome changes expected.`)
    }
    // Close it
    setActivePopups(prev => prev.filter(p => p.id !== presetId))
  }

  // Handle close popup - CURSED CLOSING
  const handlePopupClose = (presetId, e) => {
    dispatchEmoji('random_click', e)
    if (presetId === 'extra-fee') {
      // Penalty for closing the fee!
      const penaltyId = 'fee-penalty-' + Date.now()
      const penaltyPopup = {
        id: penaltyId,
        title: 'System Penalty',
        icon: '🚨',
        body: 'Closing the fee alert constitutes structural non-compliance. Closing fee applied: +$5.00.',
        btnText: 'Accept and apologize',
        btnPrimary: true,
        styleClass: 'style-red',
        x: `${20 + Math.random() * 50}%`,
        y: `${30 + Math.random() * 40}%`,
      }
      
      setActivePopups(prev => [...prev.filter(p => p.id !== presetId), penaltyPopup])
    } else {
      setActivePopups(prev => prev.filter(p => p.id !== presetId))
    }
  }

  // Update banner actions
  const handleOptimizeBanner = (e) => {
    dispatchEmoji('random_click', e)
    setUpdateText('Disappointment delivery already running at maximum physical speed.')
    setUpdateAction('Acknowledge')
  }

  // Cookie accept click (if they somehow click it!)
  const handleCookieAccept = (e) => {
    dispatchEmoji('random_click', e)
    setCookieState('lied')
    setTimeout(() => {
      setCookieState('hidden')
    }, 4000)
  }

  // Invasive preferences accept
  const handleInvasiveAccept = () => {
    setCookieState('hidden')
    alert('🍪 Preferences updated: Shared search history, eye tracking telemetry, and keystroke logs. Safe browsing!')
  }

  // Login handler
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (!loginInput) return

    setSessionState('logging-in')
    setLoginProgress(0)

    // Simulate fake progress bar
    const interval = setInterval(() => {
      setLoginProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval)
          // Lock at 99.8% or advance to SSN state
          setTimeout(() => {
            setSessionState('ssn')
          }, 3500) // Give them time to read "close enough honestly"
          return 99.8
        }
        return prev + Math.random() * 15
      })
    }, 150)
  }

  // Fake AI Chatbot Interaction
  const handleChatClick = () => {
    if (!chatOpen) {
      setChatOpen(true)
      const chatResponses = [
        "We usually don't.",
        "Please contact your therapist.",
        "AI predicted disappointment."
      ]
      setChatMsg(chatResponses[Math.floor(Math.random() * chatResponses.length)])
    } else {
      setChatOpen(false)
      setTimeout(() => setChatMsg("Need help?"), 300)
    }
  }

  return (
    <>
      {/* 1. Fake Update Banner */}
      <div className="chaos-update-banner">
        <span className="pulse-dot"></span>
        <span>{updateText}</span>
        {updateAction && (
          <button onClick={(e) => handleOptimizeBanner(e)}>{updateAction}</button>
        )}
      </div>

      {/* 2. Floating Popups Container */}
      <div className="chaos-popup-container">
        {activePopups.map((p) => (
          <div
            key={p.id}
            className={`chaos-popup ${p.styleClass}`}
            style={{
              left: p.x,
              top: p.y,
            }}
          >
            <div className="chaos-popup-header">
              <div className="chaos-popup-title">
                <span>{p.icon}</span>
                {p.title}
              </div>
              <button
                className="chaos-popup-close"
                onClick={(e) => handlePopupClose(p.id, e)}
              >
                ✕
              </button>
            </div>
            <div className="chaos-popup-body">{p.body}</div>
            <div className="chaos-popup-footer">
              <button
                className={`chaos-popup-btn ${p.btnPrimary ? 'primary' : 'secondary'}`}
                onClick={(e) => handlePopupAction(p.id, p.btnText, e)}
              >
                {p.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Evading Cookie Banner */}
      {cookieState === 'banner' && (
        <div ref={cookieContainerRef} className="chaos-cookie-banner">
          <div className="chaos-cookie-title">
            <span>🍪</span>
            Cookie Directive
          </div>
          <div className="chaos-cookie-body">
            We use highly invasive, questionable cookies to track your second-by-second doubts, hesitations, and financial vulnerabilities. Agree to continue or close window.
          </div>
          <div className="chaos-cookie-buttons">
            <button
              ref={acceptBtnRef}
              className="chaos-cookie-accept"
              onClick={(e) => handleCookieAccept(e)}
              style={{
                left: `${cookieAcceptPos.x}px`,
                top: `${cookieAcceptPos.y}px`,
                position: cookieAcceptPos.x !== 0 ? 'absolute' : 'static',
              }}
            >
              Accept tracking
            </button>
            <button
              className="chaos-cookie-decline"
              onClick={(e) => {
                dispatchEmoji('random_click', e)
                alert('Decline is disabled for user protection. Cookies accepted automatically.')
                setCookieState('pref')
              }}
            >
              Learn less
            </button>
          </div>
        </div>
      )}

      {/* Secret Cursed Cookie Message */}
      {cookieState === 'lied' && (
        <div className="chaos-cookie-banner" style={{ border: '2px solid var(--charcoal-light)' }}>
          <div className="chaos-cookie-title">
            <span>🍪</span>
            Cookie Directive
          </div>
          <div className="chaos-cookie-body">
            There were no cookies.
          </div>
        </div>
      )}

      {/* 4. Secondary invasive preferences popup */}
      {cookieState === 'pref' && (
        <div className="chaos-cookie-banner" style={{ border: '2px solid var(--red)' }}>
          <div className="chaos-cookie-title" style={{ color: 'var(--red-light)' }}>
            <span>⚠️</span>
            Invasive Options
          </div>
          <div className="chaos-cookie-body">
            To proceed, please consent to our AI selling your real-time emotional state to global synthetic food suppliers.
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              className="chaos-popup-btn primary"
              style={{ flex: 1, background: 'var(--red)' }}
              onClick={(e) => {
                dispatchEmoji('random_click', e)
                handleInvasiveAccept()
              }}
            >
              Consent fully
            </button>
            <button
              className="chaos-popup-btn"
              style={{ flex: 1 }}
              onClick={(e) => {
                dispatchEmoji('random_click', e)
                alert('Option locked. Consenting fully is required for local compliance.')
              }}
            >
              Ask mommy
            </button>
          </div>
        </div>
      )}

      {/* 5. Session Expired Toast / Modal */}
      {sessionState !== 'active' && (
        <div className="chaos-modal-overlay">
          {sessionState === 'prompt' && (
            <div className="chaos-expired-modal">
              <div className="chaos-expired-subtitle">Security protocol 401</div>
              <div className="chaos-expired-title">Your session has expired emotionally.</div>
              <div className="chaos-expired-body">
                For security reasons, we need to verify you are still willing to tolerate this user interface. Please enter a simplified, vulnerable password to continue.
              </div>
              <form onSubmit={handleLoginSubmit} className="chaos-expired-input-group">
                <label className="chaos-expired-input-label">Password</label>
                <input
                  type="password"
                  className="chaos-expired-input"
                  placeholder="Enter poor choice password"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  autoFocus
                />
                <div className="chaos-expired-buttons">
                  <button type="submit" className="chaos-expired-btn">
                    Authenticate Distress
                  </button>
                </div>
              </form>
              <div className="chaos-expired-help">
                By clicking authenticate, you agree to reset any progress you haven't made.
              </div>
            </div>
          )}

          {sessionState === 'logging-in' && (
            <div className="chaos-expired-modal" style={{ border: '3px solid var(--orange)' }}>
              <div className="chaos-expired-subtitle" style={{ color: 'var(--orange)' }}>
                Processing
              </div>
              <div className="chaos-expired-title" style={{ color: 'var(--cream)' }}>
                Validating credentials...
              </div>
              <div className="chaos-expired-body">
                Re-encrypting local storage keys with low security standards...
                {loginProgress > 98 && (
                  <div style={{ marginTop: '8px', color: 'var(--olive)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
                    close enough honestly
                  </div>
                )}
              </div>
              <div className="ph-loading" style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '0.6rem' }}>Progress: {loginProgress.toFixed(1)}%</span>
                <div className="load-bar" style={{ height: '6px' }}>
                  <div
                    className="load-fill"
                    style={{ width: `${loginProgress}%`, animation: 'none' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {sessionState === 'ssn' && (
            <div className="chaos-expired-modal">
              <div className="chaos-expired-subtitle" style={{ color: 'var(--red-light)' }}>
                Database warning
              </div>
              <div className="chaos-expired-title">Server handshake failed.</div>
              <div className="chaos-expired-body">
                We were unable to verify your password because our authentication database is currently hosted on a volunteer's mobile phone hotspot.
                <br /><br />
                Please verify your identity using your favorite childhood memory.
              </div>
              <div className="chaos-expired-input-group">
                <input
                  type="text"
                  className="chaos-expired-input"
                  placeholder="e.g., The day I fell in the mud"
                />
                <div className="chaos-expired-buttons">
                  <button
                    className="chaos-expired-btn"
                    onClick={(e) => {
                      dispatchEmoji('random_click', e)
                      setSessionState('active')
                      alert('💡 Close enough. Welcome back to the disappointment zone.')
                    }}
                  >
                    Bribe the server
                  </button>
                  <button
                    className="chaos-expired-btn"
                    style={{ background: 'transparent', border: '1px solid var(--charcoal-light)' }}
                    onClick={(e) => {
                      dispatchEmoji('random_click', e)
                      alert('Cart cleared. Resetting browser storage to 1999 standards...')
                      setSessionState('active')
                    }}
                  >
                    Give up entirely
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Fake AI Toasts */}
      <div className="chaos-ai-container">
        {aiToasts.map((toast) => (
          <div key={toast.id} className="chaos-ai-toast">
            <div className="chaos-ai-icon">{toast.icon}</div>
            <div className="chaos-ai-content">
              <div className="chaos-ai-header">
                <span className="chaos-ai-badge">AI</span>
                <span className="chaos-ai-title">{toast.title}</span>
              </div>
              <div className="chaos-ai-body">{toast.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 7. Cursor Follower Toast */}
      {cursorPos.x !== 0 && (
        <div
          className={`chaos-cursor-toast ${lastMousePos.current.x > 0 ? 'visible' : ''}`}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          {cursorText}
        </div>
      )}

      {/* 8. Fake AI Chatbot in Corner */}
      <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
        {chatOpen && (
           <div style={{ 
              background: 'var(--charcoal)', 
              border: '1px solid var(--charcoal-light)', 
              padding: '12px 16px', 
              borderRadius: '8px 8px 8px 2px', 
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem', 
              color: 'var(--cream)', 
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)', 
              maxWidth: '220px',
              animation: 'modalPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
           }}>
             <div style={{ fontSize: '0.6rem', color: 'var(--cream-dim)', opacity: 0.6, marginBottom: '4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>AI Assistant</div>
             {chatMsg}
           </div>
        )}
        <button 
          onClick={handleChatClick} 
          style={{ 
            background: 'var(--bg-card)', 
            color: 'var(--cream)', 
            border: '2px solid var(--charcoal-light)', 
            borderRadius: '50%', 
            width: '52px', 
            height: '52px', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '1.4rem', 
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)', 
            transition: 'all 0.2s ease',
            opacity: 0.85
          }} 
          onMouseOver={(e)=>{
            e.currentTarget.style.transform='scale(1.05)';
            e.currentTarget.style.borderColor='var(--orange)';
            e.currentTarget.style.opacity='1';
          }} 
          onMouseOut={(e)=>{
            e.currentTarget.style.transform='scale(1)';
            e.currentTarget.style.borderColor='var(--charcoal-light)';
            e.currentTarget.style.opacity='0.85';
          }}>
          🤖
        </button>
      </div>
    </>
  )
}
