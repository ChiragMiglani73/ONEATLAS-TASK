import { formatAppResponse } from "@/lib/mutations"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const app = await prisma.app.findUnique({
    where: { id },
    include: {
      mutations: { orderBy: { createdAt: "desc" }, take: 20 },
      previews: { orderBy: { createdAt: "desc" }, take: 10 }
    }
  })

  if (!app) {
    return NextResponse.json({ error: "App not found" }, { status: 404 })
  }

  return NextResponse.json(formatAppResponse(app))
}
