import { FlavorCard } from "@/components/flavor-card"
import { Button } from "@/components/ui/button"

// Mock data - in production this would come from the n8n API
const mockFlavors = [
  {
    rank: 1,
    name: "Flips Chocolate y Avellana",
    explanation:
      "Este sabor combina la riqueza del chocolate con el toque crujiente de la avellana, creando una experiencia sensorial única. Basado en el análisis de tendencias globales y preferencias locales, este sabor responde a la creciente demanda de combinaciones dulces y sofisticadas en snacks salados. El social listening reveló un alto interés en sabores que evocan postres premium, posicionando esta propuesta como la favorita entre consumidores de 18-35 años.",
  },
  {
    rank: 2,
    name: "Flips Limón y Pimienta",
    explanation:
      "Una fusión audaz que equilibra la frescura cítrica del limón con el toque picante de la pimienta negra. Esta combinación responde a la tendencia de sabores contrastantes y experiencias gustativas complejas. Los datos de social listening muestran un creciente interés en sabores refrescantes con un toque de especias, especialmente entre consumidores que buscan alternativas innovadoras a los sabores tradicionales.",
  },
  {
    rank: 3,
    name: "Flips Queso Parmesano y Trufa",
    explanation:
      "Un sabor gourmet que eleva la experiencia de snacking con la combinación de queso parmesano añejo y el aroma distintivo de la trufa. Esta propuesta capitaliza la tendencia de premiumización en el mercado de snacks, atrayendo a consumidores que buscan experiencias culinarias sofisticadas. El análisis sensorial indica una alta aceptación entre segmentos de mayor poder adquisitivo y consumidores foodie.",
  },
]

export function FlipsResults() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {mockFlavors.map((flavor) => (
            <FlavorCard key={flavor.rank} {...flavor} />
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            disabled
            className="bg-flips-blue hover:bg-flips-blue/90 text-white font-semibold px-8 py-6 text-lg"
          >
            Ver Fichas Técnicas
          </Button>
        </div>
      </div>
    </section>
  )
}
