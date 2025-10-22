"use client"

import { FlavorCard } from "@/components/flavor-card"
import { useEffect, useState } from "react"

export function FlipsResults() {
  const [flavors, setFlavors] = useState<{
    sabor: string
    justificacion: string
  }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageB64, setImageB64] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/n8n/results", { method: "GET" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        let data = await res.json()
        // Si la respuesta tiene data.resultados como string, parsear ese string
        let resultados: any[] = []
        if (data?.data?.resultados && typeof data.data.resultados === "string") {
          try {
            const parsed = JSON.parse(data.data.resultados)
            resultados = Array.isArray(parsed.resultados) ? parsed.resultados : []
            // Si la imagen viene dentro del JSON string, tomarla y loguearla
            if (typeof parsed?.imagen === "string" && parsed.imagen.length > 0) {
              setImageB64(parsed.imagen)
              console.log('Imagen n8n (data URL, parsed):', `data:image/png;base64,${parsed.imagen}`)
            }
          } catch {
            resultados = []
          }
        } else if (Array.isArray(data?.data?.resultados)) {
          resultados = data.data.resultados
        }
  setFlavors(resultados)
        // Capturar imagen base64 si viene en la respuesta
        if (typeof data?.data?.imagen === "string" && data.data.imagen.length > 0) {
          setImageB64(data.data.imagen)
          // Mostrar también la imagen (data URL) en consola
          console.log('Imagen n8n (data URL):', `data:image/png;base64,${data.data.imagen}`)
        }
  // Mostrar los tres sabores parseados en consola
  console.log('Sabores n8n:', resultados.slice(0, 3))
      } catch (err: any) {
        setError(err?.message ?? "Error desconocido")
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [])

  // Escucha resultados solicitados desde el botón "Consultar resultados"
  useEffect(() => {
    const handler = (e: CustomEvent<{ sabores?: any[]; imagen?: string }>) => {
      const sabores = Array.isArray(e.detail?.sabores) ? e.detail!.sabores : []
      setFlavors(sabores as any)
      setImageB64(e.detail?.imagen ?? null)
    }
    // @ts-expect-error Custom event type
    window.addEventListener('n8n:results', handler)
    return () => {
      // @ts-expect-error Custom event type
      window.removeEventListener('n8n:results', handler)
    }
  }, [])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12 text-lg text-muted-foreground">Cargando resultados…</div>
        ) : error ? (
          <div className="text-center py-12 text-destructive">{error}</div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Columna izquierda (1/3): Imagen */}
            <div className="flex justify-center lg:justify-start lg:col-span-5">
              {imageB64 ? (
                <img
                  src={`data:image/png;base64,${imageB64}`}
                  alt="Imagen generada - Flips"
                  className="w-full max-w-xl lg:max-w-none max-h-[720px] lg:max-h-[820px] object-contain rounded-xl"
                  loading="lazy"
                />
              ) : null}
            </div>

            {/* Columna derecha (2/3): Top 3 apilado */}
            <div className="lg:col-span-7 space-y-5">
              {flavors.slice(0, 3).map((flavor, idx) => (
                <FlavorCard
                  key={idx}
                  rank={idx + 1}
                  name={flavor.sabor}
                  explanation={flavor.justificacion}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
