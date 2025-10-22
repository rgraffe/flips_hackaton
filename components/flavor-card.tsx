import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

interface FlavorCardProps {
  rank: number
  name: string
  explanation: string
}

const rankColors = {
  1: "text-flips-red",
  2: "text-flips-purple",
  3: "text-flips-orange",
}

const rankBgColors = {
  1: "bg-flips-red/10",
  2: "bg-flips-purple/10",
  3: "bg-flips-orange/10",
}

const rankIcons = {
  1: Trophy,
  2: Medal,
  3: Award,
}

export function FlavorCard({ rank, name, explanation }: FlavorCardProps) {
  const colorClass = rankColors[rank as keyof typeof rankColors]
  const bgColorClass = rankBgColors[rank as keyof typeof rankBgColors]
  const Icon = rankIcons[rank as keyof typeof rankIcons]

  return (
    <Card className="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border py-3 gap-3">
      <CardHeader className="pt-2 pb-1">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${colorClass}`} />
          <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold ${colorClass} border-current`}>#{rank}</span>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground text-balance">{name}</h3>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
      </CardContent>
    </Card>
  )
}
