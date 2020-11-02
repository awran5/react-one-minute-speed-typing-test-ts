import React, { memo } from 'react'

interface Props {
  children: JSX.Element[] | JSX.Element
}

function Layout({ children }: Props) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 mx-auto'>{children}</div>
      </div>
    </div>
  )
}

export default memo(Layout)
