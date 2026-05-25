import BuilderWorkspace from "@/components/builder/BuilderWorkspace"
import { parseSchema } from "@/lib/json"
import { prisma } from "@/lib/prisma"
import { AppRecord } from "@/types/app"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function BuilderPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const app = await prisma.app.findUnique({
    where: { id },
    include: {
      mutations: { orderBy: { createdAt: "desc" }, take: 20 },
      previews: { orderBy: { createdAt: "desc" }, take: 10 }
    }
  })

  if (!app) notFound()

  const initialApp: AppRecord = {
    id: app.id,
    name: app.name,
    templateId: app.templateId,
    schema: parseSchema(app.schema),
    version: app.version,
    mutations: app.mutations.map((m) => ({
      id: m.id,
      instruction: m.instruction,
      result: m.result,
      version: m.version,
      createdAt: m.createdAt.toISOString()
    })),
    previews: app.previews.map((p) => ({
      id: p.id,
      token: p.token,
      createdAt: p.createdAt.toISOString(),
      expiresAt: p.expiresAt?.toISOString() ?? null
    }))
  }

  return <BuilderWorkspace initialApp={initialApp} />
}
