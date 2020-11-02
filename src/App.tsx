import React, { useState, useRef } from 'react'
import Header from './Components/Header'
import Layout from './Components/Layout'
import TypingArea from './Components/TypingArea'
import Result from './Components/Result'
import { allowedKeys, generateRandomWords } from './helper'
const ErrorBeep = require('./sound/beep.wav')

interface iState {
  inputText: string
  remainingText: string
  completedText: string
  showStats: boolean
  progress: number
  accuracy: number
  errorIndex: number
  correctIndex: number
  wpm: number
  duration: number
  incorrect: boolean
  started: boolean
}

const initialState: iState = {
  inputText: 'Welcome, click on the button below to get started!',
  remainingText: 'Welcome, click on the button below to get started!',
  completedText: '',
  showStats: false,
  progress: 0,
  accuracy: 0,
  errorIndex: 0,
  correctIndex: 0,
  wpm: 0,
  duration: 60,
  incorrect: false,
  started: false,
}

function App() {
  const [state, setState] = useState<iState>(initialState)
  const interval: React.MutableRefObject<number | null> = useRef<number | null>(null)
  const areaRef = useRef<HTMLDivElement | null>(null)
  const errorBeepRef = useRef<HTMLAudioElement | null>(null)

  const handleStart = () => {
    // Word generate
    const newInputText: string = generateRandomWords()
    setState((prev) => ({
      ...prev,
      inputText: newInputText,
      remainingText: newInputText,
      started: true,
    }))
    // Timer
    const now: number = Date.now()
    const seconds: number = now + 60 * 1000

    interval.current = window.setInterval(() => {
      const secondLeft: number = Math.round((seconds - Date.now()) / 1000)
      if (secondLeft <= 0) {
        setState((prev) => ({
          ...prev,
          duration: 0,
          showStats: true,
        }))
        if (interval.current) window.clearInterval(interval.current)
      }
      setState((prev) => ({
        ...prev,
        duration: secondLeft,
      }))
    }, 1000)
    if (areaRef.current) areaRef.current.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<Element>) => {
    if (state.showStats || !state.started || state.duration === 0) return

    e.preventDefault()
    const { key } = e
    const { progress, errorIndex, correctIndex, inputText } = state

    if (allowedKeys.includes(key) && key !== 'Shift') {
      if (key === inputText.charAt(progress)) {
        setState((prev) => ({
          ...prev,
          progress: prev.progress + 1,
          correctIndex: prev.correctIndex + 1,
          remainingText: prev.remainingText.slice(1),
          completedText: prev.completedText + prev.remainingText.charAt(0),
          incorrect: false,
        }))
      } else {
        setState((prev) => ({
          ...prev,
          incorrect: true,
          errorIndex: prev.errorIndex + 1,
        }))
        // Play error sound
        if (errorBeepRef.current) {
          errorBeepRef.current.currentTime = 0
          errorBeepRef.current.play()
        }
      }
    }

    const accuracy: number = Math.floor(((progress - errorIndex) / progress) * 100)
    const wpm: number = Math.round(correctIndex / 5)

    if (progress > 5) {
      setState((prev) => ({
        ...prev,
        accuracy: accuracy > 0 ? accuracy : 0,
        wpm,
      }))
    }
    if (progress + 1 === inputText.length || errorIndex >= 50) {
      setState((prev) => ({
        ...prev,
        showStats: true,
      }))
      if (interval.current) clearInterval(interval.current)
    }
  }

  const handleReload = () => {
    if (interval.current) window.clearInterval(interval.current)
    setState(initialState)
    setTimeout(() => handleStart(), 0)
  }

  const {
    inputText,
    remainingText,
    completedText,
    showStats,
    accuracy,
    errorIndex,
    wpm,
    duration,
    started,
    incorrect,
  } = state

  return (
    <div className='App'>
      <Header />
      <Layout>
        {showStats ? (
          <Result
            completedText={completedText}
            inputText={inputText}
            errorIndex={errorIndex}
            accuracy={accuracy}
            wpm={wpm}
            showStats={showStats}
            handleReload={handleReload}
          />
        ) : (
          <TypingArea
            completedText={completedText}
            inputText={inputText}
            errorIndex={errorIndex}
            duration={duration}
            started={started}
            incorrect={incorrect}
            areaRef={areaRef}
            handleKeyDown={handleKeyDown}
            remainingText={remainingText}
            tabIndex={0}
            handleStart={handleStart}
          />
        )}
      </Layout>
      <audio src={ErrorBeep.default} ref={errorBeepRef} hidden></audio>
    </div>
  )
}

export default App
