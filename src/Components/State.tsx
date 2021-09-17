import React, { memo } from 'react'

interface Props {
  title: string
  value: number | string
  symbol?: string
}

function Stats({ title, value, symbol }: Props) {
  return (
    <div className='box'>
      <div className='state-title'>{title}</div>
      <div className='state-value'>
        <span className='state-value'>{value}</span>
        {symbol && <span>{symbol}</span>}
      </div>
    </div>
  )
}

export default memo(Stats)
