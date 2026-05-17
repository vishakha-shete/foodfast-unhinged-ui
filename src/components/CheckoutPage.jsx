// CheckoutPage.jsx - The Corporate Nightmare Simulator
import React, { useState, useRef } from 'react'

export default function CheckoutPage({ cart = [], setCart, navigateTo }) {
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponFeeApplied, setCouponFeeApplied] = useState(false)
  const [cardName, setCardName] = useState('')
  const [cardNums, setCardNums] = useState(['', '', '', ''])
  const [expiryMonth, setExpiryMonth] = useState('12') // Default out of order
  const [expiryYear, setExpiryYear] = useState('2032')
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null) // 'verification' | 'confirm'
  const [selectedEmojis, setSelectedEmojis] = useState([])
  const [surchargeFees, setSurchargeFees] = useState({
    couponCharge: 0,
    happinessFine: 0,
    impatienceFee: 0,
  })

  const cardRefs = [useRef(), useRef(), useRef(), useRef()]

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

  const handleFeeHover = () => {
    if (!hoverFee && Math.random() > 0.4) {
      const fees = [
        { name: "Breathing Fee", amount: 15 },
        { name: "Emotional Damage Fee", amount: 200 },
        { name: "Existing Fee", amount: 1 }
      ]
      const f = fees[Math.floor(Math.random() * fees.length)]
      setHoverFee(f.amount)
      setHoverFeeName(f.name)
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
    }
  }

  // Auto-correct phone number to include a suspicious country code
  const handlePhoneBlur = () => {
    if (!phone) return
    if (!phone.startsWith('+')) {
      setPhone(`+880 (Suspicious) ${phone}`)
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

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SORRY50' || couponCode.toUpperCase() === 'DISAPPOINTMENT50') {
      setCouponApplied(true)
      setSurchargeFees(prev => ({ ...prev, couponCharge: 75 }))
      setCouponFeeApplied(true)
      alert("🎟️ Coupon applied successfully! ₹50 discount registered.\n\nNote: A ₹75 coupon validation processing surcharge has been added to cover the database index read cost.")
    } else {
      alert("❌ Coupon Code not found in our directory of sorry gestures. Please try 'SORRY50' or admit defeat.")
    }
  }

  // Cost calculation engine
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const itemQuantity = cart.reduce((acc, item) => acc + item.qty, 0)
  const inflationFee = itemQuantity * 49
  const therapyFee = itemQuantity > 0 ? 80 : 0
  const airFee = itemQuantity > 0 ? 50 : 0
  const trafficFee = 185

  const discount = couponApplied ? 50 : 0
  const total = subtotal + trafficFee + inflationFee + therapyFee + airFee + 
                surchargeFees.couponCharge + surchargeFees.happinessFine + surchargeFees.impatienceFee - discount + hoverFee

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (clickCount < buttonTexts.length - 1) {
      setClickCount(prev => prev + 1)
      return
    }
    if (!address || !phone || !cardName || cardNums.some(n => n.length < 4)) {
      alert("❌ Validation failure. Please fill in all required corporate compliance fields.")
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
    setActiveModal('confirm')
  }

  const completeOrder = () => {
    setActiveModal(null)
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

          {/* STEP 2: COUPON TAX TRAP */}
          <div className="space-y-4">
            <div className="checkout-step-title flex items-center gap-3 border-b border-charcoal pb-2">
              <span className="checkout-step-num font-mono text-xs bg-olive/20 text-olive px-2 py-0.5 rounded border border-olive/30">Step 2</span>
              <span className="font-display font-bold text-lg">Broken Coupon Gateway</span>
            </div>
            
            <div className="checkout-field flex flex-col gap-1.5">
              <label className="checkout-label text-xs font-mono text-cream-dim/70">Enter 'SORRY50' or another formal gesture of defeat</label>
              <div className="coupon-area flex gap-2">
                <input
                  type="text"
                  className="checkout-input bg-charcoal border border-charcoal-light rounded p-3 text-sm focus:border-orange outline-none transition-colors flex-1"
                  placeholder="e.g. SORRY50"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button 
                  type="button" 
                  className="coupon-btn bg-charcoal-light hover:bg-orange border border-charcoal px-5 py-3 rounded text-sm transition-all font-semibold active:scale-[0.98]"
                  onClick={applyCoupon}
                >
                  Apply Guilt
                </button>
              </div>
              <span className="btn-tiny-label font-mono text-[9px] text-cream-dim/30 mt-1 block">
                * coupon execution cycles may initiate direct platform computational overhead penalties.
              </span>
            </div>
          </div>

          {/* STEP 3: HIGH-STRESS CARD COMPLIANCE */}
          <div className="space-y-4">
            <div className="checkout-step-title flex items-center gap-3 border-b border-charcoal pb-2">
              <span className="checkout-step-num font-mono text-xs bg-orange/20 text-orange-light px-2 py-0.5 rounded border border-orange/30">Step 3</span>
              <span className="font-display font-bold text-lg">Confusing Card Interface</span>
            </div>
            
            <div className="checkout-input-grid grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onChange={(e) => setExpiryMonth(e.target.value)}
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
          </div>

          <button 
            type="submit" 
            className="cart-checkout-btn w-full bg-orange hover:bg-orange-light text-cream font-bold py-4 px-6 rounded-lg shadow-lg tracking-wide transition-colors uppercase text-sm mt-4 active:scale-[0.99]"
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

          <div className="cart-fees space-y-2.5 font-mono text-xs text-cream-dim" onMouseEnter={handleFeeHover} onMouseLeave={handleFeeLeave}>
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
                <span>Coupon Applied ('SORRY50')</span>
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
                    onClick={() => toggleEmoji(e.id)}
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
                onClick={handleVerificationSubmit}
              >
                Submit Metric
              </button>
              <button
                className="chaos-expired-btn bg-transparent border border-charcoal-light hover:border-cream-dim text-cream-dim hover:text-cream font-mono text-[10px] py-3 px-4 rounded flex-1 transition-all"
                onClick={() => {
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

      {/* MODAL 2: AGREEMENT ACCIDENT LAYER */}
      {activeModal === 'confirm' && (
        <div className="chaos-modal-overlay fixed inset-0 bg-bg/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fade-in">
          <div className="chaos-expired-modal bg-bg-card border-2 border-orange max-w-md w-full p-6 rounded-xl shadow-2xl space-y-4">
            <div className="chaos-expired-subtitle font-mono text-[10px] text-orange tracking-widest uppercase font-bold">
              FINAL SYSTEM AUTHORIZATION
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
                className="chaos-expired-btn bg-orange hover:bg-orange-light text-cream font-bold py-3 px-4 rounded text-xs uppercase flex-1 transition-colors" 
                onClick={completeOrder}
              >
                Yes, Destroy My Stomach
              </button>
              <button
                className="chaos-expired-btn bg-transparent border border-charcoal-light hover:border-red text-cream-dim hover:text-red-light font-mono text-[10px] py-3 px-4 rounded flex-1 transition-all"
                onClick={() => {
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
    </div>
  )
}