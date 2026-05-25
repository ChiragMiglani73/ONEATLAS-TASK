"use client"

export default function Hero() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 badge badge-teal mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
          Runtime App Generation Platform
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink-head leading-tight tracking-tight">
          Generate operational apps
          <span className="text-gradient"> from prompts</span>
        </h1>

        <p className="text-ink-muted text-lg mt-6 max-w-2xl mx-auto">
          Build CRM workspaces, analytics dashboards, HR systems, and internal tooling with
          runtime schemas that evolve incrementally.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={() => scrollTo("playground")}
            className="btn-primary px-8 py-3.5 text-base"
          >
            Start Building
          </button>
          <button
            type="button"
            onClick={() => scrollTo("templates")}
            className="btn-secondary px-8 py-3.5 text-base"
          >
            Explore Templates
          </button>
        </div>
      </div>
    </section>
  )
}
