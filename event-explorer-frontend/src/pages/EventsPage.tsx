import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import type { Event } from '../types'

function EventsPage({ onLogout }: { onLogout: () => void }) {
  const [search, setSearch] = useState('')

  const fetchEvents = async () => {
    const token = localStorage.getItem('token')
    let url = 'http://localhost:1337/api/events?populate=*'
    if (search) {
      url += `&filters[$or][0][title][$containsi]=${encodeURIComponent(search)}&filters[$or][1][location][$containsi]=${encodeURIComponent(search)}`
    }
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error('Could not load events')
    const data = await res.json()
    return data.data as Event[]
  }

  const { data: events = [], isLoading, error, refetch } = useQuery<Event[], Error>({
    queryKey: ['events', search],
    queryFn: fetchEvents,
  })

  if (error) toast.error('Error loading events')

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ToastContainer position="top-right" />
      
      {/* Header */}
      <motion.div 
        className="login-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1>Event Explorer</h1>
          <motion.button
            onClick={onLogout}
            style={{ backgroundColor: 'white', color: '#4285f4', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
            whileHover={{ scale: 1.05, backgroundColor: '#f0f0f0' }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Out
          </motion.button>
        </div>
      </motion.div>
      
      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <motion.h2 
          style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Upcoming Events
        </motion.h2>
        
        <motion.div 
          style={{ marginBottom: '20px', maxWidth: '500px' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              placeholder="Search events..."
              style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRight: 'none' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <motion.button
              style={{ backgroundColor: '#4285f4', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
              onClick={() => refetch()}
              whileHover={{ backgroundColor: '#3b75d9' }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
          </div>
        </motion.div>
        
        {isLoading ? (
          <motion.div 
            style={{ textAlign: 'center', padding: '40px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #4285f4', borderRadius: '50%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ) : (
          events.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {events.map((ev, index) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 * index, // Stagger based on index
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <Link to={`/event/${ev.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.div 
                      style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white' }}
                      whileHover={{ 
                        y: -10, 
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      {ev.attributes.image?.data && (
                        <div style={{ height: '160px', overflow: 'hidden' }}>
                          <motion.img
                            src={`http://localhost:1337${ev.attributes.image.data.attributes.url}`}
                            alt={ev.attributes.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      )}
                      <div style={{ padding: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#4285f4' }}>
                          {ev.attributes.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                          <span style={{ marginRight: '4px' }}>📅</span>
                          <span>{formatDate(ev.attributes.date)}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#666' }}>
                          <span style={{ marginRight: '4px' }}>📍</span>
                          <span>{ev.attributes.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p style={{ color: '#666' }}>No events found matching your search.</p>
              <motion.button 
                onClick={() => setSearch('')} 
                style={{ color: '#4285f4', border: 'none', background: 'none', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear search
              </motion.button>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}

// Helper function to format dates
function formatDate(dateString: string) {
  // If it's an ISO date string or similar, format it nicely
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    }
  } catch (e) {
    // If parsing fails, just return the original string
  }
  return dateString;
}

export default EventsPage 