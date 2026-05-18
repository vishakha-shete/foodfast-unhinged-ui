import React, { useEffect, useRef, useState } from 'react'

const aiMessages = [
    'AI detected poor financial decisions.',
    'Interesting choice. Concerning behavior.',
    'Would you like emotional support fries?',
    'Users like you usually panic at checkout.',
    'Management is observing your hunger.',
    'Excellent selection. Terrible outcome.',
    'AI confidence level: emotionally unstable.',
    'Still browsing? That’s brave.',
]

const badReplies = [
    'That sounds like a terrible idea.',
    'Management strongly discourages this.',
    'Emotionally unstable request detected.',
    'I would not recommend that 😭',
    'Your confidence is concerning.',
    'Interesting. Financially dangerous.',
    'That may permanently damage your wallet.',
    'I am legally required to disagree.',
    'This conversation is being judged.',
    'AI recommends touching grass.',
    'Your hunger levels are suspicious.',
    'I have alerted upper management.',
    'Bhai ye decision financially dangerous lag raha hai 😭',

    'Management ne bola hai ki tum trusted customer nahi ho.',

    'AI ko bhi samajh nahi aa raha tum kya kar rahe ho.',

    'Tum fries nahi... emotional support dhoond rahe ho.',

    'Yeh order tumhare bank account ko hurt karega 💀',

    'AI strongly recommends ghar ka khana.',

    'Bhai itna expensive burger kyun dekh rahe ho 👀',

    'Tumhari choices dekh ke AI bhi nervous ho gaya.',

    'Delivery boy bhi yeh order accept nahi karna chahta 😭',

    'AI prediction: tum checkout pe panic karoge.',

    'Tumhara wallet currently danger mein hai ⚠️',

    'Management tumhare hunger levels monitor kar rahi hai.',

    'Bhai coupon apply karne se gareebi nahi chhupti 😭',

    'Yeh app tumhare liye emotionally safe nahi hai.',

    'Tumhara taste questionable hai but respected.',

    'AI ne tumhe “high regret customer” classify kiya hai.',

    'Bhai tum seriously ₹400 fries lene wale ho? 💀',

    'Tumhari activity HR department ko forward kar di gayi hai.',

    'AI ko lag raha hai tum bas timepass kar rahe ho.',

    'Tumhara order dekh ke delivery driver ro diya 😭🔥'

]

export default function FakeAIBot() {

    const [visible, setVisible] = useState(true)

    const [typing, setTyping] = useState(false)

    const [displayedText, setDisplayedText] = useState('')

    const [userInput, setUserInput] = useState('')

    const [messages, setMessages] = useState([
        {
            type: 'ai',
            text: 'Welcome to FoodFast AI support. Unfortunately I am active.'
        }
    ])

    const messagesEndRef = useRef(null)

    // RANDOM AI MESSAGES 😭🔥
    useEffect(() => {

        const interval = setInterval(() => {

            const random =
                aiMessages[Math.floor(Math.random() * aiMessages.length)]

            setMessages(prev => [
                ...prev,
                {
                    type: 'ai',
                    text: random
                }
            ])

        }, 25000)

        return () => clearInterval(interval)

    }, [])

    // AUTO SCROLL
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        })

    }, [messages])

    // SEND MESSAGE 😭🔥
    const handleSend = () => {

        if (!userInput.trim()) return

        const userMsg = userInput

        setMessages(prev => [
            ...prev,
            {
                type: 'user',
                text: userMsg
            }
        ])

        setUserInput('')

        setTyping(true)

        // FAKE AI THINKING 😭🔥
        setTimeout(() => {

            const badResponse =
                badReplies[Math.floor(Math.random() * badReplies.length)]

            setMessages(prev => [
                ...prev,
                {
                    type: 'ai',
                    text: badResponse
                }
            ])

            setTyping(false)

        }, 1800)

    }

    return (
        <>

            {visible && (

                <div className="fake-ai-bot animate-fade-in">

                    {/* HEADER */}
                    <div className="fake-ai-header">

                        <div className="fake-ai-status">
                            ● AI ACTIVE
                        </div>

                        <div className="fake-ai-badge">
                            v0.0.7 unstable
                        </div>

                    </div>

                    {/* CHAT AREA */}
                    <div className="fake-ai-chat">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`
                  fake-ai-msg
                  ${msg.type === 'user'
                                        ? 'user'
                                        : 'ai'}
                `}
                            >

                                {msg.type === 'ai'
                                    ? '🤖'
                                    : '🧍'
                                }

                                <span>
                                    {msg.text}
                                </span>

                            </div>

                        ))}

                        {typing && (

                            <div className="fake-ai-msg ai">

                                🤖

                                <span>
                                    AI judging your request...
                                </span>

                            </div>

                        )}

                        <div ref={messagesEndRef} />

                    </div>

                    {/* INPUT */}
                    <div className="fake-ai-input-wrap">

                        <input
                            type="text"
                            placeholder="Ask something regrettable..."
                            value={userInput}
                            onChange={(e) =>
                                setUserInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSend()
                                }
                            }}
                            className="fake-ai-input"
                        />

                        <button
                            className="fake-ai-send"
                            onClick={handleSend}
                        >
                            Send
                        </button>

                    </div>
                    <div className="fake-ai-header">

                        <div className="fake-ai-status">
                            ● AI ACTIVE
                        </div>

                        <div className="fake-ai-header-right">

                            <div className="fake-ai-badge">
                                v0.0.7 unstable
                            </div>

                            {/* CLOSE BUTTON 😭🔥 */}
                            <button
                                className="fake-ai-close"
                                onClick={() => setVisible(false)}
                            >
                                ✕
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    )
}