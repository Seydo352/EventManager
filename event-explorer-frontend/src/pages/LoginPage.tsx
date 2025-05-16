import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    try {
      const res = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: pass,
        }),
      })
      const data = await res.json()
      if (data.jwt) {
        localStorage.setItem('token', data.jwt)
        onLogin()
      } else {
        setErr('Login failed. Please check your credentials.')
        toast.error('Login failed. Please check your information.')
      }
    } catch (e) {
      setErr('Connection error. Please try again later.')
      toast.error('Connection error. Please try again.')
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ToastContainer position="top-center" />
      
      {/* Header */}
      <motion.div 
        className="login-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Event Explorer</h1>
      </motion.div>
      
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          style={{ textAlign: 'center', marginBottom: '10px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Sign in to your account
        </motion.h2>
        <motion.p 
          style={{ textAlign: 'center', marginBottom: '20px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Or <a href="#" style={{ color: 'blue', textDecoration: 'none' }}>create a new account</a>
        </motion.p>
        
        <form onSubmit={handleLogin}>
          <motion.div 
            style={{ marginBottom: '10px' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: '#ffffcc', width: '100%', padding: '8px', border: '1px solid #ccc' }}
              required
            />
          </motion.div>
          
          <motion.div 
            style={{ marginBottom: '10px' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{ backgroundColor: '#ffffcc', width: '100%', padding: '8px', border: '1px solid #ccc' }}
              required
            />
          </motion.div>
          
          <motion.div 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div>
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                style={{ marginRight: '5px' }}
              />
              <label htmlFor="remember-me" style={{ display: 'inline' }}>
                Remember me
              </label>
            </div>
            
            <a href="#" style={{ color: 'blue', textDecoration: 'none' }}>
              Forgot your password?
            </a>
          </motion.div>
          
          <motion.button
            type="submit"
            style={{ backgroundColor: '#4285f4', color: 'white', border: 'none', width: '100%', padding: '10px', cursor: 'pointer' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Sign in
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default LoginPage