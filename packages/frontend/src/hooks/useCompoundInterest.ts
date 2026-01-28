import { useState, useMemo, useCallback } from 'react'
import { CompoundInterestInputs, YearlyResult, CompoundInterestSummary } from '../types'
import {
  calculateCompoundInterest,
  getCompoundInterestSummary,
  DEFAULT_COMPOUND_INTEREST_INPUTS,
} from '../utils/calculations'

interface UseCompoundInterestReturn {
  inputs: CompoundInterestInputs
  setInput: <K extends keyof CompoundInterestInputs>(key: K, value: CompoundInterestInputs[K]) => void
  setInputs: (inputs: Partial<CompoundInterestInputs>) => void
  resetInputs: () => void
  results: YearlyResult[]
  summary: CompoundInterestSummary
}

export function useCompoundInterest(
  initialInputs: CompoundInterestInputs = DEFAULT_COMPOUND_INTEREST_INPUTS
): UseCompoundInterestReturn {
  const [inputs, setInputsState] = useState<CompoundInterestInputs>(initialInputs)

  const setInput = useCallback(
    <K extends keyof CompoundInterestInputs>(key: K, value: CompoundInterestInputs[K]) => {
      setInputsState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const setInputs = useCallback((newInputs: Partial<CompoundInterestInputs>) => {
    setInputsState((prev) => ({ ...prev, ...newInputs }))
  }, [])

  const resetInputs = useCallback(() => {
    setInputsState(initialInputs)
  }, [initialInputs])

  const results = useMemo(() => calculateCompoundInterest(inputs), [inputs])

  const summary = useMemo(() => getCompoundInterestSummary(results), [results])

  return {
    inputs,
    setInput,
    setInputs,
    resetInputs,
    results,
    summary,
  }
}
