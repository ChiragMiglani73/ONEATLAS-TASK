import { templates } from "@/data/templates"
import { parseSchema, stringifySchema } from "@/lib/json"
import { prisma } from "@/lib/prisma"
import { applyMutation } from "@/services/mutationEngine"
import { RuntimeSchema } from "@/types/app"

type AppWithRelations = {
  id: string
  name: string
  templateId: string
  schema: string
  version: number
  mutations?: {
    id: string
    instruction: string
    result: string
    version: number
    createdAt: Date
  }[]
  previews?: {
    id: string
    token: string
    createdAt: Date
    expiresAt: Date | null
  }[]
}

export function formatAppResponse(app: AppWithRelations) {
  return {
    id: app.id,
    name: app.name,
    templateId: app.templateId,
    schema: parseSchema(app.schema),
    version: app.version,
    mutations: app.mutations?.map((m) => ({
      id: m.id,
      instruction: m.instruction,
      result: m.result,
      version: m.version,
      createdAt: m.createdAt.toISOString()
    })),
    previews: app.previews?.map((p) => ({
      id: p.id,
      token: p.token,
      createdAt: p.createdAt.toISOString(),
      expiresAt: p.expiresAt?.toISOString() ?? null
    }))
  }
}

export async function applyAppMutation(appId: string, instruction: string) {
  const app = await prisma.app.findUnique({ where: { id: appId } })

  if (!app) return { error: "App not found", status: 404 as const }

  const currentSchema = parseSchema(app.schema)
  const outcome = applyMutation(currentSchema, instruction)

  if (!outcome.ok) {
    return {
      error: outcome.error,
      suggestion: outcome.suggestion,
      status: 422 as const
    }
  }

  const nextVersion = app.version + 1

  const mutation = await prisma.$transaction(async (tx) => {
    const record = await tx.mutation.create({
      data: {
        appId,
        instruction,
        result: outcome.result,
        version: nextVersion,
        schemaAfter: stringifySchema(outcome.schema)
      }
    })

    await tx.app.update({
      where: { id: appId },
      data: {
        schema: stringifySchema(outcome.schema),
        version: nextVersion
      }
    })

    return record
  })

  const updatedApp = await prisma.app.findUnique({
    where: { id: appId },
    include: {
      mutations: { orderBy: { createdAt: "desc" }, take: 20 },
      previews: { orderBy: { createdAt: "desc" }, take: 10 }
    }
  })

  if (!updatedApp) return { error: "App not found", status: 404 as const }

  return { app: updatedApp, mutation, status: 200 as const }
}

export async function undoAppMutation(appId: string) {
  const app = await prisma.app.findUnique({
    where: { id: appId },
    include: { mutations: { orderBy: { version: "desc" } } }
  })

  if (!app) return { error: "App not found", status: 404 as const }
  if (app.version <= 1) return { error: "Nothing to undo", status: 400 as const }

  const latest = app.mutations[0]
  await prisma.mutation.delete({ where: { id: latest.id } })

  const previous = app.mutations[1]
  let schema: RuntimeSchema

  if (previous?.schemaAfter) {
    schema = parseSchema(previous.schemaAfter)
  } else {
    const template = templates.find((t) => t.id === app.templateId)
    schema = template?.schema ?? parseSchema(app.schema)
  }

  const nextVersion = app.version - 1

  const updated = await prisma.app.update({
    where: { id: appId },
    data: {
      schema: stringifySchema(schema),
      version: nextVersion
    },
    include: {
      mutations: { orderBy: { createdAt: "desc" }, take: 20 },
      previews: { orderBy: { createdAt: "desc" }, take: 10 }
    }
  })

  return { app: updated, status: 200 as const }
}
