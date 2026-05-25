"use client"

import { PreviewRecord } from "@/types/app"
import { useState } from "react"

export default function PreviewList({
  previews,
  onCreate,
  creating
}: {
  previews: PreviewRecord[]
  onCreate: () => void
  creating: boolean
}) {
  const [copied, setCopied] = useState<string | null>(null)

  function copyLink(token: string) {
    const url = `${window.location.origin}/preview/${token}`
    navigator.clipboard.writeText(url)
    setCopied(token)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ink-head text-lg">Previews</h3>
        <button
          type="button"
          onClick={onCreate}
          disabled={creating}
          className="text-xs btn-primary px-3 py-1.5 disabled:opacity-50"
        >
          {creating ? "..." : "New"}
        </button>
      </div>

      {previews.length === 0 ? (
        <p className="text-sm text-ink-muted">No previews yet. Create one from the top bar.</p>
      ) : (
        <ul className="space-y-2">
          {previews.map((preview) => (
            <li
              key={preview.id}
              className="p-3 rounded-xl bg-surface-subtle border border-line-light"
            >
              <div className="text-xs text-ink-muted mb-2">
                {new Date(preview.createdAt).toLocaleString()}
              </div>
              <div className="flex gap-2">
                <a
                  href={`/preview/${preview.token}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Open
                </a>
                <button
                  type="button"
                  onClick={() => copyLink(preview.token)}
                  className="text-xs text-ink-muted hover:text-primary"
                >
                  {copied === preview.token ? "Link copied!" : "Copy link"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
