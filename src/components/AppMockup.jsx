import React, { useState, useEffect } from 'react'

const initialFoods = [
  {
    emoji: '🍔',
    name: 'Mystery Burger',
    price: '$12.99',
    detail: 'meat-adjacent patty',
    rating: '2.3 ★',
  },
  {
    emoji: '🍕',
    name: 'Regret Pizza',
    price: '$15.00',
    detail: 'questionable toppings',
    rating: '1.8 ★',
  },
  {
    emoji: '🌮',
    name: 'Trust Issues Taco',
    price: '$9.50',
    detail: 'filling: classified',
    rating: '3.1 ★',
  },
  {
    emoji: '🍣',
    name: 'Suspicious Sushi',
    price: '$22.00',
    detail: 'freshness: debatable',
    rating: '0.4 ★',
  },
]

const fakeRatings = [
  '0.1 ★',
  '5.0 ★',
  '2.7 ★',
  'ERROR',
  '4.9 ★',
  '1.2 ★',
]

const fakeTimes = [
  '4:04 AM',
  '25:61 PM',
  '9:72 AM',
  '00:00 OM',
]

export default function AppMockup() {
  const [foods, setFoods] = useState(initialFoods)
  const [time, setTime] = useState('4:04 AM')

  // Random cursed ratings (Fixed bug to keep food properties intact)
  useEffect(() => {
    const interval = setInterval(() => {
      setFoods(prevFoods =>
        prevFoods.map(food => ({
          ...food, // Retains name, price, detail, and emoji
          rating: fakeRatings[Math.floor(Math.random() * fakeRatings.length)],
        }))
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Fake broken time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTime = fakeTimes[Math.floor(Math.random() * fakeTimes.length)]
      setTime(randomTime)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="phone-frame"
      style={{
        animation: 'wiggle 12s ease-in-out infinite',
      }}
    >
      <div className="phone-notch" />

      <div className="phone-screen">
        <div className="phone-header">
          <h3>FoodFast</h3>
          <span className="phone-time">
            {time}
          </span>
        </div>

        <div className="phone-search">
          🔍 Search for regret...
        </div>

        {foods.map((f, i) => (
          <div
            className={`food-card ${i % 2 === 0 ? 'tilt-left' : 'tilt-right'}`}
            key={i}
          >
            <div
              className="food-card-img"
              style={{
                background:
                  i % 2 === 0
                    ? 'rgba(200,97,42,.12)'
                    : 'rgba(155,59,59,.12)',
              }}
            >
              {f.emoji}
            </div>

            <div className="food-card-info">
              <h4>{f.name}</h4>
              <span className="food-price">
                {f.price}
              </span>
              <div className="food-detail">
                {f.detail}
              </div>
            </div>

            <span className="food-card-rating">
              {f.rating}
            </span>
          </div>
        ))}

        <div className="phone-popup">
          <div className="popup-title">
            ⚠ ALERT
          </div>
          Your driver has been
          “rethinking their life choices”
          for 12 minutes.
        </div>

        <div className="phone-loading">
          <div className="loading-label">
            Delivering your order... 99%
          </div>

          <div className="loading-bar">
            <div className="loading-bar-fill" />
          </div>
        </div>

        <div className="tiny-phone-disclaimer">
          * ingredients may remember you
        </div>
      </div>
    </div>
  )
}