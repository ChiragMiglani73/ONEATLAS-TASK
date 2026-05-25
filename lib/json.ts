import { RuntimeSchema } from "@/types/app"

export function parseSchema(value: string): RuntimeSchema {
  return JSON.parse(value) as RuntimeSchema
}

export function stringifySchema(schema: RuntimeSchema): string {
  return JSON.stringify(schema)
}

export function parseSnapshot(value: string) {
  return JSON.parse(value) as {
    name: string
    version: number
    templateId?: string
    schema: RuntimeSchema
  }
}
