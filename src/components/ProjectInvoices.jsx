import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function ProjectInvoices({ projectId }) {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  // Neues Invoice Formular
  const [items, setItems] = useState([
    { description: "", quantity: 1, unit_price: 0 },
  ])

  useEffect(() => {
    fetchInvoices()
  }, [projectId])

  async function fetchInvoices() {
    setLoading(true)
    const { data, error } = await supabase
      .from("invoices")
      .select("*, invoice_items(*)")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setInvoices(data)
    }
    setLoading(false)
  }

  function handleItemChange(index, field, value) {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
  }

  function addItem() {
    setItems([...items, { description: "", quantity: 1, unit_price: 0 }])
  }

  async function createInvoice(e) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()

    // Summe berechnen
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    )

    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert([
        {
          project_id: projectId,
          status: "open",
          invoice_number: 1,
          total,
        },
      ])
      .select()
      .single()

    if (invoiceError) {
      alert(invoiceError.message)
      return
    }

    // Invoice Items speichern
    const itemsToInsert = items
      .filter((i) => i.description.trim() !== "")
      .map((i) => ({
        invoice_id: invoice.id,
        description: i.description,
        quantity: i.quantity,
        unit_price: i.unit_price,
      }))

    if (itemsToInsert.length > 0) {
      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsToInsert)

      if (itemsError) {
        alert(itemsError.message)
      }
    }

    setItems([{ description: "", quantity: 1, unit_price: 0 }])
    fetchInvoices()
  }

  return (
    <div>
      {/* Neues Invoice Formular */}
      <form onSubmit={createInvoice} className="mb-6 space-y-2 border p-4 rounded">
        <h2 className="font-bold">Neue Rechnung</h2>
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              placeholder="Beschreibung"
              value={item.description}
              onChange={(e) => handleItemChange(idx, "description", e.target.value)}
              className="flex-1 border px-2 py-1 rounded"
              required
            />
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
              className="w-20 border px-2 py-1 rounded"
            />
            <input
              type="number"
              step="0.01"
              value={item.unit_price}
              onChange={(e) => handleItemChange(idx, "unit_price", Number(e.target.value))}
              className="w-24 border px-2 py-1 rounded"
            />€
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-blue-600"
        >
          + Position hinzufügen
        </button>
        <button
          type="submit"
          className="block bg-green-600 text-white px-4 py-2 rounded"
        >
          Rechnung erstellen
        </button>
      </form>

      {/* Rechnungen Liste */}
      {loading ? (
        <p>Lade Rechnungen...</p>
      ) : invoices.length === 0 ? (
        <p>Keine Rechnungen vorhanden.</p>
      ) : (
        <ul className="space-y-4">
          {invoices.map((inv) => (
            <li key={inv.id} className="border rounded p-4">
              <div className="flex justify-between">
                <p className="font-semibold">Rechnung #{inv.id.slice(0, 6)}</p>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {inv.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Gesamt: {inv.total}€
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {inv.invoice_items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.description} ({item.quantity} × {item.unit_price}€)
                    </span>
                    <span>{item.subtotal}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
