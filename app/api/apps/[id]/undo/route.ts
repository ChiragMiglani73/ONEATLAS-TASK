import { formatAppResponse, undoAppMutation } from "@/lib/mutations"
import { NextResponse } from "next/server"

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const result = await undoAppMutation(id)

  if ("error" in result && result.status !== 200) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  return NextResponse.json({ app: formatAppResponse(result.app!) })
}
