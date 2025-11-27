import Header from "@/components/header"
import StartProject from "@/components/start-project"
import Footer from "@/components/footer"

export const metadata = {
  title: "Start Your Project | Automatic",
  description: "Get started with your next project by answering a few questions and scheduling a call with our team.",
}

export default function StartPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <StartProject />
      <Footer />
    </main>
  )
}
