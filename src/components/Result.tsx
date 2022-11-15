import React, { memo } from "react";
import { ReloadIcon } from "./Icons";
import State from "./State";

interface Props {
  completedText: string;
  inputText: string;
  errorIndex: number;
  accuracy: number;
  wpm: number;
  showStats: boolean;
  handleReload: () => void;
}

function Result({
  completedText = "",
  inputText = "",
  errorIndex = 0,
  accuracy = 0,
  wpm = 0,
  showStats = false,
  handleReload
}: Props) {
  return (
    <>
      <div className='result'>
        <h6 className='mb-3'>Result</h6>
        <div className='row g-2 py-4'>
          <State title='WPM' value={wpm} />
          <State title='CPM' value={wpm * 5} />
          <State title='Errors' value={errorIndex} />
          <State title='Accuracy' value={accuracy} symbol='%' />
          <State
            title='Completed'
            value={((completedText.length / inputText.length) * 100).toFixed(0)}
            symbol='%'
          />
        </div>
        <div className='speed-meter pt-4'>
          <h6 className='mb-3'>Average Typing Speeds</h6>
          <div className='row g-0 text-white meter-gauge'>
            <span className={`col-md col-sm-6 slow${wpm > 0 && wpm < 21 ? " border" : ""}`}>
              0 - 20 Slow
            </span>
            <span className={`col-md col-sm-6 average${wpm > 21 && wpm < 41 ? " border" : ""}`}>
              20 - 40 Average
            </span>
            <span className={`col-md col-sm-6 fast${wpm > 41 && wpm < 61 ? " border" : ""}`}>
              40 - 60 Fast
            </span>
            <span
              className={`col-md col-sm-6 professional${wpm > 61 && wpm < 81 ? " border" : ""}`}
            >
              60 - 80 Professional
            </span>
            <span className={`col-md col-sm-6 top${wpm > 81 ? " border" : ""}`}>80 - 100+ Top</span>
          </div>
        </div>
      </div>
      <div className='reload pt-5'>
        <button
          type='button'
          disabled={!showStats}
          className='btn py-3 btn-success w-100 reload d-print-none'
          onClick={handleReload}
        >
          <ReloadIcon />
        </button>
      </div>
      <div className='result-into pt-4'>
        <hr />
        <h6>Tip!</h6>
        <ul>
          <li>
            Word Per Minute <strong>(WPM)</strong> is measured by calculating how many words you can
            type in 1 minute.
          </li>
          <li>
            Character Per Minute <strong>(CPM)</strong> calculates how many characters are typed per
            minute.
          </li>
          <li>
            The top typing speed was achieved by{" "}
            <a
              href='https://en.wikipedia.org/wiki/Typing#Alphanumeric_entry'
              rel='noopener noreferrer'
              target='_blank'
            >
              Stella Pajunas
            </a>{" "}
            in 1946, whereas Mrs. Barbara Blackburn has averaged 150 wpm in 50 minutes and her top
            speed was 212 wpm.
          </li>
        </ul>
      </div>
    </>
  );
}

export default memo(Result);
