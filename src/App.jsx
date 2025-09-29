import { useState, useEffect } from "react"
import { supabase } from "./lib/supabase"
import ProjectForm from "./components/ProjectForm"
import ProjectList from "./components/ProjectList"

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!session) {
    return <Auth />
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">FreelanceDesk Dashboard</h1>
      <ProjectForm onProjectCreated={() => window.location.reload()} />
      <ProjectList />
    </div>
  )
}

function Auth() {
  async function signIn() {
    await supabase.auth.signInWithPassword({
      email: "demo@freelancer.com",
      password: "password123",
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

export default App

