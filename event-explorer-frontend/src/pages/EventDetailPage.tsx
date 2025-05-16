import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import type { Event } from '../types'

function EventDetailPage() {
  const { id } = useParams()
  const nav = useNavigate()

  const fetchEvent = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:1337/api/events/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error('Could not load event')
    const data = await res.json()
    return data.data as Event
  }

  const { data: event, isLoading, error } = useQuery<Event, Error>({
    queryKey: ['event', id],
    queryFn: fetchEvent,
  })

  if (error) {
    toast.error('Error loading event details')
  }
  
  // Helper function to format dates
  const formatDate = (dateString: string) => {
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
  };

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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1>Event Explorer</h1>
        </div>
      </motion.div>
      
      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <motion.button 
          onClick={() => nav(-1)} 
          style={{ display: 'inline-flex', alignItems: 'center', color: '#4285f4', border: 'none', background: 'none', marginBottom: '20px', cursor: 'pointer', fontWeight: 'bold' }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span style={{ marginRight: '5px' }}>←</span>
          Back to events
        </motion.button>
        
        {isLoading ? (
          <motion.div 
            style={{ textAlign: 'center', padding: '40px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #4285f4', borderRadius: '50%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ) : event ? (
          <motion.div 
            style={{ maxWidth: '800px', margin: '0 auto' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white' }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {event.attributes.image?.data && (
                <motion.div 
                  style={{ overflow: 'hidden', maxHeight: '400px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <motion.img
                    src={`http://localhost:1337${event.attributes.image.data.attributes.url}`}
                    alt={event.attributes.title}
                    style={{ width: '100%', objectFit: 'cover' }}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </motion.div>
              )}
              
              <motion.div 
                style={{ padding: '20px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.h2 
                  style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {event.attributes.title}
                </motion.h2>
                
                <motion.div 
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', color: '#666' }}>
                    <span style={{ marginRight: '5px' }}>📅</span>
                    <span>{formatDate(event.attributes.date)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', color: '#666' }}>
                    <span style={{ marginRight: '5px' }}>📍</span>
                    <span>{event.attributes.location}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <motion.h3 
                    style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    About this event
                  </motion.h3>
                  <motion.div 
                    style={{ color: '#333', lineHeight: '1.6' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <p>{event.attributes.description}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', maxWidth: '800px', margin: '0 auto' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ color: '#666' }}>Event not found</p>
            <motion.button 
              onClick={() => nav(-1)} 
              style={{ color: '#4285f4', border: 'none', background: 'none', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to events
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default EventDetailPage 