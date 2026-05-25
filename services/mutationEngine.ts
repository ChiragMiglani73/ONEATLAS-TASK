import { RuntimeSchema } from "@/types/app"

const SUGGESTIONS = [
  "Add a priority field to tasks",
  "Rename contact to client",
  "Remove the notes column",
  "Add revenue chart",
  "Add filters and move analytics to the top"
]

type MutationSuccess = { ok: true; schema: RuntimeSchema; result: string }
type MutationFailure = { ok: false; error: string; suggestion: string }

export function applyMutation(
  schema: RuntimeSchema,
  instruction: string
): MutationSuccess | MutationFailure {
  const lower = instruction.toLowerCase()
  const next = structuredClone(schema)

  if (lower.includes("add priority") || lower.includes("priority field")) {
    const table = next.components.find((c) => c.type === "table")
    if (table?.fields && !table.fields.includes("priority")) {
      table.fields.push("priority")
    }
    return { ok: true, schema: next, result: "Priority field added" }
  }

  if (lower.includes("rename contact") || lower.includes("rename client")) {
    next.components.forEach((c) => {
      if (c.fields) {
        c.fields = c.fields.map((f) => (f === "contact" ? "client" : f))
      }
    })
    return { ok: true, schema: next, result: "Contact renamed to client" }
  }

  if (lower.includes("remove notes") || lower.includes("notes column")) {
    next.components.forEach((c) => {
      if (c.fields) c.fields = c.fields.filter((f) => f !== "notes")
    })
    return { ok: true, schema: next, result: "Notes column removed" }
  }

  if (lower.includes("revenue chart") || lower.includes("add chart")) {
    if (!next.components.some((c) => c.type === "chart")) {
      next.components.push({
        id: `chart-${Date.now()}`,
        type: "chart",
        title: "Revenue Analytics"
      })
    }
    return { ok: true, schema: next, result: "Revenue chart added" }
  }

  if (
    lower.includes("move analytics") ||
    lower.includes("analytics to the top") ||
    lower.includes("add filter")
  ) {
    const chartIdx = next.components.findIndex((c) => c.type === "chart")
    if (chartIdx > 0) {
      const [chart] = next.components.splice(chartIdx, 1)
      const firstTable = next.components.findIndex((c) => c.type === "table")
      next.components.splice(firstTable >= 0 ? firstTable : 0, 0, chart)
    }
    return { ok: true, schema: next, result: "Analytics section moved to top" }
  }

  return {
    ok: false,
    error: "No matching mutation for that instruction",
    suggestion: SUGGESTIONS[0]
  }
}
