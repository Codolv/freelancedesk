import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ProjectUpdates({ projectId }) {
  const [updates, setUpdates] = useState([])
  const [newUpdate, setNewUpdate] = useState("")
  const [loading, setLoading] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const draftKey = 'message-draft-${projectId}';

  useEffect(() => {
    fetchUpdates()
  }, [projectId])

  //load draft
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if(savedDraft) setNewUpdate(savedDraft);
  }, [draftKey]);

  //save draft
  useEffect(() => {
    localStorage.setItem(draftKey, newUpdate);
  }, [draftKey, newUpdate]);

  async function fetchUpdates() {
    setLoading(true)
    const { data, error } = await supabase
      .from("messages")
      .select("id, content, created_at, user_id")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setUpdates(data)
    }
    setLoading(false)
  }

  async function addUpdate(e) {
    e.preventDefault()
    if (!newUpdate.trim()) return

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from("messages").insert([
      {
        project_id: projectId,
        user_id: user.id,
        content: newUpdate,
      },
    ])

    if (error) {
      alert(error.message)
    } else {
      setNewUpdate("");
      localStorage.removeItem(draftKey);
      fetchUpdates();
    }
  }

  return (
    <div>
      <form onSubmit={addUpdate} className="mb-4 flex space-x-2">
        <textarea
          placeholder="Update schreiben... (Markdown unterstützt)"
          value={newUpdate}
          onChange={(e) => setNewUpdate(e.target.value)}
          className="w-full h-32 p-2 border rounded"
        />
	<div className="flex justify-between items-center mb-2">
	<div className="space-x-3">
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              className="text-xs text-blue-600 underline"
            >
              {showHelp ? "Markdown-Hilfe ausblenden" : "Markdown-Hilfe anzeigen"}
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs text-green-600 underline"
            >
              {showPreview ? "Preview ausblenden" : "Preview anzeigen"}
            </button>
          </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Posten
        </button>
        </div>
      </form>
	{showHelp && (
          <div className="text-xs bg-gray-50 border rounded p-3 space-y-1">
            <p><b>Markdown Quick-Guide:</b></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><code>**fett**</code> → <b>fett</b></li>
              <li><code>*kursiv*</code> → <i>kursiv</i></li>
              <li><code>- Liste</code> → Aufzählung</li>
              <li><code>[Link](https://example.com)</code> → <a href="https://example.com">Link</a></li>
              <li><code>`Code`</code> → <code>Code</code></li>
              <li><code>```js … ```</code> → Codeblock</li>
              <li><code>| A | B |</code> Tabellen mit Pipes</li>
            </ul>
          </div>
        )}
        {showPreview && (
          <div className="border rounded p-3 bg-white prose prose-sm">
            <p className="text-xs text-gray-500 mb-2">Vorschau:</p>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {newUpdate || "*Noch kein Inhalt*"}
            </ReactMarkdown>
          </div>
        )}

      {loading ? (
        <p>Lade Updates...</p>
      ) : updates.length === 0 ? (
        <p>Keine Updates vorhanden.</p>
      ) : (
        <ul className="space-y-3">
          {updates.map((u) => (
            <li key={u.id} className="border rounded p-3">
              <div className="prose prose-sm mt-2">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {u.content}
                </ReactMarkdown>
                <span className="text-xs text-gray-500">
                  {new Date(u.created_at).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

