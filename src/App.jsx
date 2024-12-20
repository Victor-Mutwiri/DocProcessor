import './styles/theme.css'
import './styles/utilities.css'
import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/clerk-react'
import Home from './screens/Home/Home'
import MainScreen from './screens/Main/MainScreen'
/* import MainScreen from './components/screens/Main/MainScreen' */


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/main" element={<MainScreen />} />
      </Routes>
    </Router>
  )
}

export default App
