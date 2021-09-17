import React, { memo, useState, useEffect } from 'react'
import Header from './Header'

interface Props {
  children: JSX.Element
}

const STORAGE_KEY = 'wpm-app-darkmode'

const storedTheme = localStorage.getItem(STORAGE_KEY)
const themeMode: boolean = storedTheme
  ? JSON.parse(storedTheme)
  : localStorage.setItem(STORAGE_KEY, 'false')

function Layout({ children }: Props) {
  const [darkMode, setDarkMode] = useState(themeMode)

  const handleThemeMode = () => {
    setDarkMode((prev) => !prev)
  }

  useEffect(() => {
    if (storedTheme) localStorage.setItem(STORAGE_KEY, JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className={`App vh-100 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
      <Header handleThemeMode={handleThemeMode} darkMode={darkMode} />
      <div className='container main'>
        <div className='row g-5'>
          <div className='col-12'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default memo(Layout)
