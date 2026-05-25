import { parseSnapshot } from "@/lib/json"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  const preview = await prisma.preview.findUnique({ where: { token } })

  if (!preview) {
    return NextResponse.json({ error: "Preview not found" }, { status: 404 })
  }

  if (preview.expiresAt && preview.expiresAt < new Date()) {
    return NextResponse.json({ error: "Preview link has expired" }, { status: 410 })
  }

  return NextResponse.json({
    token: preview.token,
    snapshot: parseSnapshot(preview.snapshot),
    expiresAt: preview.expiresAt?.toISOString() ?? null
  })
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  await prisma.preview.delete({ where: { token } }).catch(() => null)

  return NextResponse.json({ revoked: true })
}
