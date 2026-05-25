"use client"

import { useEffect, useState } from "react"
import ComponentTree from "@/components/builder/ComponentTree"
import ConversationBar from "@/components/builder/ConversationBar"
import PreviewList from "@/components/builder/PreviewList"
import SchemaPreviewPanel from "@/components/builder/SchemaPreviewPanel"
import Sidebar from "@/components/builder/Sidebar"
import SchemaRenderer from "@/components/renderer/SchemaRenderer"
import { templates } from "@/data/templates"
import { useBuilderStore } from "@/store/builderStore"
import { AppRecord, MutationRecord, PreviewRecord, RuntimeSchema } from "@/types/app"
import Link from "next/link"

export default function BuilderWorkspace({
  initialApp
}: {
  initialApp: AppRecord
}) {
  const { app, setApp } = useBuilderStore()
  const [previews, setPreviews] = useState<PreviewRecord[]>(initialApp.previews || [])
  const [creatingPreview, setCreatingPreview] = useState(false)
  const [shareMsg, setShareMsg] = useState<string | null>(null)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)
  const [undoing, setUndoing] = useState(false)

  useEffect(() => {
    setApp(initialApp)
  }, [initialApp, setApp])

  const current = app || initialApp
  const schema = current.schema as RuntimeSchema
  const template = templates.find((t) => t.id === current.templateId)

  async function createPreview() {
    setCreatingPreview(true)
    const res = await fetch(`/api/apps/${current.id}/preview`, { method: "POST" })
    const data = await res.json()
    setCreatingPreview(false)

    if (data.token) {
      const url = `${window.location.origin}${data.previewUrl}`
      await navigator.clipboard.writeText(url)
      setCopyMsg("Link copied!")
      setTimeout(() => setCopyMsg(null), 2000)
      setPreviews((prev) => [
        {
          id: data.token,
          token: data.token,
          createdAt: new Date().toISOString(),
          expiresAt: data.expiresAt
        },
        ...prev
      ])
    }
  }

  function shareApp() {
    navigator.clipboard.writeText(`${window.location.origin}/builder/${current.id}`)
    setShareMsg("Builder link copied")
    setTimeout(() => setShareMsg(null), 2000)
  }

  async function undo() {
    setUndoing(true)
    const res = await fetch(`/api/apps/${current.id}/undo`, { method: "POST" })
    const data = await res.json()
    setUndoing(false)
    if (data.app) setApp(data.app)
  }

  function handleMutated(updated: AppRecord) {
    setApp(updated)
    if (updated.previews) setPreviews(updated.previews)
  }

  function handleOptimistic(entry: MutationRecord) {
    setApp({
      ...current,
      mutations: [entry, ...(current.mutations || [])]
    })
  }

  async function revertOptimistic() {
    const res = await fetch(`/api/apps/${current.id}`)
    if (res.ok) setApp(await res.json())
  }

  return (
    <div className="min-h-screen bg-surface-page">
      <header className="glass-nav sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/" className="text-sm text-primary font-medium shrink-0">
              ← Home
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-ink-head truncate">{current.name}</h1>
              <p className="text-xs text-ink-muted mt-0.5">
                App ID <span className="font-mono text-ink-body">{current.id.slice(0, 12)}…</span>
                {template && (
                  <>
                    {" "}
                    · Generated from {template.name} v{template.version}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-primary">Schema v{current.version}</span>
            {shareMsg && <span className="text-xs text-accent-teal">{shareMsg}</span>}
            {copyMsg && <span className="text-xs text-accent-teal">{copyMsg}</span>}
            <button type="button" onClick={undo} disabled={undoing || current.version <= 1} className="btn-secondary px-4 py-2 text-sm disabled:opacity-40">
              {undoing ? "Undoing..." : "Undo"}
            </button>
            <button type="button" onClick={shareApp} className="btn-secondary px-4 py-2 text-sm">
              Share
            </button>
            <button type="button" onClick={createPreview} disabled={creatingPreview} className="btn-primary px-4 py-2 text-sm disabled:opacity-50">
              {creatingPreview ? "Creating..." : "Preview"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <ComponentTree schema={schema} />
            <Sidebar mutations={current.mutations || []} />
            <PreviewList previews={previews} onCreate={createPreview} creating={creatingPreview} />
          </div>

          <div className="col-span-12 lg:col-span-6 space-y-4">
            <div className="card p-2 border-dashed border-primary/30">
              <div className="text-xs font-semibold uppercase tracking-wide text-primary px-3 py-2">
                Live canvas
              </div>
              <div className="p-4">
                <SchemaRenderer schema={schema} />
              </div>
            </div>
            <ConversationBar
              appId={current.id}
              onMutated={handleMutated}
              onOptimistic={handleOptimistic}
              onRevertOptimistic={revertOptimistic}
            />
          </div>

          <div className="col-span-12 lg:col-span-3">
            <SchemaPreviewPanel schema={schema} />
          </div>
        </div>
      </main>

      <footer className="border-t border-line-light py-3 px-6 text-xs text-ink-muted flex justify-between">
        <span>Last loaded {new Date().toLocaleString()}</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-teal" />
          Connected
        </span>
      </footer>
    </div>
  )
}
