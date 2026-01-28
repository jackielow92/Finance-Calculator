import { useState, useMemo, useCallback } from 'react'
import {
  HousingLoanInputs,
  Commitments,
  HousingLoanCalculation,
  UpfrontCostPercentages,
  PropertyType,
  DEFAULT_UPFRONT_PERCENTAGES,
} from '../types'
import {
  calculateHousingLoan,
  calculateTotalCommitments,
  DEFAULT_HOUSING_LOAN_INPUTS,
  DEFAULT_COMMITMENTS,
} from '../utils/calculations'

interface UseHousingLoanReturn {
  inputs: HousingLoanInputs
  setInput: <K extends keyof HousingLoanInputs>(key: K, value: HousingLoanInputs[K]) => void
  setInputs: (inputs: Partial<HousingLoanInputs>) => void
  resetInputs: () => void
  commitments: Commitments
  setCommitment: <K extends keyof Commitments>(key: K, value: Commitments[K]) => void
  setCommitments: (commitments: Partial<Commitments>) => void
  totalExistingCommitments: number
  newPercentages: UpfrontCostPercentages
  setNewPercentage: <K extends keyof UpfrontCostPercentages>(
    key: K,
    value: UpfrontCostPercentages[K]
  ) => void
  subsalePercentages: UpfrontCostPercentages
  setSubsalePercentage: <K extends keyof UpfrontCostPercentages>(
    key: K,
    value: UpfrontCostPercentages[K]
  ) => void
  calculation: HousingLoanCalculation
  reset: () => void
}

export function useHousingLoan(
  initialInputs: HousingLoanInputs = DEFAULT_HOUSING_LOAN_INPUTS,
  initialCommitments: Commitments = DEFAULT_COMMITMENTS
): UseHousingLoanReturn {
  const [inputs, setInputsState] = useState<HousingLoanInputs>(initialInputs)
  const [commitments, setCommitmentsState] = useState<Commitments>(initialCommitments)
  const [newPercentages, setNewPercentagesState] = useState<UpfrontCostPercentages>(
    DEFAULT_UPFRONT_PERCENTAGES.new
  )
  const [subsalePercentages, setSubsalePercentagesState] = useState<UpfrontCostPercentages>(
    DEFAULT_UPFRONT_PERCENTAGES.subsale
  )

  const setInput = useCallback(
    <K extends keyof HousingLoanInputs>(key: K, value: HousingLoanInputs[K]) => {
      setInputsState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const setInputs = useCallback((newInputs: Partial<HousingLoanInputs>) => {
    setInputsState((prev) => ({ ...prev, ...newInputs }))
  }, [])

  const resetInputs = useCallback(() => {
    setInputsState(initialInputs)
  }, [initialInputs])

  const setCommitment = useCallback(
    <K extends keyof Commitments>(key: K, value: Commitments[K]) => {
      setCommitmentsState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const setCommitments = useCallback((newCommitments: Partial<Commitments>) => {
    setCommitmentsState((prev) => ({ ...prev, ...newCommitments }))
  }, [])

  const setNewPercentage = useCallback(
    <K extends keyof UpfrontCostPercentages>(key: K, value: UpfrontCostPercentages[K]) => {
      setNewPercentagesState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const setSubsalePercentage = useCallback(
    <K extends keyof UpfrontCostPercentages>(key: K, value: UpfrontCostPercentages[K]) => {
      setSubsalePercentagesState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const totalExistingCommitments = useMemo(
    () => calculateTotalCommitments(commitments),
    [commitments]
  )

  const calculation = useMemo(
    () => calculateHousingLoan(inputs, commitments, newPercentages, subsalePercentages),
    [inputs, commitments, newPercentages, subsalePercentages]
  )

  const reset = useCallback(() => {
    setInputsState(initialInputs)
    setCommitmentsState(initialCommitments)
    setNewPercentagesState(DEFAULT_UPFRONT_PERCENTAGES.new)
    setSubsalePercentagesState(DEFAULT_UPFRONT_PERCENTAGES.subsale)
  }, [initialInputs, initialCommitments])

  return {
    inputs,
    setInput,
    setInputs,
    resetInputs,
    commitments,
    setCommitment,
    setCommitments,
    totalExistingCommitments,
    newPercentages,
    setNewPercentage,
    subsalePercentages,
    setSubsalePercentage,
    calculation,
    reset,
  }
}
