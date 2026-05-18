import React, { useState, useRef, useEffect } from 'react'
import { dispatchEmoji } from './SoundEmoji'

export default function CheckoutPage({ cart = [], setCart, navigateTo }) {
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponFeeApplied, setCouponFeeApplied] = useState(false)
  
  // Confusing Payment States
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [codDenomination, setCodDenomination] = useState('2000')
  const [iouRegret, setIouRegret] = useState('')
  const [cryptoConnecting, setCryptoConnecting] = useState(false)
  
  const [cardName, setCardName] = useState('')
  const [cardNums, setCardNums] = useState(['', '', '', ''])
  const [expiryMonth, setExpiryMonth] = useState('12') // Default out of order
  const [expiryYear, setExpiryYear] = useState('2032')
  
  // Dynamic Small Fees
  const [dynamicFees, setDynamicFees] = useState([])
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null) // 'verification' | 'confirm-1' | 'confirm-2' | 'confirm-3' | 'security-check'
  const [selectedEmojis, setSelectedEmojis] = useState([])
  const [surchargeFees, setSurchargeFees] = useState({
    couponCharge: 0,
    happinessFine: 0,
    impatienceFee: 0,
  })

  // Evasion states
  const [evadesCount, setEvadesCount] = useState(0)
  const [orderButtonStyle, setOrderButtonStyle] = useState({
    position: 'relative',
    left: '0px',
    top: '0px'
  })

  // Security Scanner States
  const [securityText, setSecurityText] = useState('Scanning your hunger...')
  const [securityProgress, setSecurityProgress] = useState(0)

  // Random Alert States
  const [randomAlert, setRandomAlert] = useState(null)

  const cardRefs = [useRef(), useRef(), useRef(), useRef()]
  const orderBtnRef = useRef()

  // Easter Egg States
  const [clickCount, setClickCount] = useState(0)
  const buttonTexts = [
    "Initiate Stomach Demolition",
    "Are you sure?",
    "Really sure?",
    "Financially stable?",
    "Fine. Whatever."
  ]

  const [hoverFee, setHoverFee] = useState(0)
  const [hoverFeeName, setHoverFeeName] = useState('')

  const handleFeeHover = (e) => {
    if (!hoverFee && Math.random() > 0.4) {
      const fees = [
        { name: "Breathing Fee", amount: 15 },
        { name: "Emotional Damage Fee", amount: 200 },
        { name: "Existing Fee", amount: 1 }
      ]
      const f = fees[Math.floor(Math.random() * fees.length)]
      setHoverFee(f.amount)
      setHoverFeeName(f.name)
      dispatchEmoji('fee', e)
    }
  }

  const handleFeeLeave = () => {
    setHoverFee(0)
    setHoverFeeName('')
  }

  // Out of order months to drive judges insane
  const CHAOTIC_MONTHS = [
    { value: '12', label: 'December (Cold)' },
    { value: '01', label: 'January (Sad)' },
    { value: '07', label: 'July (Sweaty)' },
    { value: '03', label: 'March (Windy)' },
    { value: '09', label: 'September (Rainy)' },
    { value: '05', label: 'May (Tolerable)' },
    { value: '11', label: 'November (Dark)' },
    { value: '02', label: 'February (Short)' },
    { value: '08', label: 'August (Long)' },
    { value: '04', label: 'April (Tricky)' },
    { value: '10', label: 'October (Spooky)' },
    { value: '06', label: 'June (Hot)' },
  ]

  // Emojis for the sad verification
  const VERIFICATION_EMOJIS = [
    { id: 1, emoji: '😭', caption: 'Existential dread' },
    { id: 2, emoji: '😢', caption: 'Wet eyes' },
    { id: 3, emoji: '🫠', caption: 'Melting brain' },
    { id: 4, emoji: '🤡', caption: 'Frontend developer' },
  ]

  // Random dynamic fees added continuously on interaction
  const addDynamicFee = (name, amount) => {
    setDynamicFees(prev => {
      if (prev.some(f => f.name === name)) return prev
      return [...prev, { name, amount }]
    })
  }

  // Trigger random alert popups to distract the user
  useEffect(() => {
    const alerts = [
      "⚠️ DANGER: 4 people are regretting their checkout choice on this exact server node.",
      "⚡ FLASH SALE: Decline checking out now to receive an immediate ₹1 convenience fee reduction penalty!",
      "🔥 URGENT: The kitchen is running out of Soggy Fries! Buy 2 more to ensure driver safety.",
      "🤡 NOTICE: Managing director has requested an extra ₹15 'Convenience Levy' to support his golf tournament.",
      "💸 ALERT: Inflation has emotionally increased by 0.4% in the last 12 seconds."
    ]

    const triggerAlert = () => {
      const randomText = alerts[Math.floor(Math.random() * alerts.length)]
      setRandomAlert(randomText)
      setTimeout(() => setRandomAlert(null), 5000)
    }

    const timer = setInterval(() => {
      if (!activeModal && Math.random() > 0.3) {
        triggerAlert()
      }
    }, 15000)

    return () => clearInterval(timer)
  }, [activeModal])

  // Auto-correct address to something beautifully cursed
  const handleAddressBlur = () => {
    if (!address) return
    const cursedSuffixes = [
      ' (Labyrinth of Despair Corner)',
      ' (Driver will probably drop it in the mud)',
      ' (Rooftop Drop-Off Zone)',
      ' (Under the broken streetlight)',
    ]
    const randomSuffix = cursedSuffixes[Math.floor(Math.random() * cursedSuffixes.length)]
    if (!address.includes('(')) {
      setAddress(prev => prev + randomSuffix)
      addDynamicFee("Labyrinth Routing Overhead", 35)
    }
  }

  // Auto-correct phone number to include a suspicious country code
  const handlePhoneBlur = () => {
    if (!phone) return
    if (!phone.startsWith('+')) {
      setPhone(`+880 (Suspicious) ${phone}`)
      addDynamicFee("Pre-emptive Spam Filtering Fee", 19)
    }
  }

  // Handle input card field changes - smart malicious jumps
  const handleCardChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 4)
    const newNums = [...cardNums]
    newNums[index] = cleanValue
    setCardNums(newNums)

    if (cleanValue.length === 4) {
      if (index === 0) {
        // Crime: Jumps to index 2 instead of index 1!
        cardRefs[2].current?.focus()
        alert("🔒 SECURITY CRIME: High-entropy key alignment enabled. Cursor forced to Block 3.")
      } else if (index === 2) {
        cardRefs[1].current?.focus()
      } else if (index === 1) {
        cardRefs[3].current?.focus()
      }
    }
  }

  const applyCoupon = (e) => {
    if (couponCode.toUpperCase() === 'SORRYBRO') {
      setCouponApplied(true)
      setSurchargeFees(prev => ({ ...prev, couponCharge: 120 }))
      setCouponFeeApplied(true)
      dispatchEmoji('success', e)
      alert("🎟️ Coupon applied successfully! ₹99 discount registered.\n\nNote: A ₹120 coupon validation processing surcharge has been added to cover the database index read cost.")
    } else if (['SORRY50', 'DISAPPOINTMENT50'].includes(couponCode.toUpperCase())) {
      dispatchEmoji('fail', e)
      alert("❌ Coupon Code EXPIRED: Redeemed by someone else in 2022. Try again or pay full price.")
    } else {
      dispatchEmoji('fail', e)
      const fails = [
        `❌ Coupon Code '${couponCode}' already emotionally redeemed by another user.`,
        `❌ Coupon Code '${couponCode}' FAILED: Database indicates your coupon has been deemed too optimistic for our dark kitchen.`,
        `❌ Coupon Code '${couponCode}' INVALID: Sarcasm threshold not reached.`
      ]
      alert(fails[Math.floor(Math.random() * fails.length)])
    }
  }

  // Cost calculation engine
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const itemQuantity = cart.reduce((acc, item) => acc + item.qty, 0)
  const inflationFee = itemQuantity * 49
  const therapyFee = itemQuantity > 0 ? 80 : 0
  const airFee = itemQuantity > 0 ? 50 : 0
  const trafficFee = 185

  const discount = couponApplied ? 99 : 0
  const dynamicTotal = dynamicFees.reduce((acc, f) => acc + f.amount, 0)
  const total = subtotal + trafficFee + inflationFee + therapyFee + airFee + 
                surchargeFees.couponCharge + surchargeFees.happinessFine + surchargeFees.impatienceFee - discount + hoverFee + dynamicTotal

  // Evasive Place Order Button Logic
  const handleOrderButtonMouseMove = (e) => {
    if (evadesCount >= 2) {
      // Bypassed! Let them click it.
      return
    }

    const btn = orderBtnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const btnCenterX = rect.left + rect.width / 2
    const btnCenterY = rect.top + rect.height / 2

    const distX = e.clientX - btnCenterX
    const distY = e.clientY - btnCenterY

    // If mouse gets close, the button flees!
    if (Math.abs(distX) < 100 && Math.abs(distY) < 60) {
      setEvadesCount(prev => prev + 1)
      const escapeX = distX > 0 ? -90 : 90
      const escapeY = distY > 0 ? -50 : 50

      setOrderButtonStyle({
        position: 'relative',
        left: `${escapeX}px`,
        top: `${escapeY}px`,
        transition: 'all 0.15s ease-out'
      })
      dispatchEmoji('bonk', e)
    }
  }

  const handleOrderButtonMouseLeave = () => {
    setOrderButtonStyle({
      position: 'relative',
      left: '0px',
      top: '0px',
      transition: 'all 0.3s ease-in'
    })
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (clickCount < buttonTexts.length - 1) {
      setClickCount(prev => prev + 1)
      return
    }
    if (!address || !phone) {
      alert("❌ Address and phone number required.")
      return
    }
    if (paymentMethod === 'card' && (!cardName || cardNums.some(n => n.length < 4))) {
      alert("❌ Card authorization fields invalid.")
      return
    }
    if (paymentMethod === 'iou' && !iouRegret) {
      alert("❌ IOU requires an emotional sacrifice/regret in the input.")
      return
    }
    setActiveModal('verification')
  }

  const toggleEmoji = (id) => {
    setSelectedEmojis(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleVerificationSubmit = () => {
    // All options are inherently depressing, triggering an immediate emotional fine
    setSurchargeFees(prev => ({ ...prev, happinessFine: 120 }))
    setActiveModal('confirm-1')
  }

  // Fake security scanner progression
  useEffect(() => {
    if (activeModal !== 'security-check') return

    setSecurityProgress(0)
    setSecurityText('Scanning hunger vector...')

    const intervals = [
      { progress: 20, text: 'Evaluating credit limit boundaries...', delay: 800 },
      { progress: 45, text: 'Estimating carbon offset of cold burger transport...', delay: 1600 },
      { progress: 65, text: 'Consulting digital kitchen therapist...', delay: 2400 },
      { progress: 85, text: 'Encrypting food guilt credentials...', delay: 3200 },
      { progress: 100, text: 'Finalizing ledger transaction...', delay: 4000 }
    ]

    const timers = intervals.map(step => {
      return setTimeout(() => {
        setSecurityProgress(step.progress)
        setSecurityText(step.text)
        // Play procedure noises!
        const synthEvents = ['nice', 'squeak', 'bruh']
        const randomSynth = synthEvents[Math.floor(Math.random() * synthEvents.length)]
        dispatchEmoji(randomSynth, null)
      }, step.delay)
    })

    const finalTimer = setTimeout(() => {
      // Done scanning! Complete the actual checkout.
      completeOrder()
    }, 4500)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finalTimer)
    }
  }, [activeModal])

  const completeOrder = () => {
    // Save receipts
    window.finalReceipt = {
      cart: [...cart],
      fees: {
        subtotal,
        trafficFee,
        inflationFee,
        therapyFee,
        airFee,
        couponDiscount: discount,
        couponCharge: surchargeFees.couponCharge,
        happinessFine: surchargeFees.happinessFine,
        impatienceFee: surchargeFees.impatienceFee,
        total
      }
    }
    navigateTo('success')
  }

  return (
    <div className="flow-container max-w-6xl mx-auto px-4 py-24 min-h-screen text-cream">
      {/* HEADER BLOCK */}
      <div className="text-center mb-12">
        <h1 className="flow-title font-display text-4xl md:text-6xl font-black tracking-tight mb-2">
          The <em className="text-orange not-italic">Nightmare</em> Checkout
        </h1>
        <div className="flow-subtitle font-mono text-xs uppercase tracking-widest text-olive">
          Phase 3: Financial Humiliation Simulator
        </div>
      </div>

      <div className="checkout-layout grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        
        {/* LEFT COMPONENT: DATA EXTRACTION FORM */}
        <form onSubmit={handlePlaceOrder} className="checkout-card bg-bg-card border border-charcoal-light p-6 md:p-8 rounded-xl space-y-10 shadow-2xl">
          
          {/* STEP 1: ROUTING LOCATION */}
          <div className="space-y-4">
            <div className="checkout-step-title flex items-center gap-3 border-b border-charcoal pb-2">
              <span className="checkout-step-num font-mono text-xs bg-red/20 text-red-light px-2 py-0.5 rounded border border-red/30">Step 1</span>
              <span className="font-display font-bold text-lg">Where should we lose your order?</span>
            </div>
            
            <div className="checkout-input-grid space-y-4">
              <div className="checkout-field flex flex-col gap-1.5">
                <label className="checkout-label text-xs font-mono text-cream-dim/70">Delivery Address (will auto-adjust for realism)</label>
                <input
                  type="text"
                  required
                  className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-sm focus:border-orange outline-none transition-colors w-full"
                  placeholder="e.g. 12 Pine Street, Apt 4B"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={handleAddressBlur}
                />
              </div>
              
              <div className="checkout-field flex flex-col gap-1.5">
                <label className="checkout-label text-xs font-mono text-cream-dim/70">Suspicious Phone Number (for automated advertising)</label>
                <input
                  type="text"
                  required
                  className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-sm focus:border-orange outline-none transition-colors w-full"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={handlePhoneBlur}
                />
              </div>
              
              <label className="checkout-checkbox-label flex items-start gap-2.5 text-xs text-cream-dim/60 cursor-pointer select-none pt-2">
                <input type="checkbox" required className="mt-0.5 accent-orange" />
                <span>I agree to allow the routing driver to launch my package onto the roof structure if access vectors remain complex.</span>
              </label>
            </div>
          </div>

          {/* STEP 3: CONFUSING PAYMENT FLOW */}
          <div className="space-y-4">
            <div className="checkout-step-title flex items-center gap-3 border-b border-charcoal pb-2">
              <span className="checkout-step-num font-mono text-xs bg-orange/20 text-orange-light px-2 py-0.5 rounded border border-orange/30">Step 3</span>
              <span className="font-display font-bold text-lg">Confusing Payment Flow</span>
            </div>
            
            {/* Payment Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {[
                { id: 'card', name: 'Credit Card', emoji: '💳', tooltip: 'Forces high-stress chaotic auto-jumps' },
                { id: 'cod', name: 'Indian Rupee Cash', emoji: '💵', tooltip: 'Requires physical bank verification down to the paisa' },
                { id: 'iou', name: 'Existential IOU', emoji: '✍️', tooltip: 'Trade a childhood regret for food ledger authorization' },
                { id: 'crypto', name: 'Solana/NFT', emoji: '🪙', tooltip: 'Connecting wallet since 2021 (Extremely buggy)' }
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  className={`p-3 rounded border text-center transition-all cursor-pointer relative group select-none ${
                    paymentMethod === method.id 
                      ? 'border-orange bg-orange/10 text-orange-light font-bold scale-[1.02]' 
                      : 'border-charcoal-light bg-charcoal text-cream-dim hover:border-charcoal hover:bg-charcoal-light/50'
                  }`}
                  onClick={(e) => {
                    dispatchEmoji('random_click', e)
                    setPaymentMethod(method.id)
                    addDynamicFee("Payment Method Interlocution Fine", 15)
                  }}
                >
                  <div className="text-xl mb-1">{method.emoji}</div>
                  <div className="font-display text-xs">{method.name}</div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-charcoal border border-charcoal-light rounded text-[10px] text-cream-dim font-mono leading-tight opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                    {method.tooltip}
                  </div>
                </button>
              ))}
            </div>

            {/* Conditional payment forms */}
            {paymentMethod === 'card' && (
              <div className="checkout-input-grid grid grid-cols-1 md:grid-cols-2 gap-4 border border-charcoal-light p-4 rounded bg-charcoal/20">
                <div className="checkout-field md:col-span-2 flex flex-col gap-1.5">
                  <label className="checkout-label text-xs font-mono text-cream-dim/70">Full Name on Card (shared with dynamic retail networks)</label>
                  <input
                    type="text"
                    required
                    className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-sm focus:border-orange outline-none transition-colors w-full"
                    placeholder="e.g. Priya Mukherjee"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                
                <div className="checkout-field md:col-span-2 flex flex-col gap-1.5">
                  <label className="checkout-label text-xs font-mono text-cream-dim/70">Card Number (Blocks of 4 — Quantum Alignment Jumps Active)</label>
                  <div className="card-number-fields grid grid-cols-4 gap-2">
                    {cardNums.map((num, i) => (
                      <input
                        key={i}
                        ref={cardRefs[i]}
                        type="text"
                        required
                        placeholder="0000"
                        className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-center font-mono text-sm focus:border-orange outline-none transition-colors"
                        value={num}
                        onChange={(e) => handleCardChange(i, e.target.value)}
                      />
                    ))}
                  </div>
                </div>

                <div className="checkout-field flex flex-col gap-1.5">
                  <label className="checkout-label text-xs font-mono text-cream-dim/70">Expiry Month (Chaotic Sorting Matrix)</label>
                  <select 
                    className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-sm focus:border-orange outline-none transition-colors w-full cursor-pointer" 
                    value={expiryMonth}
                    onChange={(e) => {
                      setExpiryMonth(e.target.value)
                      addDynamicFee("Chaotic Sorting Calculation Tax", 25)
                    }}
                  >
                    {CHAOTIC_MONTHS.map(m => (
                      <option key={m.value} value={m.value} className="bg-bg-card">{m.label}</option>
                    ))}
                  </select>
                </div>

                <div className="checkout-field flex flex-col gap-1.5">
                  <label className="checkout-label text-xs font-mono text-cream-dim/70">Expiry Year</label>
                  <select 
                    className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-sm focus:border-orange outline-none transition-colors w-full cursor-pointer"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                  >
                    <option value="2032" className="bg-bg-card">2032 (Optimistic)</option>
                    <option value="2033" className="bg-bg-card">2033 (Unlikely)</option>
                    <option value="2034" className="bg-bg-card">2034 (Solar Flare Decompression)</option>
                  </select>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="border border-charcoal-light p-4 rounded bg-charcoal/20 space-y-4 font-mono text-xs text-cream-dim">
                <div className="text-orange-light font-bold">⚠️ Indian Rupee Cash-on-Delivery Compliance Matrix</div>
                <p>Our routing drivers do not carry physical change, mathematical compasses, or positive life attitudes.</p>
                
                <div className="checkout-field flex flex-col gap-1.5">
                  <label className="checkout-label text-xs text-cream-dim/70">Choose note denomination to authorize physical currency authentication:</label>
                  <select
                    className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-sm focus:border-orange outline-none transition-colors w-full cursor-pointer text-cream"
                    value={codDenomination}
                    onChange={(e) => {
                      setCodDenomination(e.target.value)
                      if (e.target.value === '2000') {
                        alert("🚨 DEMONETIZATION PROTOCOL: The ₹2000 denomination note is no longer legal tender. Appending physical note verification fine (₹150) to total invoice.")
                        addDynamicFee("Demonetized Currency Fine", 150)
                      } else {
                        addDynamicFee("Cash Transport Levy", 45)
                      }
                    }}
                  >
                    <option value="2000" className="bg-bg-card">₹2,000 (Slightly demonetized, questionable)</option>
                    <option value="500" className="bg-bg-card">₹500 (Requires clean surface for scanning)</option>
                    <option value="exact" className="bg-bg-card">Exact change down to the paisa (Driver will verify with tweezers)</option>
                  </select>
                </div>
              </div>
            )}

            {paymentMethod === 'iou' && (
              <div className="border border-charcoal-light p-4 rounded bg-charcoal/20 space-y-4">
                <div className="text-orange-light font-mono text-xs font-bold">✍️ Existential IOU Authorization Ledgers</div>
                <p className="font-mono text-[10px] text-cream-dim">To trade your emotional regret for food, describe in vivid details one choice you made in middle school that still keeps you awake at 3:00 AM.</p>
                
                <div className="checkout-field flex flex-col gap-1.5">
                  <textarea
                    className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-sm focus:border-orange outline-none transition-colors w-full h-24 font-sans text-cream resize-none"
                    placeholder="e.g. I laughed at my teacher's toupee and then realized she was crying..."
                    value={iouRegret}
                    onChange={(e) => setIouRegret(e.target.value)}
                    onBlur={() => addDynamicFee("Existential Regret Validation Fine", 75)}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="border border-charcoal-light p-4 rounded bg-charcoal/20 space-y-4 text-center py-8">
                <div className="text-xl">🪙</div>
                <div className="text-orange-light font-mono text-xs font-bold">Connecting Solana Wallet...</div>
                <p className="font-mono text-[10px] text-cream-dim max-w-sm mx-auto">Solana gas fee dynamic estimation active. Current network congestion requires consistent click cycles to maintain pipeline sync.</p>
                
                <button
                  type="button"
                  className="px-4 py-2 bg-charcoal border border-charcoal-light hover:border-orange rounded text-xs font-mono font-bold transition-all inline-block hover:scale-[1.02]"
                  onClick={(e) => {
                    dispatchEmoji('random_click', e)
                    setCryptoConnecting(true)
                    addDynamicFee("Solana Pipeline Sync Fine", 200)
                    setTimeout(() => {
                      setCryptoConnecting(false)
                      alert("❌ Solana RPC connection dropped. Network indicates dynamic emotional balance was too low to process NFT gas.")
                    }, 1800)
                  }}
                  disabled={cryptoConnecting}
                >
                  {cryptoConnecting ? 'Pipelining ledger...' : 'Trigger Wallet Connection (Gas: ₹200)'}
                </button>
              </div>
            )}
          </div>

          <button 
            ref={orderBtnRef}
            type="submit" 
            className="cart-checkout-btn w-full bg-orange hover:bg-orange-light text-cream font-bold py-4 px-6 rounded-lg shadow-lg tracking-wide transition-colors uppercase text-sm mt-4 select-none cursor-pointer"
            style={orderButtonStyle}
            onMouseMove={handleOrderButtonMouseMove}
            onMouseLeave={handleOrderButtonMouseLeave}
            onMouseEnter={(e) => dispatchEmoji('hover', e)}
          >
            {buttonTexts[clickCount]}
          </button>
        </form>

        {/* RIGHT COMPONENT: DYNAMIC INVOICE MATRIX */}
        <div 
          className="cart-sidebar bg-bg-card border-2 border-dashed border-charcoal-light p-6 rounded-xl space-y-6 shadow-xl sticky top-24"
          style={{ transform: 'rotate(0.5deg)' }}
        >
          <div className="cart-title border-b border-charcoal pb-3 flex justify-between items-center font-display font-black text-xl tracking-tight text-orange">
            <span>Corporate Invoice</span>
            <span className="font-mono text-[9px] text-cream-dim/30 bg-charcoal px-2 py-0.5 rounded">SYS_REF // #8410</span>
          </div>

          <div className="cart-fees space-y-2.5 font-mono text-xs text-cream-dim" onMouseEnter={(e) => handleFeeHover(e)} onMouseLeave={handleFeeLeave}>
            <div className="cart-fee-row flex justify-between">
              <span>Items Total ({itemQuantity})</span>
              <span className="text-cream">₹{subtotal}</span>
            </div>
            <div className="cart-fee-row flex justify-between">
              <span>Base Transit Vector Tax</span>
              <span className="text-cream">₹{trafficFee}</span>
            </div>
            <div className="cart-fee-row highlight flex justify-between text-orange-light bg-orange/5 p-2 rounded border border-orange/10">
              <span>Neighborhood Inflation Levy</span>
              <span className="font-bold">₹{inflationFee}</span>
            </div>
            <div className="cart-fee-row flex justify-between">
              <span>Driver Emotional Mitigation Pool</span>
              <span className="text-cream">₹{therapyFee}</span>
            </div>
            <div className="cart-fee-row flex justify-between">
              <span>Atmospheric Air Displacement Fee</span>
              <span className="text-cream">₹{airFee}</span>
            </div>

            {/* DYNAMIC INTERACTIVE PENALTY STACKS */}
            {couponApplied && (
              <div className="cart-fee-row flex justify-between text-olive font-semibold bg-olive/5 p-1.5 px-2 rounded border border-olive/10">
                <span>Coupon Applied ('SORRYBRO')</span>
                <span>-₹{discount}</span>
              </div>
            )}
            {couponFeeApplied && (
              <div className="cart-fee-row penalty flex justify-between text-red-light font-bold bg-red/5 p-1.5 px-2 rounded border border-red/10 animate-pulse">
                <span>Coupon Allocation Overhead</span>
                <span>+₹{surchargeFees.couponCharge}</span>
              </div>
            )}
            {surchargeFees.happinessFine > 0 && (
              <div className="cart-fee-row penalty flex justify-between text-red-light font-bold bg-red/5 p-1.5 px-2 rounded border border-red/10 animate-pulse">
                <span>Emotional Deficit Processing Fine</span>
                <span>+₹{surchargeFees.happinessFine}</span>
              </div>
            )}
            {surchargeFees.impatienceFee > 0 && (
              <div className="cart-fee-row penalty flex justify-between text-red-light font-bold bg-red/5 p-1.5 px-2 rounded border border-red/10 animate-pulse">
                <span>Decision Reluctance Levy</span>
                <span>+₹{surchargeFees.impatienceFee}</span>
              </div>
            )}
            {hoverFee > 0 && (
              <div className="cart-fee-row penalty flex justify-between text-red-light font-bold bg-red/5 p-1.5 px-2 rounded border border-red/10 animate-fade-in">
                <span>{hoverFeeName}</span>
                <span>+₹{hoverFee}</span>
              </div>
            )}

            {/* DYNAMIC SMALL FEES LIST */}
            {dynamicFees.map((f, index) => (
              <div key={index} className="cart-fee-row penalty flex justify-between text-red-light font-bold bg-red/5 p-1.5 px-2 rounded border border-red/10 animate-fade-in">
                <span>{f.name}</span>
                <span>+₹{f.amount}</span>
              </div>
            ))}
          </div>

          <div className="cart-total border-t-2 border-double border-charcoal pt-4 flex justify-between items-baseline">
            <span className="font-display font-black text-lg">Total Loss Allocation:</span>
            <span className="font-mono text-2xl font-black text-orange">₹{total}</span>
          </div>

          <div className="tiny-phone-disclaimer font-mono text-[9px] text-cream-dim/30 leading-normal pt-2">
            * Submitting payment guarantees legal transfer of capital. Food safety configurations remain entirely random.
          </div>
        </div>
      </div>

      {/* MODAL 1: MENTAL HEALTH SECURITY CHECKUP */}
      {activeModal === 'verification' && (
        <div className="chaos-modal-overlay fixed inset-0 bg-bg/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="chaos-expired-modal bg-bg-card border-2 border-red max-w-md w-full p-6 rounded-xl shadow-2xl relative space-y-4">
            <div className="chaos-expired-subtitle font-mono text-[10px] text-red-light tracking-widest uppercase font-bold">
              SECURITY PROTOCOL FAULT // CRITICAL
            </div>
            <div className="chaos-expired-title font-display font-black text-2xl tracking-tight">
              Happiness Verification
            </div>
            <div className="chaos-expired-body text-sm text-cream-dim leading-relaxed">
              Select all data fields containing active vectors of <b>genuine organic internal happiness</b> to verify you possess the emotional capacity to complete this order pipeline.
            </div>

            <div className="verification-grid grid grid-cols-2 gap-3 pt-2">
              {VERIFICATION_EMOJIS.map((e) => {
                const isSelected = selectedEmojis.includes(e.id);
                return (
                  <div
                    key={e.id}
                    className={`verification-item border p-3 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none transition-all text-center ${
                      isSelected 
                        ? 'bg-red/10 border-red text-cream font-bold scale-[1.02]' 
                        : 'bg-charcoal border-charcoal-light text-cream-dim hover:border-charcoal hover:bg-charcoal-light/50'
                    }`}
                    onClick={(e) => {
                      dispatchEmoji('random_click', e)
                      toggleEmoji(e.id)
                    }}
                  >
                    <span className="verification-emoji text-3xl">{e.emoji}</span>
                    <span className="verification-caption font-mono text-[9px] tracking-wide uppercase">{e.caption}</span>
                  </div>
                )
              })}
            </div>

            <div className="chaos-expired-buttons flex flex-col sm:flex-row gap-2 pt-4">
              <button 
                className="chaos-expired-btn bg-red hover:bg-red-light text-cream font-bold py-3 px-4 rounded text-xs uppercase flex-1 transition-colors" 
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  handleVerificationSubmit()
                }}
              >
                Submit Metric
              </button>
              <button
                className="chaos-expired-btn bg-transparent border border-charcoal-light hover:border-cream-dim text-cream-dim hover:text-cream font-mono text-[10px] py-3 px-4 rounded flex-1 transition-all"
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  setSurchargeFees(prev => ({ ...prev, happinessFine: 120 }))
                  alert("⚠️ Surcharge Applied: Challenge bypassed. A ₹120 'Lack of Happiness' database calculation levy has been appended to your layout invoice.")
                  handleVerificationSubmit()
                }}
              >
                Skip Verification (+₹120)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LAYERED CONFIRMATIONS */}
      {activeModal === 'confirm-1' && (
        <div className="chaos-modal-overlay fixed inset-0 bg-bg/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="chaos-expired-modal bg-bg-card border-2 border-orange max-w-md w-full p-6 rounded-xl shadow-2xl space-y-4">
            <div className="chaos-expired-subtitle font-mono text-[10px] text-orange tracking-widest uppercase font-bold">
              FINAL SYSTEM AUTHORIZATION [1/3]
            </div>
            <div className="chaos-expired-title font-display font-black text-2xl tracking-tight">
              Stomach Demolition Protocol
            </div>
            <div className="chaos-expired-body text-sm text-cream-dim leading-relaxed">
              You are authorizing an irreversible financial ledger transfer of <b className="text-orange">₹{total}</b> for item batches that local telemetric reports indicate are highly probable to cause profound disappointment.
              <br /><br />
              Do you assume full existential, gastrointestinal, and operational liability for this transfer?
            </div>
            <div className="chaos-expired-buttons flex flex-col sm:flex-row gap-2 pt-2">
              <button 
                className="chaos-expired-btn bg-orange hover:bg-orange-light text-cream font-bold py-3 px-4 rounded text-xs uppercase flex-1 transition-colors animate-pulse" 
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  setActiveModal('confirm-2')
                }}
              >
                Yes, Destroy My Stomach
              </button>
              <button
                className="chaos-expired-btn bg-transparent border border-charcoal-light hover:border-red text-cream-dim hover:text-red-light font-mono text-[10px] py-3 px-4 rounded flex-1 transition-all"
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  alert("Impatience logged. Appending ₹50 'Decision Reluctance' fee to baseline schema and shifting viewport back to root container...")
                  setSurchargeFees(prev => ({ ...prev, impatienceFee: prev.impatienceFee + 50 }))
                  setActiveModal(null)
                }}
              >
                Rethink Life Decisions
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'confirm-2' && (
        <div className="chaos-modal-overlay fixed inset-0 bg-bg/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="chaos-expired-modal bg-bg-card border-2 border-orange max-w-md w-full p-6 rounded-xl shadow-2xl space-y-4">
            <div className="chaos-expired-subtitle font-mono text-[10px] text-orange tracking-widest uppercase font-bold">
              FINAL SYSTEM AUTHORIZATION [2/3]
            </div>
            <div className="chaos-expired-title font-display font-black text-2xl tracking-tight">
              Are you REALLY, REALLY sure?
            </div>
            <div className="chaos-expired-body text-sm text-cream-dim leading-relaxed">
              We do not accept refunds, returns, or even general complaints. By proceeding, you agree that your future self has no legal right to be angry at us for ordering cold pizza at 3:00 AM.
            </div>
            <div className="chaos-expired-buttons flex flex-col sm:flex-row gap-2 pt-2">
              <button 
                className="chaos-expired-btn bg-orange hover:bg-orange-light text-cream font-bold py-3 px-4 rounded text-xs uppercase flex-1 transition-colors font-black" 
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  setActiveModal('confirm-3')
                }}
              >
                Yes, I Am Prepared To Regret
              </button>
              <button
                className="chaos-expired-btn bg-transparent border border-charcoal-light hover:border-red text-cream-dim hover:text-red-light font-mono text-[10px] py-3 px-4 rounded flex-1 transition-all"
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  alert("Reluctance fine adjusted. Appending ₹50 to invoice.")
                  setSurchargeFees(prev => ({ ...prev, impatienceFee: prev.impatienceFee + 50 }))
                  setActiveModal(null)
                }}
              >
                Let me starve in peace
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'confirm-3' && (
        <div className="chaos-modal-overlay fixed inset-0 bg-bg/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="chaos-expired-modal bg-bg-card border-2 border-orange max-w-md w-full p-6 rounded-xl shadow-2xl space-y-4">
            <div className="chaos-expired-subtitle font-mono text-[10px] text-orange tracking-widest uppercase font-bold">
              FINAL SYSTEM AUTHORIZATION [3/3]
            </div>
            <div className="chaos-expired-title font-display font-black text-2xl tracking-tight">
              You understand the consequences?
            </div>
            <div className="chaos-expired-body text-sm text-cream-dim leading-relaxed">
              This is your last chance to close this browser tab, open your refrigerator, and cook a healthy organic salad at home. Are you absolutely certain you want a delivery driver to launch food at your roof?
            </div>
            <div className="chaos-expired-buttons flex flex-col sm:flex-row gap-2 pt-2">
              <button 
                className="chaos-expired-btn bg-orange hover:bg-orange-light text-cream font-bold py-3 px-4 rounded text-xs uppercase flex-1 transition-colors font-black" 
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  setActiveModal('security-check')
                }}
              >
                Destroy My Stomach Now
              </button>
              <button
                className="chaos-expired-btn bg-transparent border border-charcoal-light hover:border-red text-cream-dim hover:text-red-light font-mono text-[10px] py-3 px-4 rounded flex-1 transition-all"
                onClick={(e) => {
                  dispatchEmoji('random_click', e)
                  alert("Crisis averted! Returning to form.")
                  setActiveModal(null)
                }}
              >
                Go Back!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: FAKE SECURITY SCANNING OVERLAY */}
      {activeModal === 'security-check' && (
        <div className="chaos-modal-overlay fixed inset-0 bg-bg/95 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="chaos-expired-modal bg-bg-card border-2 border-orange max-w-md w-full p-8 rounded-xl shadow-2xl text-center space-y-6">
            <div className="text-4xl animate-bounce">🤖</div>
            <div className="chaos-expired-title font-display font-black text-2xl tracking-tight text-orange">
              AI CHOICE SECURITY EVALUATION
            </div>
            
            <div className="w-full bg-charcoal border border-charcoal-light h-4 rounded-full overflow-hidden relative">
              <div 
                className="bg-orange h-full transition-all duration-300 ease-out" 
                style={{ width: `${securityProgress}%` }}
              ></div>
            </div>
            
            <div className="font-mono text-xs text-cream-dim leading-relaxed h-12 flex items-center justify-center italic">
              {securityText}
            </div>

            <div className="font-mono text-[9px] text-cream-dim/30">
              * AI choice alignment metric requires secure ledger confirmation protocols.
            </div>
          </div>
        </div>
      )}

      {/* RANDOM ALERTS */}
      {randomAlert && (
        <div className="fixed bottom-6 right-6 bg-bg-card border-2 border-red p-4 rounded-lg shadow-2xl max-w-sm z-[9999] animate-fade-in flex items-center gap-3">
          <span className="text-xl animate-pulse">🛎️</span>
          <div className="font-mono text-xs text-cream">{randomAlert}</div>
        </div>
      )}
    </div>
  )
}