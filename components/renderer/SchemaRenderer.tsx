import ChartWidget from "@/components/renderer/ChartWidget"
import CRMTable from "@/components/renderer/CRMTable"
import StatsCard from "@/components/renderer/StatsCard"
import { RuntimeSchema } from "@/types/app"

export default function SchemaRenderer({ schema }: { schema: RuntimeSchema }) {
  const stats = schema.components.filter((c) => c.type === "stats")
  const charts = schema.components.filter((c) => c.type === "chart")
  const tables = schema.components.filter((c) => c.type === "table")

  return (
    <div className="space-y-6">
      {stats.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((c) => (
            <StatsCard key={c.id} component={c} />
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        {charts.map((c) => (
          <ChartWidget key={c.id} component={c} />
        ))}
        {tables.map((c) => (
          <CRMTable key={c.id} component={c} />
        ))}
      </div>
    </div>
  )
}
