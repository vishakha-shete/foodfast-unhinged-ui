import React from 'react'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      
      <nav className="flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold text-orange-500">
          FoodFast
        </h1>

        <button className="bg-orange-500 px-5 py-2 rounded-full">
          Login
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center text-center mt-32 px-4">
        
        <h1 className="text-7xl font-bold leading-tight">
          Delivering <br />
          Regret Faster 🍔
        </h1>

        <p className="mt-6 text-zinc-400 max-w-xl">
          The most emotionally damaging food delivery experience ever created.
        </p>

        <button className="mt-10 bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-full text-xl">
          Order Now
        </button>

      </div>

    </div>
  )
}