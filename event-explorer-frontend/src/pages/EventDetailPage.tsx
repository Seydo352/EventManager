import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Event } from '../types'

function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    const getEvent = async () => {
      setLoading(true)
      setErr('')
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:1337/api/events/${id}?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (data.data) {
          setEvent(data.data as Event)
        } else {
          setErr('Could not load event')
        }
      } catch (e) {
        setErr('Something went wrong')
      }
      setLoading(false)
    }
    getEvent()
  }, [id])

  if (loading) return <div className="p-8">Loading...</div>
  if (err) return <div className="p-8 text-red-500">{err}</div>
  if (!event) return null

  return (
    <div className="p-8 max-w-xl mx-auto">
      <button onClick={() => nav(-1)} className="mb-4 text-blue-500 hover:underline">&larr; Back</button>
      <motion.div
        className="bg-white p-6 rounded shadow"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        layout
      >
        <h2 className="text-2xl font-bold mb-2">{event.attributes.title}</h2>
        <div className="mb-2 text-gray-600">{event.attributes.date}</div>
        <div className="mb-2 text-gray-500">{event.attributes.location}</div>
        <div className="mb-4">{event.attributes.description}</div>
        {event.attributes.image?.data && (
          <img
            src={`http://localhost:1337${event.attributes.image.data.attributes.url}`}
            alt="event"
            className="w-full rounded"
          />
        )}
      </motion.div>
    </div>
  )
}

export default EventDetailPage 