import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

interface FlavorCardProps {
  rank: number
  name: string
  explanation: string
}

const rankIcons = {
  1: Trophy,
  2: Medal,
  3: Award,
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

export function FlavorCard({ rank, name, explanation }: FlavorCardProps) {
  const Icon = rankIcons[rank as keyof typeof rankIcons]
  const colorClass = rankColors[rank as keyof typeof rankColors]
  const bgColorClass = rankBgColors[rank as keyof typeof rankBgColors]

  return (
    <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2">
      <div className={`absolute top-0 right-0 ${bgColorClass} px-3 py-1 rounded-bl-lg`}>
        <Badge variant="secondary" className="bg-transparent border-0 text-xs font-semibold">
          Alta Probabilidad de Aceptación
        </Badge>
      </div>

      <CardHeader className="text-center pt-8 pb-4">
        <div className="flex flex-col items-center gap-3 mb-4">
          <Icon className={`w-16 h-16 ${colorClass}`} />
          <div className={`text-6xl font-bold ${colorClass}`}>#{rank}</div>
        </div>
        <h3 className="text-2xl font-bold text-foreground text-balance">{name}</h3>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed text-justify">{explanation}</p>
      </CardContent>
    </Card>
  )
}
