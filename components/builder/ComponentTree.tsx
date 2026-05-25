import { RuntimeSchema } from "@/types/app"

const typeColors: Record<string, string> = {
  stats: "badge-teal",
  chart: "badge-pink",
  table: "badge-primary"
}

export default function ComponentTree({ schema }: { schema: RuntimeSchema }) {
  return (
    <div className="card p-5">
      <h3 className="font-semibold text-ink-head text-lg mb-4">Components</h3>
      <ul className="space-y-2">
        {schema.components.map((component) => (
          <li
            key={component.id}
            className="flex items-center justify-between gap-2 p-3 rounded-xl bg-surface-subtle border border-line-light hover:border-primary/30 transition"
          >
            <span className="text-sm font-medium text-ink-head truncate">
              {component.title}
            </span>
            <span className={`badge shrink-0 ${typeColors[component.type] || "badge-primary"}`}>
              {component.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
