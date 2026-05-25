import { RuntimeComponent } from "@/types/app"

export default function StatsCard({ component }: { component: RuntimeComponent }) {
  const positive = component.change?.startsWith("+")

  return (
    <div className="card p-6 hover:shadow-hover">
      <div className="text-sm text-ink-muted">{component.metric || component.title}</div>
      <div className="text-4xl font-bold text-ink-head mt-2">{component.value}</div>
      {component.change && (
        <div
          className={`text-sm font-medium mt-2 ${positive ? "text-accent-teal" : "text-accent-pink"}`}
        >
          {component.change}
        </div>
      )}
    </div>
  )
}
