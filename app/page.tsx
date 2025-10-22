import { FlipsHeader } from "@/components/flips-header"
import { FlipsResults } from "@/components/flips-results"
import { FlipsFooter } from "@/components/flips-footer"
import { N8nControls } from "@/components/n8n-controls"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <FlipsHeader />
      <main className="flex-1">
        <N8nControls />
        <FlipsResults />
      </main>
      <FlipsFooter />
    </div>
  )
}
