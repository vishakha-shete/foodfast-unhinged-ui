// GatewayPage.jsx - Premium Onboarding designed by absolute psychopaths
import React, { useState, useEffect, useRef } from 'react'
import { dispatchEmoji } from './SoundEmoji'

export default function GatewayPage({ onEnter }) {
  const [step, setStep] = useState('queue') // 'queue' | 'password' | 'captcha' | 'terms' | 'button-chase' | 'loading' | 'success'
  
  // Custom bypass trigger
  const [logoClicks, setLogoClicks] = useState(0)

  // Waiting list states
  const [queueCount, setQueueCount] = useState(12482)
  const [waitTime, setWaitTime] = useState({ hours: 14, minutes: 22 })
  const [queueChecked, setQueueChecked] = useState(false)

  // Cursed password states
  const [password, setPassword] = useState('')
  const [passwordAttempts, setPasswordAttempts] = useState(0)
  const [passwordRules, setPasswordRules] = useState({
    capital: false,
    emojis: false,
    symbol: false,
    emotional: false
  })

  // Captcha states
  const [selectedDamage, setSelectedDamage] = useState([])
  const [desperation, setDesperation] = useState(50)
  const [captchaStatus, setCaptchaStatus] = useState('idle') // 'idle' | 'failed'

  // Terms and conditions state
  const [agreements, setAgreements] = useState({
    emotional: false,
    refunds: false,
    irresponsible: false,
  })
  const [dynamicCheckboxes, setDynamicCheckboxes] = useState([])
  const [checkedDynamic, setCheckedDynamic] = useState({})

  // Evasive button states
  const [evades, setEvades] = useState(0)
  const [btnStyle, setBtnStyle] = useState({ position: 'relative', left: '0px', top: '0px' })
  const [btnText, setBtnText] = useState('Enter Website')
  const evasiveBtnRef = useRef(null)

  // Loading scanner states
  const [progress, setProgress] = useState(0)
  const [logText, setLogText] = useState('Verifying metabolic status...')
  const [shakeActive, setShakeActive] = useState(false)

  // Random alert states
  const [alertText, setAlertText] = useState(null)

  // CAPTCHA details
  const BURGER_CAPTCHAS = [
    { id: 'burger-1', emoji: '🍔', desc: 'Double cheeseburger that once read a salad recipe.', isCursed: true },
    { id: 'burger-2', emoji: '🍔', desc: 'Cheerfully optimistic burger that believes calories don\'t exist.', isCursed: false },
    { id: 'burger-3', emoji: '🍔', desc: 'Soggy burger crying alone under a damp brown paper bag.', isCursed: true },
    { id: 'burger-4', emoji: '🍔', desc: 'Regular cheeseburger experiencing minor real estate inflation.', isCursed: true }
  ]

  // Dynamic legal agreements to appear sequentially
  const EXTENDED_TERMS = [
    { key: 'carbs', label: 'I acknowledge that carbohydrates are a mathematical construct.' },
    { key: 'telemetry', label: 'I authorize FoodFast to read my facial muscles via thermal cursor telemetry.' },
    { key: 'complaints', label: 'I agree that raising complaints will result in a ₹50 "Sarcasm Processing Levy".' },
    { key: 'soul', label: 'I yield the intellectual property of my appetite to the dark kitchen network.' }
  ]

  // Monitored warnings triggered periodically
  useEffect(() => {
    const warnings = [
      "⚠️ High regret probability detected.",
      "⚠️ This website may contain extra fees.",
      "⚠️ Your patience is under review."
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.4 && step !== 'loading' && step !== 'success') {
        const text = warnings[Math.floor(Math.random() * warnings.length)]
        setAlertText(text)
        dispatchEmoji('notify')
        setTimeout(() => setAlertText(null), 5000)
      }
    }, 12000)

    return () => clearInterval(interval)
  }, [step])

  // Queue fluctuations
  useEffect(() => {
    if (step !== 'queue') return
    const interval = setInterval(() => {
      setQueueCount(prev => {
        const delta = Math.random() > 0.4 ? -3 : 2
        return prev + delta
      })
      if (Math.random() > 0.7) {
        setWaitTime(prev => {
          const deltaMin = Math.random() > 0.5 ? -1 : 1
          let newM = prev.minutes + deltaMin
          let newH = prev.hours
          if (newM < 0) { newM = 59; newH = Math.max(0, newH - 1) }
          if (newM > 59) { newM = 0; newH += 1 }
          return { hours: newH, minutes: newM }
        })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [step])

  // Live validation of cursed password rules
  const handlePasswordChange = (val) => {
    setPassword(val)
    const hasCapital = /[A-Z]/.test(val)
    // Rule: Emojis count (need at least 2 emojis)
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF]/g
    const emojiCount = (val.match(emojiRegex) || []).length >= 2
    
    // Ancient symbol check
    const hasSymbol = /[☠⚡☯✦]/.test(val)
    
    // Emotional breakdown check
    const hasEmotional = /sob|crying|regret|hungry|helpless/i.test(val)

    setPasswordRules({
      capital: hasCapital,
      emojis: emojiCount,
      symbol: hasSymbol,
      emotional: hasEmotional
    })
  }

  const submitPassword = (e) => {
    e.preventDefault()
    if (passwordRules.capital && passwordRules.emojis && passwordRules.symbol && passwordRules.emotional) {
      dispatchEmoji('success', e)
      setStep('captcha')
    } else {
      setPasswordAttempts(prev => prev + 1)
      dispatchEmoji('fail', e)
      if (passwordAttempts === 1) {
        alert("🔒 ACCESS SUSPENDED: Your password does not contain enough personal vulnerability. Try expressing sadness.")
      } else if (passwordAttempts >= 2) {
        alert("🔒 SYSTEM COMPASSION: We noticed you are struggling. Here is a hint: Type 'Regret⚡☠👍👍A'")
      } else {
        alert("🔒 PASSWORD REJECTED: Enforce full compliance constraints.")
      }
    }
  }

  // Captcha evaluation
  const toggleDamage = (id, e) => {
    dispatchEmoji('random_click', e)
    setSelectedDamage(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const submitCaptcha = (e) => {
    e.preventDefault()
    // Verification rule: User must select all isCursed: true burgers and desperation > 70
    const correctItems = BURGER_CAPTCHAS.filter(x => x.isCursed).map(x => x.id)
    const matchesAll = correctItems.every(x => selectedDamage.includes(x)) && selectedDamage.length === correctItems.length
    
    if (matchesAll && desperation >= 70) {
      dispatchEmoji('success', e)
      setStep('terms')
    } else {
      setCaptchaStatus('failed')
      dispatchEmoji('fail', e)
      if (desperation < 70) {
        alert("🚨 VERIFICATION TIMEOUT: Your desperation level is too low. Healthy self-respect detected. Increase hunger threshold.")
      } else {
        alert("🚨 RE-CAPTCHA CHALLENGE FAILED: You missed a burger that had deep emotional trauma. Please look closer at the ingredients.")
      }
    }
  }

  // Terms and conditions cascade checkboxes
  const handleTermCheckbox = (key, val, e) => {
    dispatchEmoji('random_click', e)
    setAgreements(prev => {
      const next = { ...prev, [key]: val }
      // Trigger cascade on first check
      if (dynamicCheckboxes.length === 0) {
        setDynamicCheckboxes([EXTENDED_TERMS[0]])
      }
      return next
    })
  }

  const handleDynamicCheckbox = (key, val, e) => {
    dispatchEmoji('random_click', e)
    setCheckedDynamic(prev => ({ ...prev, [key]: val }))
    
    // Add next checkbox until all EXTENDED_TERMS are appended
    const checkedCount = Object.keys(checkedDynamic).filter(k => checkedDynamic[k]).length + (val ? 1 : 0)
    if (checkedCount < EXTENDED_TERMS.length && dynamicCheckboxes.length <= checkedCount) {
      setDynamicCheckboxes(prev => [...prev, EXTENDED_TERMS[checkedCount]])
    }
  }

  // Evasive button actions
  const handleBtnMouseMove = (e) => {
    if (evades >= 3) return // Bypassed after 3 evades (i.e. locks on 4th hover)

    const btn = evasiveBtnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const btnCenterX = rect.left + rect.width / 2
    const btnCenterY = rect.top + rect.height / 2

    const dx = e.clientX - btnCenterX
    const dy = e.clientY - btnCenterY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 100) {
      const nextEvades = evades + 1
      setEvades(nextEvades)
      
      if (nextEvades >= 3) {
        // Locked in place!
        setBtnStyle({
          position: 'relative',
          left: '0px',
          top: '0px',
          transition: 'all 0.3s ease-in'
        })
        setBtnText("Fine. Enter.")
      } else {
        const escapeX = dx > 0 ? -120 : 120
        const escapeY = dy > 0 ? -60 : 60
        setBtnStyle({
          position: 'relative',
          left: `${escapeX}px`,
          top: `${escapeY}px`,
          transition: 'all 0.15s ease-out'
        })
        const texts = ["Access Denied", "Try Again", "Not So Fast"]
        setBtnText(texts[evades] || "Try Again")
      }
      dispatchEmoji('bonk', e)
    }
  }

  const handleBtnMouseLeave = () => {
    setBtnStyle({
      position: 'relative',
      left: '0px',
      top: '0px',
      transition: 'all 0.3s ease-in'
    })
  }

  const triggerChaseSuccess = (e) => {
    e.preventDefault()
    dispatchEmoji('success', e)
    setStep('loading')
    startScanner()
  }

  // Final dramatic progress bar scanner
  const startScanner = () => {
    let currentProgress = 0
    const logs = [
      "Checking appetite...",
      "Scanning financial stability...",
      "Preparing disappointment...",
      "Loading bad decisions..."
    ]
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 20
      if (currentProgress >= 99) {
        currentProgress = 99
        clearInterval(interval)
        setProgress(99)
        setLogText('🚨 ACCESS GATE CLOGGED: Stuck at 99%. Initiating thermal screen shake to loosen server node...')
        setShakeActive(true)
        dispatchEmoji('fail')

        setTimeout(() => {
          setShakeActive(false)
          setProgress(100)
          setLogText('🔒 SUCCESS: Port aligned. Access granted!')
          dispatchEmoji('nice')
          
          setTimeout(() => {
            setStep('success')
            dispatchEmoji('success')
          }, 600)
        }, 1200)
      } else {
        setProgress(currentProgress)
        setLogText(logs[Math.floor((currentProgress / 100) * logs.length)] || logs[0])
      }
    }, 80)
  }

  return (
    <div className={`gateway-viewport fixed inset-0 z-[99999] flex items-center justify-center p-6 select-none overflow-y-auto ${shakeActive ? 'animate-shake' : ''}`}>
      
      {/* Cinematic Premium Background Atmosphere */}
      <div className="gateway-ambient-glow"></div>
      <div className="gateway-grain"></div>
      
      {/* Subtle digital grid backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(200,97,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,97,42,0.02)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="gateway-container w-full max-w-xl p-10 rounded-none relative space-y-8 animate-fade-in my-auto">
        
        {/* Top brutalist coordinate strip */}
        <div className="flex justify-between items-center font-mono text-[9px] text-[#c4b9a5]/50 border-b-2 border-[#2d2720]/60 pb-3">
          <span className="gateway-mono-tag">PORT: GATEWAY-NODE-5 // IDENTITY EVALUATION</span>
          <span className="animate-pulse text-[#6b7c4e] font-bold gateway-mono-tag">🟢 SECURE CONNECTION</span>
        </div>

        {/* Branding header */}
        <div 
          className="text-center space-y-3 cursor-pointer"
          onClick={(e) => {
            dispatchEmoji('nice', e)
            setLogoClicks(prev => {
              const next = prev + 1
              if (next >= 3) {
                // Instantly navigate to home page!
                onEnter()
              }
              return next
            })
          }}
        >
          <div className="font-display font-black text-5xl tracking-tighter uppercase text-[#f5f0e8] select-none">
            Food<span className="text-[#c8612a] italic">Fast</span>
          </div>
          <div className="font-mono text-[9px] text-[#c8612a] tracking-widest uppercase font-bold bg-[#c8612a]/10 py-1 px-3.5 inline-block border border-[#c8612a]/20 gateway-mono-tag">
            Access Evaluation Protocol
          </div>
        </div>

        {/* STATE 1: WAITING LIST QUEUE */}
        {step === 'queue' && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-[#171411] border-2 border-[#2d2720] p-6 rounded-none text-center space-y-3 relative overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,0.4)]">
              <div className="font-mono text-[10px] text-[#c45050] tracking-widest uppercase font-bold animate-pulse">
                🚨 Server Load High
              </div>
              <div className="font-display font-black text-4xl tracking-tight text-[#f5f0e8]">
                {queueCount.toLocaleString()}
              </div>
              <div className="text-xs text-[#d6cebf]">
                people are currently regretting their choices ahead of you.
              </div>
              <div className="font-mono text-[10px] text-[#d6cebf]/40 pt-1 border-t border-[#2d2720] mt-2">
                Estimated wait: <span className="text-[#f5f0e8] font-bold">{waitTime.hours}h {waitTime.minutes}m</span>
              </div>
            </div>

            <p className="text-xs text-[#d6cebf] text-center leading-relaxed font-mono gateway-mono-tag">
              We enforce strict compliance checks. Please wait in the ledger queue or bypass validation via immediate credentials auditing.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <button
                className="w-full bg-[#c8612a] hover:bg-[#e07a3a] border-2 border-black hover:border-black text-[#f5f0e8] font-bold py-3.5 px-4 rounded-none text-xs uppercase transition-all tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] gateway-btn-magnetic"
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  setStep('password')
                }}
              >
                Auditing manual identity credentials
              </button>
              <button
                className="w-full bg-transparent border-2 border-[#2d2720] hover:border-[#c45050] hover:bg-[#c45050]/5 text-[#d6cebf] hover:text-[#c45050] font-mono text-[9px] py-3 px-4 rounded-none transition-all gateway-mono-tag"
                onClick={(e) => {
                  dispatchEmoji('fee', e)
                  alert("💸 Queue bribe logged! A ₹10 Queue Operator Facilitation surcharge has been appended to your future checkout session. Please proceed to verify credentials.")
                  setStep('password')
                }}
              >
                Bribe Queue Operator (+₹10 to invoice)
              </button>
            </div>
          </div>
        )}

        {/* STATE 2: CURSED PASSWORD SYSTEM */}
        {step === 'password' && (
          <form onSubmit={submitPassword} className="space-y-5 animate-fade-in">
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-[#d6cebf]/60 uppercase tracking-widest font-bold gateway-mono-tag">Food Security Password</label>
              <input
                type="text"
                className="w-full bg-[#171411] border-2 border-[#2d2720] focus:border-[#c8612a] text-[#f5f0e8] font-mono text-sm p-4 rounded-none outline-none transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.3)] focus:shadow-[4px_4px_0px_rgba(200,97,42,0.25)] gateway-mono-tag"
                placeholder="Enter compliant password..."
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                autoFocus
              />
            </div>

            {/* Constraints Checklist */}
            <div className="bg-[#171411]/80 border-2 border-[#2d2720] p-5 rounded-none space-y-3.5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              <div className="font-mono text-[9px] text-[#d6cebf]/40 uppercase tracking-wider pb-1.5 border-b border-[#2d2720] gateway-mono-tag">
                Vulnerability Password Rules
              </div>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-mono gateway-mono-tag">
                <div className={`flex items-center gap-2 ${passwordRules.capital ? 'text-[#6b7c4e] font-bold' : 'text-[#d6cebf]/40'}`}>
                  <span className="text-xs">{passwordRules.capital ? '✓' : '☐'}</span> 1 Capital Letter
                </div>
                <div className={`flex items-center gap-2 ${passwordRules.emojis ? 'text-[#6b7c4e] font-bold' : 'text-[#d6cebf]/40'}`}>
                  <span className="text-xs">{passwordRules.emojis ? '✓' : '☐'}</span> 2 Emojis (e.g. 😭🍔)
                </div>
                <div className={`flex items-center gap-2 ${passwordRules.symbol ? 'text-[#6b7c4e] font-bold' : 'text-[#d6cebf]/40'}`}>
                  <span className="text-xs">{passwordRules.symbol ? '✓' : '☐'}</span> Ancient Symbol (☠⚡☯✦)
                </div>
                <div className={`flex items-center gap-2 ${passwordRules.emotional ? 'text-[#6b7c4e] font-bold' : 'text-[#d6cebf]/40'}`}>
                  <span className="text-xs">{passwordRules.emotional ? '✓' : '☐'}</span> Sad Breakdown word
                </div>
              </div>
              <div className="font-mono text-[8px] text-[#d6cebf]/30 italic border-t border-[#2d2720]/50 pt-2 gateway-mono-tag">
                Sad keywords: sob, crying, regret, hungry, helpless
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c8612a] hover:bg-[#e07a3a] border-2 border-black text-[#f5f0e8] font-bold py-3.5 px-4 rounded-none text-xs uppercase transition-all tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.5)] gateway-btn-magnetic"
            >
              Verify Vulnerability Ledger
            </button>
          </form>
        )}

        {/* STATE 3: FAKE HUMAN CAPTCHA */}
        {step === 'captcha' && (
          <form onSubmit={submitCaptcha} className="space-y-5 animate-fade-in">
            <div className="space-y-1">
              <div className="font-mono text-[9px] text-[#c8612a] tracking-widest uppercase font-bold gateway-mono-tag">
                Organic Anti-Bot Assessment
              </div>
              <div className="text-sm text-[#f5f0e8] font-bold">
                Select all burgers suffering from emotional damage / existential distress:
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {BURGER_CAPTCHAS.map((b) => {
                const isSelected = selectedDamage.includes(b.id)
                return (
                  <div
                    key={b.id}
                    className={`border-2 p-4 rounded-none flex flex-col items-center text-center justify-center gap-2 cursor-pointer select-none transition-all gateway-captcha-card ${
                      isSelected 
                        ? 'bg-[#9b3b3b]/10 border-[#9b3b3b] text-[#f5f0e8] scale-[1.02] shadow-[4px_4px_0px_rgba(155,59,59,0.3)]' 
                        : 'bg-[#171411] border-[#2d2720] text-[#d6cebf] hover:border-[#c8612a] hover:bg-[#2d2720]/30 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]'
                    }`}
                    onClick={(e) => toggleDamage(b.id, e)}
                  >
                    <span className="text-3xl">{b.emoji}</span>
                    <span className="text-[10px] text-[#f5f0e8] font-bold leading-snug">{b.desc}</span>
                  </div>
                )
              })}
            </div>

            {/* Slider to prove desperation */}
            <div className="space-y-3 pt-3 border-t-2 border-[#2d2720]">
              <div className="flex justify-between font-mono text-[10px] text-[#d6cebf]/60 gateway-mono-tag">
                <span>How desperate are you for low-quality grease?</span>
                <span className="text-[#c8612a] font-black">{desperation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={desperation}
                onChange={(e) => {
                  setDesperation(parseInt(e.target.value))
                  if (parseInt(e.target.value) > 80 && Math.random() > 0.7) {
                    dispatchEmoji('cry', e)
                  }
                }}
                className="w-full h-2 rounded-none cursor-pointer gateway-desperation-slider"
              />
              <div className="flex justify-between font-mono text-[8px] text-[#d6cebf]/30 gateway-mono-tag">
                <span>Indifferent</span>
                <span>Highly Vulnerable</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c8612a] hover:bg-[#e07a3a] border-2 border-black text-[#f5f0e8] font-bold py-3.5 px-4 rounded-none text-xs uppercase transition-all tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,0.5)] gateway-btn-magnetic"
            >
              Verify Organic Desperation
            </button>
          </form>
        )}

        {/* STATE 4: TERMS & CONDITIONS CHAOS */}
        {step === 'terms' && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-1">
              <div className="font-mono text-[9px] text-[#c8612a] tracking-widest uppercase font-bold">
                Legal Consent Cascade
              </div>
              <div className="text-sm text-[#f5f0e8] font-bold">
                Please acknowledge terms before viewport handshake:
              </div>
            </div>

            <div className="space-y-4 bg-[#171411]/50 p-6 border-2 border-[#2d2720] rounded-none shadow-[6px_6px_0px_rgba(0,0,0,0.2)] gateway-mono-tag">
              <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#d6cebf] hover:text-[#f5f0e8]">
                <input
                  type="checkbox"
                  className="mt-1 accent-[#c8612a]"
                  checked={agreements.emotional}
                  onChange={(e) => handleTermCheckbox('emotional', e.target.checked, e)}
                />
                <span>I accept emotional damage</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#d6cebf] hover:text-[#f5f0e8]">
                <input
                  type="checkbox"
                  className="mt-1 accent-[#c8612a]"
                  checked={agreements.refunds}
                  onChange={(e) => handleTermCheckbox('refunds', e.target.checked, e)}
                />
                <span>I understand refunds are fictional</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#d6cebf] hover:text-[#f5f0e8]">
                <input
                  type="checkbox"
                  className="mt-1 accent-[#c8612a]"
                  checked={agreements.irresponsible}
                  onChange={(e) => handleTermCheckbox('irresponsible', e.target.checked, e)}
                />
                <span>I agree to financially irresponsible behavior</span>
              </label>

              {/* Cascade checklists appear dynamically */}
              {dynamicCheckboxes.map((tc, idx) => {
                const isChecked = checkedDynamic[tc.key] || false
                return (
                  <label
                    key={tc.key}
                    className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#c45050] animate-fade-in font-bold"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#9b3b3b]"
                      checked={isChecked}
                      onChange={(e) => handleDynamicCheckbox(tc.key, e.target.checked, e)}
                    />
                    <span>{tc.label}</span>
                  </label>
                )
              })}
            </div>

            {/* Check if all are agreed to transition */}
            {agreements.emotional && agreements.refunds && agreements.irresponsible && Object.keys(checkedDynamic).length >= EXTENDED_TERMS.length && (
              <div className="pt-2 animate-fade-in flex justify-center min-h-[60px]">
                <button
                  ref={evasiveBtnRef}
                  className="bg-[#c8612a] hover:bg-[#e07a3a] border-2 border-black text-[#f5f0e8] font-bold py-3.5 px-8 rounded-none text-xs uppercase tracking-wider transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.5)] cursor-pointer gateway-btn-magnetic"
                  style={btnStyle}
                  onMouseMove={handleBtnMouseMove}
                  onMouseLeave={handleBtnMouseLeave}
                  onClick={triggerChaseSuccess}
                >
                  {btnText}
                </button>
              </div>
            )}
          </div>
        )}

        {/* STATE 5: DRAMATIC PROGRESS SCANNER */}
        {step === 'loading' && (
          <div 
            className="space-y-6 py-4 animate-fade-in cursor-pointer select-none"
            onClick={(e) => {
              dispatchEmoji('success', e)
              setStep('success')
            }}
            title="Click to bypass network clog"
          >
            <div className="text-center text-4xl animate-pulse">📡</div>
            <div className="font-display font-black text-xl tracking-tight text-center text-[#c8612a] uppercase">
              AI CHOICE SECURITY EVALUATION (Click to bypass clog)
            </div>
            
            <div className="w-full bg-[#171411] border-2 border-[#2d2720] h-6 rounded-none overflow-hidden relative shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
              <div 
                className="bg-gradient-to-r from-[#9b3b3b] via-[#c8612a] to-[#9b3b3b] h-full transition-all duration-300 ease-out gateway-progress-bar-glow" 
                style={{ 
                  width: `${progress}%`,
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.15) 10px, rgba(0,0,0,0.15) 20px)'
                }}
              ></div>
            </div>
            
            <div className="font-mono text-xs text-[#d6cebf] leading-relaxed h-16 flex items-center justify-center italic text-center px-6 bg-[#171411]/60 border-2 border-[#2d2720]/80 gateway-glitch-text">
              {logText}
            </div>

            <div className="font-mono text-[9px] text-[#d6cebf]/30 text-center gateway-mono-tag">
              * Verification parameters strictly processed by local volunteer node hotspot.
            </div>
          </div>
        )}

        {/* STATE 6: CONGRATULATIONS ENTRY MOMENT */}
        {step === 'success' && (
          <div className="space-y-6 text-center py-6 animate-scale-up">
            <div className="text-5xl animate-pulse">👑</div>
            <div className="space-y-2">
              <h1 className="font-display font-black text-4xl tracking-tight text-[#f5f0e8]">
                Congratulations.
              </h1>
              <p className="text-xs text-[#c8612a] font-mono uppercase tracking-widest font-bold gateway-mono-tag">
                You ignored every warning.
              </p>
            </div>
            <p className="text-xs text-[#d6cebf] leading-relaxed max-w-sm mx-auto font-mono gateway-mono-tag">
              Welcome to FoodFast.
            </p>
            <div className="pt-4">
              <button
                className="bg-[#c8612a] hover:bg-[#e07a3a] border-2 border-black text-[#f5f0e8] font-bold py-3.5 px-8 rounded-none text-xs uppercase tracking-wider transition-all animate-pulse shadow-[6px_6px_0px_rgba(0,0,0,0.5)] cursor-pointer gateway-btn-magnetic"
                onClick={(e) => {
                  dispatchEmoji('nice', e)
                  onEnter()
                }}
              >
                Enter Real Website
              </button>
            </div>
          </div>
        )}

        {/* Brutalist lower compliance warning footer */}
        <div className="border-t-2 border-[#2d2720] pt-3 flex justify-between items-center font-mono text-[8px] text-[#d6cebf]/30">
          <span>COMPLIANCE INDEX: D- // NON-REFUNDABLE APP</span>
          <span>© 2026 FOODFAST INC.</span>
        </div>

      </div>

      {/* RANDOM ALERTS ROW */}
      {alertText && (
        <div className="fixed bottom-6 right-6 p-4 rounded-none max-w-xs z-[99999] animate-fade-in flex items-center gap-3 gateway-floating-alert">
          <span className="text-lg animate-pulse">⚠️</span>
          <div className="font-mono text-[10px] text-[#f5f0e8] leading-tight gateway-mono-tag">{alertText}</div>
        </div>
      )}

    </div>
  )
}

