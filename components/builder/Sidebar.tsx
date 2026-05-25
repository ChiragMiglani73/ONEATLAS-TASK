import { MutationRecord } from "@/types/app"

export default function Sidebar({ mutations = [] }: { mutations?: MutationRecord[] }) {
  return (
    <div className="card p-5">
      <h3 className="font-semibold text-ink-head text-lg mb-4">Edit History</h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {mutations.length === 0 ? (
          <p className="text-sm text-ink-muted">
            No edits yet. Use the conversation bar below to evolve the schema.
          </p>
        ) : (
          mutations.map((mutation) => (
            <div
              key={mutation.id}
              className="p-3 rounded-xl bg-surface-subtle border border-line-light"
            >
              <div className="text-sm font-medium text-ink-head">{mutation.result}</div>
              <div className="text-xs text-ink-muted mt-1 line-clamp-2">
                {mutation.instruction}
              </div>
              <div className="text-xs text-ink-muted mt-2">
                v{mutation.version} · {new Date(mutation.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
