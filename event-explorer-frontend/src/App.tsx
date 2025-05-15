import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) setLoggedIn(true)
  }, [])

  const handleLogin = () => setLoggedIn(true)
  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  if (!loggedIn) return <LoginPage onLogin={handleLogin} />

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage onLogout={handleLogout} />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App