import Link from "next/link"

const productLinks = [
  { label: "Generate app", href: "#playground" },
  { label: "Templates", href: "#templates" },
  { label: "How it works", href: "#playground" }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white text-sm font-bold">
                O
              </div>
              <span className="font-bold text-lg text-ink-head">OneAtlas</span>
            </Link>
            <p className="text-sm text-ink-muted mt-4 max-w-sm leading-relaxed">
              AI-native runtime apps for internal tools and operational dashboards.
              Generate from prompts, evolve schemas conversationally, share frozen previews.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <span className="badge badge-primary">Next.js 15</span>
              <span className="badge badge-teal">Prisma</span>
              <span className="badge badge-pink">Track 3</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-body hover:text-primary transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-ink-body">Deploy: see DEPLOY.md</span>
              </li>
              <li>
                <span className="text-sm text-ink-body">Local DB: docker-compose.yml</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line-light flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-ink-muted">
          <p>© {year} OneAtlas.dev · Engineering trial — Runtime workflow</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span className="text-ink-body">Built with Neon + Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
