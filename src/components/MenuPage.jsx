// MenuPage.jsx - Food selection with Smart UX Crimes
import React, { useState } from 'react'

const MENU_ITEMS = [
  {
    id: 'burger',
    name: 'Mystery Burger',
    emoji: '🍔',
    desc: 'Meat-adjacent patty, premium city dust, and a single tear from our sleep-deprived head chef.',
    price: 399,
    rating: '2.3 ★ (Debatable)',
    warning: 'Eating this has been shown to cause vivid hallucinations of your high school algebra teacher.'
  },
  {
    id: 'pizza',
    name: 'Regret Pizza',
    emoji: '🍕',
    desc: 'Soggy crust topped with feelings of inadequacy, questionable cheese, and a drizzle of local rain.',
    price: 599,
    rating: '1.8 ★ (Filtered)',
    warning: 'Our research indicates 94% of users cry before eating the third slice. Proceed?'
  },
  {
    id: 'taco',
    name: 'Trust Issues Taco',
    emoji: '🌮',
    desc: 'Ingredients classified under national security law. Tastes like uncertainty and mild crunch.',
    price: 249,
    rating: '3.1 ★ (Highly suspect)',
    warning: 'The filling is classified. By clicking proceed, you waive the right to know what is in your mouth.'
  },
  {
    id: 'sushi',
    name: 'Suspicious Sushi',
    emoji: '🍣',
    desc: 'Pre-warmed raw fish of debatable origin. Roll the dice on your digestive tract.',
    price: 799,
    rating: '0.4 ★ (Award-winning)',
    warning: 'CRITICAL: Eating raw fish of unknown origin requires signing our Digital Liability Waiver.'
  },
  {
    id: 'fries',
    name: 'Cold Fries of Sorrow',
    emoji: '🍟',
    desc: 'Intentionally pre-cooled to room temperature. Comes with a side of passive-aggressive dipping sauce.',
    price: 149,
    rating: '1.2 ★ (Soggy)',
    warning: 'These fries have been cold since they were harvested. They will not get warmer.'
  }
]

export default function MenuPage({ cart, setCart, navigateTo }) {
  const [activeWarning, setActiveWarning] = useState(null)
  const [loadingItemId, setLoadingItemId] = useState(null)
  const [trafficFee, setTrafficFee] = useState(150)

  const handleAddClick = (item) => {
    // Show premium, smart warning dialog first for emotional manipulation
    setActiveWarning(item)
  }

  const confirmAdd = (item) => {
    setActiveWarning(null)
    setLoadingItemId(item.id)

    // Simulate fake loading delay for annoying but functional UX
    setTimeout(() => {
      setCart(prev => {
        const existing = prev.find(i => i.id === item.id)
        if (existing) {
          return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
        }
        return [...prev, { ...item, qty: 1 }]
      })
      setLoadingItemId(null)
      
      // Auto-increment traffic fee due to "high load on database" (pure evil)
      setTrafficFee(prev => prev + Math.floor(Math.random() * 35) + 15)
    }, 800)
  }

  const updateQty = (itemId, delta) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = i.qty + delta
          return newQty > 0 ? { ...i, qty: newQty } : null
        }
        return i
      }).filter(Boolean)
    })
  }

  // Fees calculation
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const itemQuantity = cart.reduce((acc, item) => acc + item.qty, 0)
  const inflationFee = itemQuantity * 49
  const therapyFee = itemQuantity > 0 ? 80 : 0
  const airFee = itemQuantity > 0 ? 50 : 0
  const total = subtotal + trafficFee + inflationFee + therapyFee + airFee

  return (
    <div className="flow-container">
      <h1 className="flow-title">
        Choose Your <em>Regret</em>
      </h1>
      <div className="flow-subtitle">
        Phase 2: Appetite Self-Sabotage
      </div>

      <div className="menu-layout">
        {/* Left: Food Cards */}
        <div className="menu-grid">
          {MENU_ITEMS.map((item) => (
            <div className="menu-card" key={item.id}>
              <div className="menu-card-header">
                <span className="menu-card-emoji">{item.emoji}</span>
                <span className="menu-card-rating">{item.rating}</span>
              </div>
              <div className="menu-card-title">{item.name}</div>
              <p className="menu-card-desc">{item.desc}</p>
              <div className="menu-card-footer">
                <span className="menu-card-price">₹{item.price}</span>
                <button 
                  className="menu-card-btn"
                  onClick={() => handleAddClick(item)}
                  disabled={loadingItemId !== null}
                >
                  {loadingItemId === item.id ? 'Tuning tastebuds...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Cart Summary */}
        <div className="cart-sidebar">
          <div className="cart-title">
            <span>Your Regrets</span>
            <span>[{itemQuantity}]</span>
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--cream-dim)', opacity: 0.5, fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              (Cart is empty. Please select food you will soon regret.)
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-info">
                      <span className="cart-item-qty">{item.qty}x</span>
                      <span>{item.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="cart-item-price">₹{item.price * item.qty}</span>
                      <button className="cart-item-remove" onClick={() => updateQty(item.id, -1)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-fees">
                <div className="cart-fee-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="cart-fee-row penalty">
                  <span>Database Congestion Fee</span>
                  <span>₹{trafficFee}</span>
                </div>
                <div className="cart-fee-row highlight">
                  <span>Dynamic Neighborhood Inflation Tax</span>
                  <span>₹{inflationFee}</span>
                </div>
                <div className="cart-fee-row">
                  <span>Driver Therapy Fund Contribution</span>
                  <span>₹{therapyFee}</span>
                </div>
                <div className="cart-fee-row">
                  <span>Air Ingestion Surcharge</span>
                  <span>₹{airFee}</span>
                </div>
              </div>

              <div className="cart-total">
                <span>Total Due:</span>
                <span>₹{total}</span>
              </div>

              <button 
                className="cart-checkout-btn"
                onClick={() => navigateTo('checkout')}
              >
                Proceed to Corporate Nightmare
              </button>
            </>
          )}
        </div>
      </div>

      {/* Cursed Warning Dialog Modal */}
      {activeWarning && (
        <div className="chaos-modal-overlay">
          <div className="chaos-expired-modal" style={{ border: '2px solid var(--orange)' }}>
            <div className="chaos-expired-subtitle" style={{ color: 'var(--orange)' }}>
              WARNING PROTOCOL 883
            </div>
            <div className="chaos-expired-title">
              Confirm {activeWarning.name} Risk
            </div>
            <div className="chaos-expired-body">
              {activeWarning.warning}
              <br /><br />
              Eating under these conditions is not recommended by 9 out of 10 stomach doctors.
            </div>
            <div className="chaos-expired-buttons">
              <button 
                className="chaos-expired-btn"
                onClick={() => confirmAdd(activeWarning)}
              >
                Accept Risk and Proceed
              </button>
              <button 
                className="chaos-expired-btn"
                style={{ background: 'transparent', border: '1px solid var(--charcoal-light)' }}
                onClick={() => setActiveWarning(null)}
              >
                Let me starve in peace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
