"use client"

import Link from "next/link"

export default function Navbar() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white text-sm font-bold">
            O
          </div>
          <span className="font-bold text-lg text-ink-head">OneAtlas</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-ink-body">
          <button type="button" onClick={() => scrollTo("playground")} className="px-3 py-2 rounded-lg hover:bg-surface-subtle hover:text-primary transition">
            Product
          </button>
          <button type="button" onClick={() => scrollTo("templates")} className="px-3 py-2 rounded-lg hover:bg-surface-subtle hover:text-primary transition">
            Templates
          </button>
          <span className="px-3 py-2 text-ink-muted">Enterprise</span>
          <span className="px-3 py-2 text-ink-muted">Security</span>
          <span className="px-3 py-2 text-ink-muted">Pricing</span>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="hidden sm:block text-sm text-ink-body px-3 py-2 rounded-lg hover:bg-surface-subtle">
            Login
          </button>
          <button type="button" onClick={() => scrollTo("playground")} className="btn-primary px-5 py-2.5 text-sm">
            Start Building
          </button>
        </div>
      </div>
    </nav>
  )
}
