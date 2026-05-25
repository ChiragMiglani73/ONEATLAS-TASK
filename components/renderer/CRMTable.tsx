import { RuntimeComponent } from "@/types/app"

const sampleRows: Record<string, string>[] = [
  {
    name: "John Carter",
    email: "john@company.com",
    status: "Active",
    notes: "Enterprise plan",
    priority: "High",
    role: "Engineer",
    department: "Product",
    sku: "SKU-1042",
    quantity: "420"
  },
  {
    name: "Sarah Wilson",
    email: "sarah@company.com",
    status: "Pending",
    notes: "Follow up Q2",
    priority: "Medium",
    role: "Designer",
    department: "Design",
    sku: "SKU-2088",
    quantity: "88"
  }
]

export default function CRMTable({ component }: { component: RuntimeComponent }) {
  const fields = component.fields || ["name", "email", "status"]

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-ink-head mb-6">{component.title}</h3>
      <div className="space-y-3">
        {sampleRows.map((row) => (
          <div
            key={row.email}
            className="flex justify-between items-start gap-4 p-4 rounded-xl bg-surface-subtle border border-line-light"
          >
            <div className="flex-1 min-w-0">
              {fields.includes("name") && (
                <div className="font-medium text-ink-head">{row.name}</div>
              )}
              {fields.includes("email") && (
                <div className="text-sm text-ink-muted mt-0.5">{row.email}</div>
              )}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {fields
                  .filter((f) => !["name", "email", "status"].includes(f))
                  .map((field) => (
                    <span
                      key={field}
                      className="text-xs px-2 py-0.5 rounded-md bg-white border border-line text-ink-muted capitalize"
                    >
                      {field}: {row[field]}
                    </span>
                  ))}
              </div>
            </div>
            {fields.includes("status") && (
              <span className="badge badge-teal shrink-0">{row.status}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
