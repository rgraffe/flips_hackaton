'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function N8nControls() {
  const [loadingTrigger, setLoadingTrigger] = useState(false)
  const [loadingQuery, setLoadingQuery] = useState(false)
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  const triggerFlow = async () => {
    setLoadingTrigger(true)
    setLastMessage(null)
    try {
      const res = await fetch('/api/n8n/trigger', { method: 'GET' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setLastMessage(data?.message ?? 'Flujo n8n activado')
    } catch (err: any) {
      setLastMessage(`Error al activar el flujo: ${err?.message ?? 'desconocido'}`)
    } finally {
      setLoadingTrigger(false)
    }
  }

  const queryResults = async () => {
    setLoadingQuery(true)
    setLastMessage(null)
    try {
      const res = await fetch('/api/n8n/results', { method: 'GET' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      // Parsear resultados e imagen para loguearlos siempre al hacer clic
      let sabores: any[] = []
      let imagen: string | null = null

      if (data?.data?.resultados && typeof data.data.resultados === 'string') {
        try {
          const parsed = JSON.parse(data.data.resultados)
          sabores = Array.isArray(parsed.resultados) ? parsed.resultados : []
          if (typeof parsed?.imagen === 'string' && parsed.imagen.length > 0) {
            imagen = parsed.imagen
          }
        } catch {
          sabores = []
        }
      } else if (Array.isArray(data?.data?.resultados)) {
        sabores = data.data.resultados
      }
      if (!imagen && typeof data?.data?.imagen === 'string') {
        imagen = data.data.imagen
      }

      // Logs claros en cada clic
      // eslint-disable-next-line no-console
      console.log('Sabores n8n (click):', sabores.slice(0, 3))
      if (imagen) {
        // eslint-disable-next-line no-console
        console.log('Imagen n8n (data URL, click):', `data:image/png;base64,${imagen}`)
      }

      // Notificar a otros componentes (p.ej., FlipsResults) para que actualicen UI
      window.dispatchEvent(
        new CustomEvent('n8n:results', { detail: { sabores, imagen } })
      )

      setLastMessage(data?.message ?? 'Consulta realizada. Revisa la consola para ver los datos.')
    } catch (err: any) {
      setLastMessage(`Error al consultar resultados: ${err?.message ?? 'desconocido'}`)
    } finally {
      setLoadingQuery(false)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-white/80 backdrop-blur rounded-xl shadow-sm border p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Integración n8n</h2>
          <p className="text-sm text-muted-foreground">
            Usa estos botones para activar el flujo y consultar los resultados.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={triggerFlow}
            disabled={loadingTrigger}
            className="bg-flips-purple text-white hover:bg-flips-purple/90 focus-visible:ring-flips-purple/30"
          >
            {loadingTrigger ? 'Activando…' : 'Activar flujo'}
          </Button>
          <Button variant="secondary" onClick={queryResults} disabled={loadingQuery}>
            {loadingQuery ? 'Consultando…' : 'Consultar resultados'}
          </Button>
        </div>
      </div>
      {lastMessage && (
        <p className="mt-3 text-sm text-muted-foreground">{lastMessage}</p>
      )}
    </section>
  )
}
