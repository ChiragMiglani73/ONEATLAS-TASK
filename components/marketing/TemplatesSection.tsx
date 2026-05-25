"use client"

import { templates } from "@/data/templates"
import { useRouter } from "next/navigation"
import { useState } from "react"

const complexityStyle: Record<string, string> = {
  Simple: "badge-teal",
  Moderate: "badge-primary",
  Advanced: "badge-pink"
}

export default function TemplatesSection() {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function useTemplate(id: string, name: string, keywords: string[]) {
    setLoadingId(id)
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: `Build a ${name} with ${keywords.join(" ")}` })
    })
    const data = await res.json()
    setLoadingId(null)
    if (data.appId) router.push(`/builder/${data.appId}`)
  }

  return (
    <section id="templates" className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
          Runtime Templates
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-ink-head">
          Reusable operational systems
        </h2>
        <p className="text-ink-muted mt-3 max-w-xl">
          Templates drive consistency — deployable, AI-native workspaces for your team.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="card overflow-hidden flex flex-col">
            <div className="h-36 bg-gradient-to-br from-primary/15 via-accent-cyan/10 to-accent-pink/15" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-semibold text-lg text-ink-head">{template.name}</h3>
                <span className={`badge shrink-0 ${complexityStyle[template.complexity]}`}>
                  {template.complexity}
                </span>
              </div>
              <span className="text-xs text-ink-muted mb-3">{template.category}</span>
              <p className="text-sm text-ink-muted flex-1">{template.description}</p>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => useTemplate(template.id, template.name, template.keywords)}
                  disabled={loadingId === template.id}
                  className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-50"
                >
                  {loadingId === template.id ? "Loading..." : "Use Template"}
                </button>
                <button
                  type="button"
                  onClick={() => useTemplate(template.id, template.name, template.keywords)}
                  className="flex-1 btn-secondary py-2.5 text-sm"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
