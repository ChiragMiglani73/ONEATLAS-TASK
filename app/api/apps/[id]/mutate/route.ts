import { formatAppResponse, applyAppMutation } from "@/lib/mutations"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const instruction = body.instruction?.trim()

  if (!instruction) {
    return NextResponse.json({ error: "Instruction is required" }, { status: 400 })
  }

  const result = await applyAppMutation(id, instruction)

  if ("error" in result && result.status !== 200) {
    return NextResponse.json(
      { error: result.error, suggestion: result.suggestion },
      { status: result.status }
    )
  }

  return NextResponse.json({
    app: formatAppResponse(result.app!),
    mutation: result.mutation
  })
}
