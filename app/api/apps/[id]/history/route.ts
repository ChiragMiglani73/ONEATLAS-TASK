import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const mutations = await prisma.mutation.findMany({
    where: { appId: id },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      instruction: true,
      result: true,
      version: true,
      createdAt: true
    }
  })

  return NextResponse.json({ history: mutations })
}
