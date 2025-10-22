import Image from "next/image"
import { Paytone_One } from "next/font/google"

const display = Paytone_One({ subsets: ["latin"], weight: "400" })

export function FlipsHeader() {
  return (
    <header className="relative overflow-hidden bg-flips-purple py-14 sm:py-16 px-4 sm:px-6 lg:px-8 shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
      {/* Luces suaves para dar profundidad */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 -left-24 size-[360px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 size-[320px] rounded-full bg-black/10 blur-3xl" />
      </div>

  <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 text-center md:text-left">
        {/* Texto a la izquierda */}
        <div className="max-w-3xl">
          <h1 className={`${display.className} text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-3 text-balance leading-tight tracking-tight drop-shadow-md`}>
            Innovación Flips I+D: Descubre el Próximo Sabor
          </h1>
          <p className="text-lg sm:text-xl text-white/90 text-pretty drop-shadow">
            El Top 3 de Sabores V2, resultado de un proceso ágil basado en análisis de tendencias, preferencias
            sensoriales y social listening de consumidores venezolanos.
          </p>
        </div>

        {/* Logo a la derecha (sin recuadro y más grande) */}
        <div className="flex justify-center md:justify-center">
          <Image
            src="/flips_logo.png"
            alt="Logo Flips"
            width={256}
            height={256}
            className="w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] select-none"
            priority
          />
        </div>
      </div>

      {/* Sombra inferior sutil para separar del contenido */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-black/20 to-transparent" />
    </header>
  )
}
