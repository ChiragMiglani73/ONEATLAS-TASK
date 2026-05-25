import { RuntimeSchema } from "@/types/app"

export default function SchemaPreviewPanel({ schema }: { schema: RuntimeSchema }) {
  const tables = schema.components.filter((c) => c.type === "table")
  const stats = schema.components.filter((c) => c.type === "stats")
  const charts = schema.components.filter((c) => c.type === "chart")

  return (
    <aside className="card p-5 h-fit sticky top-24">
      <h3 className="font-semibold text-ink-head text-lg mb-4">Schema Preview</h3>
      <p className="text-sm text-ink-muted mb-4">
        Human-readable runtime schema — not raw JSON.
      </p>

      <div className="space-y-4 text-sm">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-2">
            Layout
          </div>
          <span className="badge badge-primary capitalize">{schema.layout}</span>
        </div>

        {stats.length > 0 && (
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-2">
              Metrics ({stats.length})
            </div>
            <ul className="space-y-1">
              {stats.map((c) => (
                <li key={c.id} className="text-ink-body">
                  {c.title} · {c.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {charts.length > 0 && (
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-2">
              Charts ({charts.length})
            </div>
            <ul className="space-y-1">
              {charts.map((c) => (
                <li key={c.id} className="text-ink-body">
                  {c.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tables.length > 0 && (
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-2">
              Data models
            </div>
            {tables.map((c) => (
              <div key={c.id} className="mb-3 p-3 rounded-xl bg-surface-subtle border border-line-light">
                <div className="font-medium text-ink-head mb-1">{c.title}</div>
                <div className="flex flex-wrap gap-1">
                  {c.fields?.map((field) => (
                    <span
                      key={field}
                      className="text-xs px-2 py-0.5 rounded-md bg-white border border-line text-ink-muted"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
