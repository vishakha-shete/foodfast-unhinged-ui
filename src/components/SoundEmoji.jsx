import React, { useState, useEffect } from 'react'

let audioCtx = null

const initAudio = () => {
  // Try to initialize Web Audio API on first interaction
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
}

// Global cooldown tracker
const lastPlayed = {}
const COOLDOWNS = {
  hover: 300,
  fail: 1500,
  fee: 800,
  notify: 2000,
  success: 3000,
  idle: 5000,
  random: 10000,
  random_click: 400,
}

const canPlay = (type) => {
  const now = Date.now()
  if (!lastPlayed[type] || now - lastPlayed[type] > COOLDOWNS[type]) {
    lastPlayed[type] = now
    return true
  }
  return false
}

// Sound generators using Web Audio API
const playSound = (type) => {
  try {
    initAudio()
    if (!audioCtx || !canPlay(type)) return

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    const now = audioCtx.currentTime

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    if (type === 'hover') {
      // Soft goofy pop (sine drop)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(400, now)
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.15)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
      osc.start(now)
      osc.stop(now + 0.15)
    } else if (type === 'fail') {
      // Sad trombone (sawtooth sliding down)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(250, now)
      osc.frequency.linearRampToValueAtTime(120, now + 0.6)
      gain.gain.setValueAtTime(0.06, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.6)
      osc.start(now)
      osc.stop(now + 0.6)
    } else if (type === 'fee') {
      // Cash register ding (triangle, high pitch quick blips)
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1200, now)
      osc.frequency.setValueAtTime(1800, now + 0.1)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      osc.start(now)
      osc.stop(now + 0.4)
    } else if (type === 'notify') {
      // Notification ping
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.setValueAtTime(1000, now + 0.1)
      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      osc.start(now)
      osc.stop(now + 0.4)
    } else if (type === 'success') {
      // Awkward celebration (arpeggio)
      osc.type = 'square'
      osc.frequency.setValueAtTime(300, now)
      osc.frequency.setValueAtTime(400, now + 0.1)
      osc.frequency.setValueAtTime(500, now + 0.2)
      osc.frequency.setValueAtTime(600, now + 0.3)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.5)
      osc.start(now)
      osc.stop(now + 0.5)
    } else if (type === 'idle') {
      // Mysterious hum
      osc.type = 'sine'
      osc.frequency.setValueAtTime(100, now)
      osc.frequency.linearRampToValueAtTime(90, now + 1.5)
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.06, now + 0.5)
      gain.gain.linearRampToValueAtTime(0, now + 1.5)
      osc.start(now)
      osc.stop(now + 1.5)
    } else if (type === 'laugh') {
      // Soft laughing (descending staccato)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(700, now)
      osc.frequency.setValueAtTime(500, now + 0.1)
      osc.frequency.setValueAtTime(400, now + 0.2)
      osc.frequency.setValueAtTime(300, now + 0.3)
      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
      gain.gain.setValueAtTime(0.03, now + 0.1)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
      gain.gain.setValueAtTime(0.03, now + 0.2)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      gain.gain.setValueAtTime(0.03, now + 0.3)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      osc.start(now)
      osc.stop(now + 0.4)
    } else if (type === 'cry') {
      // Dramatic crying (wailing)
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(450, now)
      osc.frequency.linearRampToValueAtTime(300, now + 0.3)
      osc.frequency.linearRampToValueAtTime(350, now + 0.6)
      osc.frequency.linearRampToValueAtTime(200, now + 1.0)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.linearRampToValueAtTime(0.02, now + 0.3)
      gain.gain.linearRampToValueAtTime(0.04, now + 0.6)
      gain.gain.linearRampToValueAtTime(0.001, now + 1.0)
      osc.start(now)
      osc.stop(now + 1.0)
    } else if (type === 'bonk') {
      // Goofy bonk
      osc.type = 'square'
      osc.frequency.setValueAtTime(120, now)
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.2)
      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
      osc.start(now)
      osc.stop(now + 0.2)
    } else if (type === 'melt') {
      // Melting
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(250, now)
      osc.frequency.exponentialRampToValueAtTime(40, now + 1.2)
      gain.gain.setValueAtTime(0.03, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 1.2)
      osc.start(now)
      osc.stop(now + 1.2)
    } else if (type === 'circus') {
      // Circus tiny sound
      osc.type = 'square'
      osc.frequency.setValueAtTime(500, now)
      osc.frequency.setValueAtTime(700, now + 0.15)
      osc.frequency.setValueAtTime(500, now + 0.3)
      osc.frequency.setValueAtTime(700, now + 0.45)
      gain.gain.setValueAtTime(0.02, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.6)
      osc.start(now)
      osc.stop(now + 0.6)
    } else if (type === 'burger') {
      // Juicy pop
      osc.type = 'sine'
      osc.frequency.setValueAtTime(250, now)
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.1)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
      osc.start(now)
      osc.stop(now + 0.1)
    } else if (type === 'applause') {
      // Weak applause
      osc.type = 'square'
      osc.frequency.setValueAtTime(100, now)
      gain.gain.setValueAtTime(0.02, now)
      for(let i=0; i<5; i++) {
        gain.gain.setValueAtTime(0.02, now + i*0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i*0.05 + 0.02)
      }
      osc.start(now)
      osc.stop(now + 0.25)
    } else if (type === 'bruh') {
      // Tiny bruh sound
      osc.type = 'square'
      osc.frequency.setValueAtTime(90, now)
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.3)
      gain.gain.setValueAtTime(0.05, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.3)
      osc.start(now)
      osc.stop(now + 0.3)
    } else if (type === 'mini_fail') {
      // Fast sad trombone
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(200, now)
      osc.frequency.linearRampToValueAtTime(100, now + 0.2)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.2)
      osc.start(now)
      osc.stop(now + 0.2)
    } else if (type === 'squeak') {
      // Squeaky click
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1000, now)
      osc.frequency.exponentialRampToValueAtTime(2000, now + 0.05)
      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      osc.start(now)
      osc.stop(now + 0.05)
    } else if (type === 'nice') {
      // Robotic nice
      osc.type = 'square'
      osc.frequency.setValueAtTime(400, now)
      osc.frequency.setValueAtTime(600, now + 0.08)
      osc.frequency.setValueAtTime(800, now + 0.16)
      gain.gain.setValueAtTime(0.03, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.24)
      osc.start(now)
      osc.stop(now + 0.24)
    }
  } catch(e) {
    // Ignore audio context errors gracefully (like user hasn't interacted yet)
  }
}

const EMOJI_MAP = {
  hover: ['😬', '👍', '🍔'],
  fail: ['💸', '😭', '📉'],
  fee: ['💳', '💀', '🥲'],
  notify: ['🚗', '😵', '🍟'],
  success: ['🎉', '😭', '🍕'],
  idle: ['👀', '😶', '🍔'],
  laugh: ['😂'],
  cry: ['😭'],
  bonk: ['💀'],
  melt: ['🫠'],
  circus: ['🤡'],
  burger: ['🍔'],
  applause: ['👏', '🙌'],
  bruh: ['😐', '🫠', '💀'],
  mini_fail: ['📉', '🥲'],
  squeak: ['🐭', '✨'],
  nice: ['🤖', '👍', '🔥']
}

const CLICK_REACTIONS = [
  'laugh', 'bonk', 'applause', 'notify', 'bruh', 'mini_fail', 'squeak', 'nice', 'success', 'burger'
]

export const dispatchEmoji = (type, e) => {
  if (type === 'random_click') {
    type = CLICK_REACTIONS[Math.floor(Math.random() * CLICK_REACTIONS.length)]
  }

  let x = window.innerWidth / 2 + (Math.random() * 100 - 50)
  let y = window.innerHeight / 2 + (Math.random() * 100 - 50)
  
  // Try to grab real mouse coordinates if an event is passed
  if (e && e.clientX !== undefined && e.clientY !== undefined) {
    x = e.clientX
    y = e.clientY
  }

  // Slight random offset so stacked emojis don't perfectly overlap
  x += (Math.random() * 40 - 20)
  y += (Math.random() * 40 - 20)

  window.dispatchEvent(new CustomEvent('SPAWN_EMOJI', { detail: { type, x, y } }))
}

export default function SoundEmoji() {
  const [emojis, setEmojis] = useState([])

  useEffect(() => {
    const handleSpawn = (e) => {
      const { type, x, y } = e.detail
      
      // Play web audio synth sound
      playSound(type)
      
      const emojiList = EMOJI_MAP[type] || ['😬']
      const char = emojiList[Math.floor(Math.random() * emojiList.length)]
      
      const id = Date.now() + Math.random()
      const newEmoji = { id, type, char, x, y, isRandomBackground: e.detail.isRandom }
      
      setEmojis(prev => [...prev, newEmoji])

      // Auto-cleanup based on type duration
      const duration = type === 'idle' ? 4000 : 
                       ['laugh', 'cry', 'bonk', 'melt', 'circus', 'burger'].includes(type) ? 5000 : 2500
      setTimeout(() => {
        setEmojis(prev => prev.filter(em => em.id !== id))
      }, duration)
    }

    window.addEventListener('SPAWN_EMOJI', handleSpawn)
    
    // Globally resume audio context on first click anywhere
    const globalClickHandler = () => initAudio()
    window.addEventListener('click', globalClickHandler, { once: true })

    // Random emotional reaction system (20-40 seconds)
    let randomTimer
    const triggerRandomReaction = () => {
      const reactions = ['laugh', 'cry', 'bonk', 'melt', 'circus', 'burger']
      const randomType = reactions[Math.floor(Math.random() * reactions.length)]
      
      const x = window.innerWidth * 0.2 + (Math.random() * window.innerWidth * 0.6)
      const y = window.innerHeight * 0.2 + (Math.random() * window.innerHeight * 0.6)
      
      // Only spawn if audio context is active (user has interacted)
      if (audioCtx && audioCtx.state === 'running') {
        window.dispatchEvent(new CustomEvent('SPAWN_EMOJI', { 
          detail: { type: randomType, x, y, isRandom: true } 
        }))
      }

      // Schedule next reaction between 20s and 40s
      const nextDelay = 20000 + Math.random() * 20000
      randomTimer = setTimeout(triggerRandomReaction, nextDelay)
    }
    randomTimer = setTimeout(triggerRandomReaction, 20000)
    
    return () => {
      window.removeEventListener('SPAWN_EMOJI', handleSpawn)
      window.removeEventListener('click', globalClickHandler)
      clearTimeout(randomTimer)
    }
  }, [])

  return (
    <div className="sound-emoji-container">
      {emojis.map(em => {
        return (
          <div
            key={em.id}
            className={`sound-emoji ${em.isRandomBackground ? 'emoji-random-react' : `emoji-${em.type} emoji-random-click`}`}
            style={{
              left: `${em.x}px`,
              top: `${em.y}px`,
              // Minor random rotation for organic feel
              '--r': `${Math.random() * 20 - 10}deg`
            }}
          >
            {em.char}
          </div>
        )
      })}
    </div>
  )
}
