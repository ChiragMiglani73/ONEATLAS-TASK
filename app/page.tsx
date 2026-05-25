import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/marketing/Hero"
import PromptPlayground from "@/components/marketing/PromptPlayground"
import TemplatesSection from "@/components/marketing/TemplatesSection"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PromptPlayground />
      <TemplatesSection />
      <Footer />
    </main>
  )
}
