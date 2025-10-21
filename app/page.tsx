import { FlipsHeader } from "@/components/flips-header"
import { FlipsResults } from "@/components/flips-results"
import { FlipsFooter } from "@/components/flips-footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <FlipsHeader />
      <main className="flex-1">
        <FlipsResults />
      </main>
      <FlipsFooter />
    </div>
  )
}
