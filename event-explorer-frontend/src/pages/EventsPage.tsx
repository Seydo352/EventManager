import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { Event } from '../types'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div className="p-8 max-w-2xl mx-auto">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Events</h2>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by title or location..."
          className="p-2 border rounded w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => refetch()}
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          <AnimatePresence>
            {events.length > 0 ? events.map((ev: Event) => (
              <motion.li
                key={ev.id}
                className="p-4 bg-white rounded shadow hover:bg-blue-50 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <Link to={`/event/${ev.id}`} className="block">
                  <div className="font-bold text-lg">{ev.attributes.title}</div>
                  <div className="text-gray-600">{ev.attributes.date}</div>
                  <div className="text-gray-500">{ev.attributes.location}</div>
                </Link>
              </motion.li>
            )) : <div>No events found.</div>}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}

export default EventsPage 