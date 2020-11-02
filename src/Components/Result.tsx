import React, { memo } from 'react'
import State from './State'

interface Props {
  completedText: string
  inputText: string
  errorIndex: number
  accuracy: number
  wpm: number
  showStats: boolean
  handleReload: () => void
}

function Result({
  completedText = '',
  inputText = '',
  errorIndex = 0,
  accuracy = 0,
  wpm = 0,
  showStats = false,
  handleReload,
}: Props) {
  return (
    <React.Fragment>
      <div className='result'>
        <div className='bg-success text-white font-weight-bold p-2'>Result</div>
        <div className='d-flex text-center justify-content-around align-items-center py-5 state'>
          <State title='WPM' value={wpm || 0} />
          <State title='Errors' value={errorIndex || 0} />
          <State title='Accuracy' value={accuracy || 0} symbol='%' />
          <State
            title='Completed'
            value={((completedText.length / inputText.length) * 100).toFixed(0) + '%' || '0%'}
            symbol='%'
          />
        </div>
      </div>
      <button
        type='button'
        disabled={!showStats}
        className='btn py-3 btn-success btn-block reload'
        onClick={handleReload}
      >
        <svg viewBox='0 0 40 40' fill='#fff' width='30' height='30' version='1.1' aria-hidden='true'>
          <path d='m37.3 5.7v10q0 0.6-0.4 1t-1 0.4h-10q-1 0-1.4-0.9-0.3-0.8 0.4-1.5l3-3.1q-3.3-3-7.8-3-2.3 0-4.4 0.9t-3.6 2.4-2.5 3.7-0.9 4.4 0.9 4.4 2.5 3.7 3.6 2.4 4.4 0.9q2.7 0 5.1-1.1t4-3.3q0.1-0.2 0.5-0.3 0.3 0 0.5 0.2l3.1 3.1q0.2 0.2 0.2 0.5t-0.2 0.5q-2.4 2.9-5.9 4.5t-7.3 1.6q-3.4 0-6.6-1.3t-5.5-3.7-3.6-5.4-1.4-6.7 1.4-6.7 3.6-5.4 5.5-3.7 6.6-1.3q3.3 0 6.4 1.2t5.5 3.5l2.9-2.9q0.6-0.7 1.5-0.3 0.9 0.4 0.9 1.3z'></path>
        </svg>
      </button>
      <div className='speed-meter'>
        <hr />
        <h6 className='title'>Average Typing Speeds</h6>
        <div className='d-flex align-items-center text-white meter-gauge'>
          <span className={`col slow${wpm > 0 && wpm < 21 ? ' border' : ''}`}>0 - 20 Slow</span>
          <span className={`col average${wpm > 21 && wpm < 41 ? ' border' : ''}`}>20 - 40 Average</span>
          <span className={`col fast${wpm > 41 && wpm < 61 ? ' border' : ''}`}>40 - 60 Fast</span>
          <span className={`col professional${wpm > 61 && wpm < 81 ? ' border' : ''}`}>60 - 80 Professional</span>
          <span className={`col top${wpm > 81 ? ' border' : ''}`}>80 - 100+ Top</span>
        </div>
        <div className='text-light mt-5'>
          <h6>Tip!</h6>
          <ul>
            <li>Word Per Minute (WPM) is measured by calculating how many words you can type in 1 minute.</li>
            <li>Character Per Minute (CPM) calculates how many characters are typed per minute.</li>
            <li>
              The top typing speed was achieved by{' '}
              <a
                href='https://en.wikipedia.org/wiki/Typing#Alphanumeric_entry'
                rel='noopener noreferrer'
                target='_blank'
              >
                Stella Pajunas
              </a>{' '}
              in 1946, whereas Mrs. Barbara Blackburn has averaged 150 wpm in 50 minutes and her top speed was 212 wpm.
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default memo(Result)
