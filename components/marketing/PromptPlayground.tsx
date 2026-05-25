"use client"

import SchemaPreviewPanel from "@/components/builder/SchemaPreviewPanel"
import { templates } from "@/data/templates"
import { GenerateResponse } from "@/types/app"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const LOADER_STEPS = [
  "Matching template...",
  "Building schema...",
  "Ready"
]

export default function PromptPlayground() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [loaderStep, setLoaderStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [result, setResult] = useState<GenerateResponse | null>(null)

  useEffect(() => {
    if (!loading) return
    const timers = [
      setTimeout(() => setLoaderStep(1), 600),
      setTimeout(() => setLoaderStep(2), 1400)
    ]
    return () => timers.forEach(clearTimeout)
  }, [loading])

  async function generateApp(templatePrompt?: string) {
    const value = templatePrompt || prompt
    if (!value.trim()) return

    setLoading(true)
    setLoaderStep(0)
    setError(null)
    setSuggestion(null)
    setResult(null)

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: value })
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || "Could not generate app")
      setSuggestion(data.suggestion || null)
      return
    }

    setResult(data)
    setTimeout(() => router.push(`/builder/${data.appId}`), 1200)
  }

  return (
    <section id="playground" className="max-w-6xl mx-auto px-6 pb-24">
      <div className="card p-8 md:p-10">
        <h2 className="text-2xl font-bold text-ink-head mb-2">Generate your runtime app</h2>
        <p className="text-ink-muted mb-6">
          Describe an operational workspace — we match the closest template and instantiate a live schema.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Build a CRM dashboard with customer analytics and revenue charts"
          className="w-full h-36 px-4 py-3 rounded-xl border border-line bg-surface-subtle text-ink-head text-base outline-none focus:border-primary resize-none"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setPrompt(`Build a ${t.name.toLowerCase()} with ${t.keywords.slice(0, 2).join(" ")}`)
              }}
              className="px-3 py-1.5 rounded-full text-sm border border-line bg-white text-ink-body hover:border-primary hover:text-primary transition"
            >
              {t.name}
            </button>
          ))}
        </div>

        {loading && (
          <div className="mt-6 p-4 rounded-xl bg-surface-subtle border border-line-light">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium text-ink-head">
                {LOADER_STEPS[loaderStep]}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-accent-pink/10 border border-accent-pink/30">
            <p className="text-sm text-accent-pink font-medium">{error}</p>
            {suggestion && <p className="text-sm text-ink-muted mt-2">{suggestion}</p>}
            <button
              type="button"
              onClick={() => {
                setError(null)
                setPrompt(suggestion || "")
              }}
              className="text-sm text-primary font-medium mt-3 hover:underline"
            >
              Try a different prompt
            </button>
          </div>
        )}

        {result && !error && (
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-accent-teal/10 border border-accent-teal/30">
              <p className="text-sm font-semibold text-ink-head">{result.generatedName}</p>
              <p className="text-xs text-ink-muted mt-1 font-mono">ID: {result.appId}</p>
              <p className="text-xs text-ink-muted mt-2">
                Generated from {result.templateUsed} v{result.templateVersion} · confidence{" "}
                {result.confidence} · matched: {result.matchedKeywords.join(", ")}
              </p>
            </div>
            <SchemaPreviewPanel schema={result.schema} />
          </div>
        )}

        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={() => generateApp()}
            disabled={loading}
            className="btn-primary px-8 py-3.5 text-base disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate App"}
          </button>
        </div>
      </div>
    </section>
  )
}
