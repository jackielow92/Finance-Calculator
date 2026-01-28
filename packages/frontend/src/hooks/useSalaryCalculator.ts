import { useState, useMemo, useCallback } from 'react'
import { SalaryInputs, SalaryCalculation, PcbCategory } from '../types'
import { calculateSalaryBreakdown, DEFAULT_SALARY_INPUTS } from '../utils/calculations'
import { usePcbTable } from './usePcbTable'

interface UseSalaryCalculatorReturn {
  inputs: SalaryInputs
  setInput: <K extends keyof SalaryInputs>(key: K, value: SalaryInputs[K]) => void
  setInputs: (inputs: Partial<SalaryInputs>) => void
  resetInputs: () => void
  calculation: SalaryCalculation
  isPcbLoading: boolean
  pcbError: string | null
}

export function useSalaryCalculator(
  initialInputs: SalaryInputs = DEFAULT_SALARY_INPUTS
): UseSalaryCalculatorReturn {
  const [inputs, setInputsState] = useState<SalaryInputs>(initialInputs)
  const { isLoading: isPcbLoading, error: pcbError, lookup: pcbLookup } = usePcbTable()

  const setInput = useCallback(
    <K extends keyof SalaryInputs>(key: K, value: SalaryInputs[K]) => {
      setInputsState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const setInputs = useCallback((newInputs: Partial<SalaryInputs>) => {
    setInputsState((prev) => ({ ...prev, ...newInputs }))
  }, [])

  const resetInputs = useCallback(() => {
    setInputsState(initialInputs)
  }, [initialInputs])

  const calculation = useMemo(() => {
    // Only use PCB lookup if it's loaded
    const lookup = isPcbLoading
      ? undefined
      : (net: number, category: PcbCategory) => pcbLookup(net, category)
    return calculateSalaryBreakdown(inputs, lookup)
  }, [inputs, isPcbLoading, pcbLookup])

  return {
    inputs,
    setInput,
    setInputs,
    resetInputs,
    calculation,
    isPcbLoading,
    pcbError,
  }
}
