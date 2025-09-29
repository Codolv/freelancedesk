import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import ProjectUpdates from "./ProjectUpdates"
import ProjectInvoices from "./ProjectInvoices"


export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("updates")

  useEffect(() => {
    fetchProject()
  }, [id])

  async function fetchProject() {
    setLoading(true)
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(error)
    } else {
      setProject(data)
    }
    setLoading(false)
  }

  if (loading) return <p>Lade...</p>
  if (!project) return <p>Projekt nicht gefunden</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link to="/" className="text-blue-600 underline">
        ← Zurück zur Übersicht
      </Link>

      <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
      <p className="mb-4 text-gray-700">{project.description}</p>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <button
          onClick={() => setTab("updates")}
          className={`pb-2 ${tab === "updates" ? "border-b-2 border-blue-600 font-bold" : ""}`}
        >
          Updates
        </button>
        <button
          onClick={() => setTab("invoices")}
          className={`pb-2 ${tab === "invoices" ? "border-b-2 border-blue-600 font-bold" : ""}`}
        >
          Rechnungen
        </button>
        <button
          onClick={() => setTab("files")}
          className={`pb-2 ${tab === "files" ? "border-b-2 border-blue-600 font-bold" : ""}`}
        >
          Dateien
        </button>
      </div>

      {/* Inhalte */}
      {tab === "invoices" && <ProjectInvoices projectId={project.id} />}
      {tab === "files" && <p>Hier kommen Dateien...</p>}
      {tab === "updates" && <ProjectUpdates projectId={project.id} />}
    </div>
  )
}

