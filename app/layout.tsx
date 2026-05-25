import "./globals.css"

export const metadata = {
  title: "OneAtlas — Runtime App Platform",
  description: "AI-native operational apps from prompts"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
