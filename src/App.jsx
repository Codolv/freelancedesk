import { useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [session, setSession] = useState(null)

  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })

  if (!session) {
    return <Auth />
  } else {
    return <Dashboard />
  }
}

function Auth() {
  async function signIn() {
    await supabase.auth.signInWithPassword({
      email: 'demo@freelancer.com',
      password: 'password123',
    })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={signIn}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Demo Login
      </button>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">FreelanceDesk Dashboard</h1>
      <p>Willkommen!</p>
    </div>
  )
}

export default App

