import { templates } from "@/data/templates"

const CONFIDENCE_THRESHOLD = 1

export function matchTemplate(prompt: string) {
  const lower = prompt.toLowerCase()

  let best = null
  let bestScore = 0
  let matchedKeywords: string[] = []

  for (const template of templates) {
    const hits: string[] = []

    for (const keyword of template.keywords) {
      if (lower.includes(keyword)) hits.push(keyword)
    }

    const score = hits.length

    if (score > bestScore) {
      best = template
      bestScore = score
      matchedKeywords = hits
    }
  }

  if (!best || bestScore < CONFIDENCE_THRESHOLD) {
    return null
  }

  return {
    template: best,
    confidence: bestScore,
    matchedKeywords
  }
}

export function getSuggestedPrompt(): string {
  return "Try: Build a CRM workspace with customer analytics"
}
