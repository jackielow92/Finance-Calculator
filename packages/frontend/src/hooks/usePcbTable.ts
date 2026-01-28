import { useState, useEffect, useCallback } from 'react'
import { PcbCategory } from '../types'

interface PcbData {
  [key: string]: Float64Array
}

interface UsePcbTableReturn {
  isLoading: boolean
  error: string | null
  lookup: (netRemuneration: number, category: PcbCategory) => number | null
}

const PCB_BASE = 3141
const PCB_STEP = 5
const PCB_MAX = 60000

const PCB_COLUMNS = [
  'B',
  'K2',
  'KA1_2',
  'KA2_2',
  'KA3_2',
  'KA4_2',
  'KA5_2',
  'KA6_2',
  'KA7_2',
  'KA8_2',
  'KA9_2',
  'KA10_2',
  'K3',
  'KA1_3',
  'KA2_3',
  'KA3_3',
  'KA4_3',
  'KA5_3',
  'KA6_3',
  'KA7_3',
  'KA8_3',
  'KA9_3',
  'KA10_3',
]

let cachedData: PcbData | null = null

function parsePcbTable(text: string): PcbData {
  const lines = text.trim().split(/\n+/)
  const n = lines.length

  const data: PcbData = {}
  for (const col of PCB_COLUMNS) {
    data[col] = new Float64Array(n)
  }

  for (let i = 0; i < n; i++) {
    const parts = lines[i].trim().split(/\s+/)
    let k = 1 // skip "from-to"
    for (let c = 0; c < PCB_COLUMNS.length; c++, k++) {
      const t = parts[k]
      data[PCB_COLUMNS[c]][i] = t === '-' || t === undefined ? 0 : parseFloat(t)
    }
  }

  return data
}

export function usePcbTable(): UsePcbTableReturn {
  const [isLoading, setIsLoading] = useState(!cachedData)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PcbData | null>(cachedData)

  useEffect(() => {
    if (cachedData) {
      setData(cachedData)
      setIsLoading(false)
      return
    }

    let cancelled = false

    const loadData = async () => {
      try {
        // Dynamic import for code splitting
        const module = await import('../data/pcb-raw-data')

        if (cancelled) return

        const parsed = parsePcbTable(module.PCB_TABLE_TEXT)
        cachedData = parsed
        setData(parsed)
        setIsLoading(false)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load PCB table')
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [])

  const lookup = useCallback(
    (netRemuneration: number, category: PcbCategory): number | null => {
      const net = Math.floor(netRemuneration)

      if (net < PCB_BASE) return 0
      if (net > PCB_MAX) return null // Fallback to approximation

      if (!data) return null

      const idx = Math.floor((net - PCB_BASE) / PCB_STEP)
      const col = data[category] ? category : 'B'
      const val = data[col][idx] || 0

      return Math.round(val * 100) / 100
    },
    [data]
  )

  return { isLoading, error, lookup }
}
