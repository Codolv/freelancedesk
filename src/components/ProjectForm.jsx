import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function ProjectForm({ onProjectCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  async function createProject(e) {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from("projects")
      .insert([
        { 
          title, 
          description, 
          status: "open", 
          freelancer_id: user.id 
        }
      ])
      .select()

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      setTitle("")
      setDescription("")
      onProjectCreated(data[0])
    }
  }


  return (
    <form onSubmit={createProject} className="space-y-4 bg-gray-50 p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg">Neues Projekt</h2>

      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        placeholder="Beschreibung"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        rows="3"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Speichern..." : "Projekt erstellen"}
      </button>
    </form>
  )
}

