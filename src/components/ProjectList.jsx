import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    setLoading(true)
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setProjects(data)
    }
    setLoading(false)
  }

  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg mb-2">Meine Projekte</h2>

      {loading ? (
        <p>Lade Projekte...</p>
      ) : projects.length === 0 ? (
        <p>Keine Projekte vorhanden</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id} className="border rounded p-3">
              <Link to={`/projects/${project.id}`} className="block">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {project.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

