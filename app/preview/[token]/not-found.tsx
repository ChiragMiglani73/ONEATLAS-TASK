import Link from "next/link"

export default function PreviewNotFound() {
  return (
    <main className="min-h-screen bg-surface-page flex items-center justify-center px-6">
      <div className="card p-10 max-w-md text-center">
        <h1 className="text-2xl font-bold text-ink-head">Preview not found</h1>
        <p className="text-ink-muted mt-3">
          This preview link is invalid or has expired.
        </p>
        <Link href="/" className="btn-primary inline-block mt-6 px-6 py-3 text-sm">
          Back to home
        </Link>
      </div>
    </main>
  )
}
