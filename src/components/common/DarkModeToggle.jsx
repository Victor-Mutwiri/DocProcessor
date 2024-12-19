import { useState, useEffect } from 'react'
import '../../styles/DarkModeToggle.css'

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setIsDark(darkModeMediaQuery.matches)

        const handler = (e) => setIsDark(e.matches)
        darkModeMediaQuery.addEventListener('change', handler)
        return () => darkModeMediaQuery.removeEventListener('change', handler)
    }, [])

    const toggleDarkMode = () => {
        const newMode = !isDark
        setIsDark(newMode)
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light')
    }

    return (
        <button 
            onClick={toggleDarkMode}
            className="dark-mode-toggle"
            aria-label="Toggle dark mode"
        >
            <span className="dark-mode-toggle-icon">
                {isDark ? '🌞' : '🌙'}
            </span>
            <span className="dark-mode-toggle-label">
                {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
        </button>
    )
}

export default DarkModeToggle 