import React, { memo } from 'react'
import State from './State'

interface Props {
  started: boolean
  incorrect: boolean
  areaRef: React.RefObject<HTMLDivElement> | null | undefined
  handleKeyDown: (event: React.KeyboardEvent<Element>) => void
  remainingText: string
  completedText: string
  inputText: string
  errorIndex: number
  duration: number
  tabIndex: number
  handleStart: () => void
}

function TypingArea({
  started = false,
  incorrect = false,
  areaRef = null,
  handleKeyDown,
  remainingText = '',
  completedText = '',
  inputText = '',
  errorIndex = 0,
  duration = 0,
  handleStart,
}: Props) {
  return (
    <React.Fragment>
      <div className='main'>
        <div className='d-flex text-center justify-content-between align-items-center shadow-sm stats'>
          <State
            title='Progress'
            value={((completedText.length / inputText.length) * 100).toFixed(0) + '%' || '0%'}
            symbol='%'
          />
          <State title='Errors' value={errorIndex || 0} />
          <State title='Timer' value={duration + 's' || 0} />
        </div>
        <div
          className={`typing-area${started ? ' active' : ''}${incorrect ? ' is-error' : ''}`}
          ref={areaRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <span className='cursor'></span>
          <span className='remaining-text'>{remainingText}</span>
        </div>
      </div>
      <button
        type='button'
        className='btn py-3 btn-primary btn-block mt-4'
        disabled={started}
        onClick={started ? () => {} : handleStart}
      >
        Start
      </button>
    </React.Fragment>
  )
}

export default memo(TypingArea)
