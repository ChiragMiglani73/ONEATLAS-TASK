export type RuntimeComponent = {
  id: string
  type: "stats" | "chart" | "table"
  title: string
  fields?: string[]
  metric?: string
  value?: string
  change?: string
}

export type RuntimeSchema = {
  layout: string
  components: RuntimeComponent[]
}

export type Template = {
  id: string
  name: string
  description: string
  category: string
  complexity: "Simple" | "Moderate" | "Advanced"
  version: number
  keywords: string[]
  schema: RuntimeSchema
}

export type MutationRecord = {
  id: string
  instruction: string
  result: string
  version: number
  createdAt: string
}

export type PreviewRecord = {
  id: string
  token: string
  createdAt: string
  expiresAt: string | null
}

export type AppRecord = {
  id: string
  name: string
  templateId: string
  schema: RuntimeSchema
  version: number
  mutations?: MutationRecord[]
  previews?: PreviewRecord[]
}

export type GenerateResponse = {
  appId: string
  schema: RuntimeSchema
  templateUsed: string
  templateId: string
  templateVersion: number
  generatedName: string
  confidence: number
  matchedKeywords: string[]
}

export type MutationError = {
  error: string
  suggestion?: string
}
