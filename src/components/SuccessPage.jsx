// SuccessPage.jsx - Visually stunning, emotionally hollow receipt
import React, { useState, useEffect } from 'react'

export default function SuccessPage({ navigateTo, setCart }) {
  const [currentStep, setCurrentStep] = useState(2) // Start at "Driver assigned"
  const [driverExcuses, setDriverExcuses] = useState('Driver is currently arguing with dispatcher about the meaning of speed.')

  const receipt = window.finalReceipt || {
    cart: [],
    fees: {
      subtotal: 0,
      trafficFee: 0,
      inflationFee: 0,
      therapyFee: 0,
      airFee: 0,
      couponDiscount: 0,
      couponCharge: 0,
      happinessFine: 0,
      impatienceFee: 0,
      total: 0
    }
  }

  // Sarcastic driver update cycles
  useEffect(() => {
    const excuses = [
      'Driver saw a beautiful cloud and stopped to appreciate it. ETA: Irrelevant.',
      'Driver has entered a different dimension. ETA: Calculating quantum variables.',
      'Driver stopped to buy a lottery ticket. If they win, you will definitely not get your food.',
      'Driver started questioning capitalism.',
      'Driver is eating a fry from your container to test for quality assurance. Approved!'
    ]

    let index = 0
    const interval = setInterval(() => {
      if (currentStep === 2) {
        // Advance step to dispatched after some time
        setCurrentStep(3)
      }
      setDriverExcuses(excuses[index])
      index = (index + 1) % excuses.length
    }, 8000)

    return () => clearInterval(interval)
  }, [currentStep])

  const handleReturnHome = () => {
    // Clear cart and go back
    setCart([])
    navigateTo('home')
  }

  const handleSupportClick = () => {
    alert("💬 CUSTOMER SUPPORT ANNOUNCEMENT:\n\nOur chat operators are currently on a mandatory group crying session to recover from high emotional load. Support is estimated to resume in October.")
  }

  return (
    <div className="flow-container">
      <div className="success-layout">
        
        {/* Success Status Header */}
        <div className="success-badge">🥴</div>
        <h1 className="flow-title" style={{ fontSize: '2rem' }}>
          Congratulations?
        </h1>
        <p className="flow-subtitle" style={{ margin: '0 auto 1.5rem', justifyContent: 'center' }}>
          Transaction Complete. Emotional Damage En Route.
        </p>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--cream-dim)', lineHeight: '1.6' }}>
          We have successfully charged your credit card. We are currently searching for a delivery partner who is willing to operate under these stressful neighborhood conditions.
        </p>

        {/* Live Order Tracker */}
        <div className="tracking-timeline">
          <div className="receipt-title" style={{ borderBottomColor: 'rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
            Live Regret Tracker
          </div>
          
          <div className={`tracking-step ${currentStep >= 0 ? 'done' : ''}`}>
            <div className="tracking-dot"></div>
            <div className="tracking-info">
              <span className="tracking-status">Order Received (Kitchen Alert)</span>
              <span className="tracking-time">Chef is currently sighing heavily in front of the grill.</span>
            </div>
          </div>

          <div className={`tracking-step ${currentStep >= 1 ? 'done' : ''}`}>
            <div className="tracking-dot"></div>
            <div className="tracking-info">
              <span className="tracking-status">Food Prepared (Questionable Ingredients)</span>
              <span className="tracking-time">Package assembled and cooled to room temperature.</span>
            </div>
          </div>

          <div className={`tracking-step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'done' : ''}`}>
            <div className="tracking-dot"></div>
            <div className="tracking-info">
              <span className="tracking-status">Driver Assigned (Arguing Phase)</span>
              <span className="tracking-time">{driverExcuses}</span>
            </div>
          </div>

          <div className={`tracking-step ${currentStep === 3 ? 'active' : ''}`}>
            <div className="tracking-dot"></div>
            <div className="tracking-info">
              <span className="tracking-status">Dispatched (Lost Phase)</span>
              <span className="tracking-time">Driver is wandering near a labyrinth of trees. ETA: Incalculable.</span>
            </div>
          </div>
        </div>

        {/* Cursed receipt break-down table */}
        <div className="success-receipt">
          <div className="receipt-title">
            Tax Invoice & Statement of Sorrow
          </div>
          
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Item Descripton</th>
                <th style={{ textAlign: 'right' }}>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {receipt.cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.qty}x {item.name} (Gastro Risk)</td>
                  <td className="price">₹{item.price * item.qty}</td>
                </tr>
              ))}
              <tr>
                <td>Base Delivery Congestion Levy</td>
                <td className="price">₹{receipt.fees.trafficFee}</td>
              </tr>
              <tr>
                <td>Neighborhood Dynamic Inflation Surcharge</td>
                <td className="price">₹{receipt.fees.inflationFee}</td>
              </tr>
              <tr>
                <td>Driver Emotional Therapy Contribution</td>
                <td className="price">₹{receipt.fees.therapyFee}</td>
              </tr>
              <tr>
                <td>Air Ingestion Surcharge</td>
                <td className="price">₹{receipt.fees.airFee}</td>
              </tr>
              
              {receipt.fees.couponDiscount > 0 && (
                <tr style={{ color: '#4caf50' }}>
                  <td>Apology Code Applied ('SORRYBRO')</td>
                  <td className="price">-₹{receipt.fees.couponDiscount}</td>
                </tr>
              )}
              {receipt.fees.couponCharge > 0 && (
                <tr style={{ color: 'var(--red-light)' }}>
                  <td>Coupon Computational Read Tax</td>
                  <td className="price">+₹{receipt.fees.couponCharge}</td>
                </tr>
              )}
              {receipt.fees.happinessFine > 0 && (
                <tr style={{ color: 'var(--red-light)' }}>
                  <td>Lack of Happiness Verification Penalty</td>
                  <td className="price">+₹{receipt.fees.happinessFine}</td>
                </tr>
              )}
              {receipt.fees.impatienceFee > 0 && (
                <tr style={{ color: 'var(--red-light)' }}>
                  <td>Impatience Surcharge Levy</td>
                  <td className="price">+₹{receipt.fees.impatienceFee}</td>
                </tr>
              )}

              <tr>
                <td className="total">Charged Total</td>
                <td className="total price">₹{receipt.fees.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Navigation Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <button 
            className="cart-checkout-btn" 
            style={{ flex: 1 }}
            onClick={handleReturnHome}
          >
            Order More Regret
          </button>
          <button 
            className="cart-checkout-btn" 
            style={{ flex: 1, background: 'transparent', border: '1px solid var(--charcoal-light)', color: 'var(--cream)' }}
            onClick={handleSupportClick}
          >
            Contact Therapy Chat (Disabled)
          </button>
        </div>

        <div className="tiny-phone-disclaimer">
          * FoodFast Inc. does not guarantee food delivery, digestion, edible quality, or refund eligibility under cosmic conditions.
        </div>
      </div>
    </div>
  )
}
