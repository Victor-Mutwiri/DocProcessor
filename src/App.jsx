import './styles/theme.css'
import './styles/utilities.css'
import './styles/App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
/* import { SignIn, SignUp } from '@clerk/clerk-react' */
import Home from './screens/Home/Home'
import MainScreen from './screens/Main/MainScreen'
import Profile from './screens/Profile/Profile'
import UserAuth from './screens/User/UserAuth'
/* import MainScreen from './components/screens/Main/MainScreen' */

const SESSION_EXPIRATION_HOURS = 2

function App() {
  const [sessionId, setSessionId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  const handleLogin = (sessionId) => {
    console.log('Logged in with session ID:', sessionId)
    const expirationTime = new Date().getTime() + SESSION_EXPIRATION_HOURS * 60 * 60 * 1000
    setSessionId(sessionId)
    localStorage.setItem('sessionId', sessionId)
    localStorage.setItem('sessionExpiration', expirationTime)
  }

  const handleLogout = () => {
    setSessionId(null)
    localStorage.removeItem('sessionId')
    localStorage.removeItem('sessionExpiration')
  }

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId')
    const sessionExpiration = localStorage.getItem('sessionExpiration')
    const currentTime = new Date().getTime()
    if (storedSessionId && sessionExpiration && currentTime < sessionExpiration) {
      setSessionId(storedSessionId)
    } else {
      handleLogout()
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} /> */}
        {/* <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} /> */}
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/main" element={<MainScreen sessionId={sessionId} />} /> */}
        <Route path="/main" element={<MainScreen sessionId={sessionId} onLogout={handleLogout} />} />
        {/* <Route path='/user' element={<UserAuth onLogin={handleLogin}/>} /> */}
        <Route path="/user" element={sessionId ? <Navigate to="/main" /> : <UserAuth onLogin={handleLogin} />} />
      </Routes>
    </Router>
  )
}

export default App
