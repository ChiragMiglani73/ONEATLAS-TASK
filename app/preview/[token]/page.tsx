import SchemaRenderer from "@/components/renderer/SchemaRenderer"
import { parseSnapshot } from "@/lib/json"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function PreviewPage({
  params
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const preview = await prisma.preview.findUnique({ where: { token } })

  if (!preview) {
    notFound()
  }

  if (preview.expiresAt && preview.expiresAt < new Date()) {
    notFound()
  }

  const snapshot = parseSnapshot(preview.snapshot)

  return (
    <div className="min-h-screen bg-surface-page">
      <div className="bg-accent-yellow/20 border-b border-accent-yellow/40 px-6 py-3 text-center text-sm font-medium text-ink-head">
        This is a frozen preview snapshot — edits to the live app will not affect this view.
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Link href="/" className="text-sm text-primary font-medium hover:underline">
          ← Back to OneAtlas
        </Link>
        <h1 className="text-3xl font-bold text-ink-head mt-6">{snapshot.name}</h1>
        <p className="text-ink-muted mt-2">
          Version {snapshot.version} at capture
          {snapshot.templateId ? ` · Template ${snapshot.templateId}` : ""}
        </p>
        <div className="mt-8">
          <SchemaRenderer schema={snapshot.schema} />
        </div>
      </main>
    </div>
  )
}
