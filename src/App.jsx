import './styles/theme.css'
import './styles/utilities.css'
import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import Home from './screens/Home/Home'
import MainScreen from './screens/Main/MainScreen'
import Profile from './screens/Profile/Profile'
import Login from './screens/Login/Login'
import UserAuth from './screens/User/UserAuth'
/* import MainScreen from './components/screens/Main/MainScreen' */


function App() {
  const [sessionId, setSessionId] = useState(null)


  const handleLogin = (sessionId) => {
    console.log('Logged in with session ID:', sessionId)
    setSessionId(sessionId) // Store session ID globally
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} /> */}
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main" element={<MainScreen sessionId={sessionId} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<UserAuth onLogin={handleLogin}/>} />
      </Routes>
    </Router>
  )
}

export default App
