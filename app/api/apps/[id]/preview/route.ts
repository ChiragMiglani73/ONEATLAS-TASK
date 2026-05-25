import { parseSchema } from "@/lib/json"
import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

const PREVIEW_TTL_DAYS = 7

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const app = await prisma.app.findUnique({ where: { id } })

  if (!app) {
    return NextResponse.json({ error: "App not found" }, { status: 404 })
  }

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + PREVIEW_TTL_DAYS)

  const token = nanoid(12)
  const preview = await prisma.preview.create({
    data: {
      appId: id,
      token,
      expiresAt,
      snapshot: JSON.stringify({
        name: app.name,
        version: app.version,
        templateId: app.templateId,
        schema: parseSchema(app.schema)
      })
    }
  })

  const previewUrl = `/preview/${preview.token}`

  return NextResponse.json({
    previewUrl,
    token: preview.token,
    expiresAt: preview.expiresAt?.toISOString()
  })
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const previews = await prisma.preview.findMany({
    where: { appId: id },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      token: true,
      createdAt: true,
      expiresAt: true
    }
  })

  return NextResponse.json({
    previews: previews.map((p) => ({
      id: p.id,
      token: p.token,
      url: `/preview/${p.token}`,
      createdAt: p.createdAt.toISOString(),
      expiresAt: p.expiresAt?.toISOString() ?? null
    }))
  })
}
