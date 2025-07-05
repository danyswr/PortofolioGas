import { Navbar } from "@/components/navbar"
import { Home } from "@/components/home"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Home />
    </div>
  )
}
