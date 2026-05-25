import { parseSchema, stringifySchema } from "@/lib/json"
import { prisma } from "@/lib/prisma"
import { getSuggestedPrompt, matchTemplate } from "@/services/templateMatcher"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const prompt = body.prompt?.trim()

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
  }

  const match = matchTemplate(prompt)

  if (!match) {
    return NextResponse.json(
      {
        error: "No matching template found for this prompt",
        suggestion: getSuggestedPrompt()
      },
      { status: 404 }
    )
  }

  const app = await prisma.app.create({
    data: {
      name: match.template.name,
      templateId: match.template.id,
      schema: stringifySchema(match.template.schema)
    }
  })

  return NextResponse.json({
    appId: app.id,
    schema: parseSchema(app.schema),
    templateUsed: match.template.name,
    templateId: match.template.id,
    templateVersion: match.template.version,
    generatedName: app.name,
    confidence: match.confidence,
    matchedKeywords: match.matchedKeywords
  })
}
