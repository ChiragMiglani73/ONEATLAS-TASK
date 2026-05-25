import { RuntimeComponent } from "@/types/app"

const bars = [24, 40, 32, 48, 36, 44, 28]

export default function ChartWidget({ component }: { component: RuntimeComponent }) {
  return (
    <div className="card p-6 min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-ink-head">{component.title}</h3>
        <span className="text-sm text-ink-muted">Monthly</span>
      </div>
      <div className="h-48 flex items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-accent-cyan"
            style={{ height: `${h * 2}%` }}
          />
        ))}
      </div>
    </div>
  )
}
