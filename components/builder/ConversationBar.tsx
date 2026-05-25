"use client"

import { AppRecord, MutationRecord } from "@/types/app"
import { useState } from "react"

export default function ConversationBar({
  appId,
  onMutated,
  onOptimistic,
  onRevertOptimistic
}: {
  appId: string
  onMutated: (app: AppRecord) => void
  onOptimistic: (entry: MutationRecord) => void
  onRevertOptimistic: () => void
}) {
  const [instruction, setInstruction] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function sendInstruction() {
    if (!instruction.trim() || loading) return

    const text = instruction.trim()
    setLoading(true)
    setMessage(null)
    setError(null)

    const optimistic: MutationRecord = {
      id: `temp-${Date.now()}`,
      instruction: text,
      result: "Applying...",
      version: 0,
      createdAt: new Date().toISOString()
    }
    onOptimistic(optimistic)
    setInstruction("")

    const res = await fetch(`/api/apps/${appId}/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instruction: text })
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.suggestion ? `${data.error} — Did you mean: "${data.suggestion}"?` : data.error)
      onRevertOptimistic()
      return
    }

    onMutated(data.app)
    setMessage(data.mutation?.result || "Schema updated")
  }

  return (
    <div className="card p-4 border-primary/20">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendInstruction()}
          placeholder='e.g. "Add a priority field to tasks"'
          className="flex-1 px-4 py-3 rounded-xl border border-line bg-surface-subtle text-ink-head outline-none focus:border-primary text-sm"
        />
        <button
          type="button"
          onClick={sendInstruction}
          disabled={loading}
          className="btn-primary px-6 py-3 text-sm disabled:opacity-50 shrink-0"
        >
          {loading ? "Applying..." : "Send"}
        </button>
      </div>
      {message && <p className="text-sm text-accent-teal mt-2">{message}</p>}
      {error && <p className="text-sm text-accent-pink mt-2">{error}</p>}
    </div>
  )
}
