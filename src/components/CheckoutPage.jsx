// CheckoutPage.jsx - The Corporate Nightmare Simulator
import React, { useState, useRef, useEffect } from 'react'

export default function CheckoutPage({ cart, setCart, navigateTo }) {
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
  const [activeModal, setActiveModal] = useState(null) // 'verification', 'confirm', 'success'
  const [selectedEmojis, setSelectedEmojis] = useState([])
  const [surchargeFees, setSurchargeFees] = useState({
    couponCharge: 0,
    happinessFine: 0,
    impatienceFee: 0,
  })

  const cardRefs = [useRef(), useRef(), useRef(), useRef()]

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
      // Prepend suspicious country code
      setPhone(`+880 (Suspicious) ${phone}`)
    }
  }

  // Handle input card field changes - smart jumps
  const handleCardChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 4)
    const newNums = [...cardNums]
    newNums[index] = cleanValue
    setCardNums(newNums)

    if (cleanValue.length === 4) {
      if (index === 0) {
        // Crime: Jumps to index 2 instead of index 1!
        cardRefs[2].current?.focus()
        alert("🔒 SECURITY CRIME: High-entropy key alignment enabled. Cursor moved to Block 3.")
      } else if (index === 2) {
        // Go back to 1
        cardRefs[1].current?.focus()
      } else if (index === 1) {
        cardRefs[3].current?.focus()
      }
    }
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SORRY50' || couponCode.toUpperCase() === 'DISAPPOINTMENT50') {
      setCouponApplied(true)
      // Add coupon processing fee that is larger than the discount!
      setSurchargeFees(prev => ({
        ...prev,
        couponCharge: 75
      }))
      setCouponFeeApplied(true)
      alert("🎟️ Coupon applied successfully! ₹50 discount registered.\n\nNote: A ₹75 coupon validation processing surcharge has been added to cover the database index read cost.")
    } else {
      alert("❌ Coupon Code not found in our directory of sorry gestures. Please try 'SORRY50' or admit your defeat.")
    }
  }

  // Calculate fees
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const itemQuantity = cart.reduce((acc, item) => acc + item.qty, 0)
  const inflationFee = itemQuantity * 49
  const therapyFee = itemQuantity > 0 ? 80 : 0
  const airFee = itemQuantity > 0 ? 50 : 0
  const trafficFee = 185 // Base fee for checkout

  const discount = couponApplied ? 50 : 0
  const total = subtotal + trafficFee + inflationFee + therapyFee + airFee + 
                surchargeFees.couponCharge + surchargeFees.happinessFine + surchargeFees.impatienceFee - discount

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!address || !phone || !cardName || cardNums.some(n => n.length < 4)) {
      alert("❌ Validation failure. Please fill in all required corporate compliance fields.")
      return
    }
    // Launch the psychological verification modal
    setActiveModal('verification')
  }

  const toggleEmoji = (id) => {
    setSelectedEmojis(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleVerificationSubmit = () => {
    // Since all emojis are sad, selecting any of them fails the "happiness" check!
    setSurchargeFees(prev => ({
      ...prev,
      happinessFine: 120
    }))
    setActiveModal('confirm')
  }

  const completeOrder = () => {
    setActiveModal(null)
    
    // Save final receipt parameters in window so SuccessPage can render them
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

    // Navigate to success page
    navigateTo('success')
  }

  return (
    <div className="flow-container">
      <h1 className="flow-title">
        The <em>Nightmare</em> Checkout
      </h1>
      <div className="flow-subtitle">
        Phase 3: Financial Humiliation Simulator
      </div>

      <div className="checkout-layout">
        {/* Left: Input Details Form */}
        <form onSubmit={handlePlaceOrder} className="checkout-card">
          
          {/* Shipping Address */}
          <div>
            <div className="checkout-step-title">
              <span className="checkout-step-num">Step 1</span>
              <span>Where should we lose your order?</span>
            </div>
            <div className="checkout-input-grid">
              <div className="checkout-field full">
                <label className="checkout-label">Delivery Address (will auto-adjust for realism)</label>
                <input
                  type="text"
                  required
                  className="checkout-input"
                  placeholder="e.g. 12 Pine Street, Apt 4B"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={handleAddressBlur}
                />
              </div>
              <div className="checkout-field full">
                <label className="checkout-label">Suspicious Phone Number (for spam calls)</label>
                <input
                  type="text"
                  required
                  className="checkout-input"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={handlePhoneBlur}
                />
              </div>
              <label className="checkout-checkbox-label">
                <input type="checkbox" required />
                <span>I agree to allow the driver to throw my food package onto my roof if they cannot find the door.</span>
              </label>
            </div>
          </div>

          {/* Coupon Surcharge */}
          <div>
            <div className="checkout-step-title">
              <span className="checkout-step-num">Step 2</span>
              <span>Broken Coupon Portal</span>
            </div>
            <div className="checkout-field full">
              <label className="checkout-label">Enter 'SORRY50' or another gesture of apology</label>
              <div className="coupon-area">
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="e.g. SORRY50"
                  style={{ flex: 1 }}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="button" className="coupon-btn" onClick={applyCoupon}>
                  Apply Guilt
                </button>
              </div>
              <span className="btn-tiny-label" style={{ textAlign: 'left', marginTop: '4px' }}>
                * applying coupons may result in computational surcharges
              </span>
            </div>
          </div>

          {/* payment detail */}
          <div>
            <div className="checkout-step-title">
              <span className="checkout-step-num">Step 3</span>
              <span>Confusing Card Processing</span>
            </div>
            <div className="checkout-input-grid">
              <div className="checkout-field full">
                <label className="checkout-label">Full Name on Card (required for target advertising)</label>
                <input
                  type="text"
                  required
                  className="checkout-input"
                  placeholder="e.g. Priya Mukherjee"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              
              <div className="checkout-field full">
                <label className="checkout-label">Card Number (Blocks of 4 digits - Security Key Jumps Active)</label>
                <div className="card-number-fields">
                  {cardNums.map((num, i) => (
                    <input
                      key={i}
                      ref={cardRefs[i]}
                      type="text"
                      required
                      placeholder="0000"
                      className="checkout-input card-number-input"
                      value={num}
                      onChange={(e) => handleCardChange(i, e.target.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="checkout-field">
                <label className="checkout-label">Expiry Month (Chaotic Order)</label>
                <select 
                  className="checkout-input" 
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                >
                  {CHAOTIC_MONTHS.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div className="checkout-field">
                <label className="checkout-label">Expiry Year</label>
                <select 
                  className="checkout-input"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                >
                  <option value="2032">2032 (Optimistic)</option>
                  <option value="2033">2033 (Unlikely)</option>
                  <option value="2034">2034 (Solar Flare)</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="cart-checkout-btn" style={{ width: '100%' }}>
            Initiate Stomach Demolition
          </button>
        </form>

        {/* Right: Interactive Invoice Summary */}
        <div className="cart-sidebar" style={{ transform: 'rotate(0.5deg)' }}>
          <div className="cart-title">
            <span>Corporate Invoice</span>
          </div>

          <div className="cart-fees">
            <div className="cart-fee-row">
              <span>Items Total ({itemQuantity})</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="cart-fee-row">
              <span>Base Delivery Charge</span>
              <span>₹{trafficFee}</span>
            </div>
            <div className="cart-fee-row highlight">
              <span>Dynamic Neighborhood Inflation Tax</span>
              <span>₹{inflationFee}</span>
            </div>
            <div className="cart-fee-row">
              <span>Driver Therapy Contribution</span>
              <span>₹{therapyFee}</span>
            </div>
            <div className="cart-fee-row">
              <span>Air Ingestion Surcharge</span>
              <span>₹{airFee}</span>
            </div>

            {/* Surcharges from interactions */}
            {couponApplied && (
              <div className="cart-fee-row" style={{ color: '#4caf50' }}>
                <span>Coupon Applied ('SORRY50')</span>
                <span>-₹{discount}</span>
              </div>
            )}
            {couponFeeApplied && (
              <div className="cart-fee-row penalty">
                <span>Coupon Read Surcharge</span>
                <span>+₹{surchargeFees.couponCharge}</span>
              </div>
            )}
            {surchargeFees.happinessFine > 0 && (
              <div className="cart-fee-row penalty">
                <span>Lack of Happiness Security Fine</span>
                <span>+₹{surchargeFees.happinessFine}</span>
              </div>
            )}
            {surchargeFees.impatienceFee > 0 && (
              <div className="cart-fee-row penalty">
                <span>Impatience Processing Levy</span>
                <span>+₹{surchargeFees.impatienceFee}</span>
              </div>
            )}
          </div>

          <div className="cart-total">
            <span>Amount Charged:</span>
            <span>₹{total}</span>
          </div>

          <div className="tiny-phone-disclaimer" style={{ marginTop: '10px' }}>
            * by submitting payment you wave the right to receive edible food, warm temperatures, or friendly delivery partners.
          </div>
        </div>
      </div>

      {/* Corporate Verification Spam Modal */}
      {activeModal === 'verification' && (
        <div className="chaos-modal-overlay">
          <div className="chaos-expired-modal" style={{ width: '480px' }}>
            <div className="chaos-expired-subtitle" style={{ color: 'var(--red-light)' }}>
              SECURITY CHALLENGE
            </div>
            <div className="chaos-expired-title">
              Happiness Verification
            </div>
            <div className="chaos-expired-body">
              Please select all cards containing <b>happiness</b> to prove you are emotionally equipped to receive this delivery.
            </div>

            <div className="verification-grid">
              {VERIFICATION_EMOJIS.map((e) => (
                <div
                  key={e.id}
                  className={`verification-item ${selectedEmojis.includes(e.id) ? 'selected' : ''}`}
                  onClick={() => toggleEmoji(e.id)}
                >
                  <span className="verification-emoji">{e.emoji}</span>
                  <span className="verification-caption">{e.caption}</span>
                </div>
              ))}
            </div>

            <div className="chaos-expired-buttons" style={{ marginTop: '14px' }}>
              <button className="chaos-expired-btn" onClick={handleVerificationSubmit}>
                Submit Verification
              </button>
              <button
                className="chaos-expired-btn"
                style={{ background: 'transparent', border: '1px solid var(--charcoal-light)' }}
                onClick={() => {
                  setSurchargeFees(prev => ({
                    ...prev,
                    happinessFine: 120
                  }))
                  alert("⚠️ Surcharge Applied: You skipped the security challenge. A ₹120 'Lack of Happiness' processing fine has been appended to your invoice.")
                  handleVerificationSubmit()
                }}
              >
                Skip Verification (+₹120)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {activeModal === 'confirm' && (
        <div className="chaos-modal-overlay">
          <div className="chaos-expired-modal">
            <div className="chaos-expired-subtitle">
              FINAL AGREEMENT
            </div>
            <div className="chaos-expired-title">
              Stomach Demolition Protocol
            </div>
            <div className="chaos-expired-body">
              You are about to pay <b>₹{total}</b> for food that our ratings show is statistically likely to make you sigh.
              <br /><br />
              Do you accept full spiritual and gastrointestinal liability for this transaction?
            </div>
            <div className="chaos-expired-buttons">
              <button className="chaos-expired-btn" onClick={completeOrder}>
                Yes, Destroy My Stomach
              </button>
              <button
                className="chaos-expired-btn"
                style={{ background: 'transparent', border: '1px solid var(--charcoal-light)' }}
                onClick={() => {
                  alert("Impatience detected. Adding ₹50 'Decision Reluctance' fee and returning to cart...")
                  setSurchargeFees(prev => ({
                    ...prev,
                    impatienceFee: prev.impatienceFee + 50
                  }))
                  setActiveModal(null)
                }}
              >
                Let me rethink my life
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
