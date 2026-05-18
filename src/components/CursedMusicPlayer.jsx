import React, { useEffect, useRef, useState } from 'react'
import { dispatchEmoji } from './SoundEmoji'

export default function CursedMusicPlayer({ active }) {

  const [btnText, setBtnText] = useState('Mute Suffering')
  const [toast, setToast] = useState(null)
  const [stopCount, setStopCount] = useState(0)
  const [sadMode, setSadMode] = useState(false)

  // =========================
  // AUDIO REFS
  // =========================

  const playlistRef = useRef([])
  const currentTrackRef = useRef(0)

  const laughRef = useRef(null)
  const goofyRef = useRef(null)

  const resumeTimeoutRef = useRef(null)

  // =========================
  // INIT AUDIO
  // =========================

  useEffect(() => {

    // PLAYLIST 😭🔥
    playlistRef.current = [

      new Audio('/sounds/Doremon.mp3'),

      new Audio('/sounds/cursed-music.mp3'),

      new Audio('/sounds/Oggy And The Cockroach- Joey.mp3')

    ]

    // VOLUME
    playlistRef.current.forEach(audio => {

      audio.volume = 0.16

    })

    // LOOP LAST TRACK
    playlistRef.current[2].loop = true

    // FUNNY SOUNDS
    laughRef.current = new Audio(
      '/sounds/nishand-the-laugh-song-197566.mp3'
    )

    laughRef.current.volume = 0.25

    goofyRef.current = new Audio(
      '/sounds/Oggy And The Cockroach- Joey.mp3'
    )

    goofyRef.current.volume = 0.22

    // CLEANUP
    return () => {

      playlistRef.current.forEach(audio => {

        audio.pause()

      })

      clearTimeout(resumeTimeoutRef.current)

    }

  }, [])

  // =========================
  // PLAY NEXT TRACK
  // =========================

  const playTrack = async (index = 0) => {

    try {

      currentTrackRef.current = index

      const currentAudio = playlistRef.current[index]

      if (!currentAudio) return

      currentAudio.currentTime = 0

      await currentAudio.play()

      // TOASTS 😭🔥
      if (index === 0) {

        setToast({
          text: 'Doremon has entered the chat.',
          emoji: '🎵'
        })

      }

      if (index === 1) {

        setToast({
          text: 'Corporate suffering initialized.',
          emoji: '💀'
        })

      }

      setTimeout(() => setToast(null), 2500)

      // WHEN TRACK ENDS → PLAY NEXT
      currentAudio.onended = () => {

        const nextTrack = index + 1

        if (playlistRef.current[nextTrack]) {

          playTrack(nextTrack)

        }

      }

    } catch (err) {

      console.log(err)

    }

  }

  // =========================
  // START MUSIC
  // =========================

  useEffect(() => {

    if (!active) return

    playTrack(0)

  }, [active])

  // =========================
  // STOP / RESUME
  // =========================

  const handleMute = async (e) => {

    e.preventDefault()

    const nextCount = stopCount + 1

    setStopCount(nextCount)

    dispatchEmoji('random_click', e)

    // STOP ALL
    playlistRef.current.forEach(audio => {

      audio.pause()

    })

    setSadMode(true)

    goofyRef.current.currentTime = 0
    goofyRef.current.play()

    setToast({
      text: 'Peace restored.',
      emoji: '🤫'
    })

    setTimeout(() => setToast(null), 2500)

    // BUTTON TEXTS
    const texts = [
      'Mute Suffering',
      'Seriously Stop',
      'PLEASE STOP',
      'I Beg You',
      'Fine Whatever',
      'Permanent Silence'
    ]

    setBtnText(texts[nextCount] || texts[0])

    // FINAL ESCAPE 😭🔥
    if (nextCount >= 5) {

      setToast({
        text: 'Fine. You win.',
        emoji: '🏳️'
      })

      laughRef.current.currentTime = 0
      laughRef.current.play()

      return
    }

    // AUTO RESUME
    resumeTimeoutRef.current = setTimeout(() => {

      setSadMode(false)

      playTrack(currentTrackRef.current)

      setToast({
        text: 'You cannot escape ambiance.',
        emoji: '🎵'
      })

      setTimeout(() => setToast(null), 3500)

    }, 4000)

  }

  if (!active) return null

  return (
    <>

      {/* ========================= */}
      {/* DANCING CARTOON */}
      {/* ========================= */}

      <div className={`dancing-cartoon ${sadMode ? 'sad' : ''}`}>

        {!sadMode && (
          <>
            <span className="music-note note-1">
              🎵
            </span>

            <span className="music-note note-2">
              🎶
            </span>
          </>
        )}

        {/* CARTOON */}
        <img
          src="/characters/cartoon.jpg"
          alt="cartoon dancer"
          draggable="false"
        />

        {/* BUTTON */}
        <button
          onClick={handleMute}
          className="
            cursed-music-btn
            absolute
            bottom-[-18px]
            left-1/2
            -translate-x-1/2
          "
        >

          <span className="cursed-music-icon">
            🎵
          </span>

          {btnText}

        </button>

      </div>

      {/* ========================= */}
      {/* TOAST */}
      {/* ========================= */}

      {toast && (

        <div className="cursed-toast">

          <div className="cursed-toast-emoji">
            {toast.emoji}
          </div>

          <div>
            {toast.text}
          </div>

        </div>

      )}

    </>
  )
}