import { CompoundInterestInputs, YearlyResult, CompoundInterestSummary } from '../../types'

/**
 * Calculate compound interest with monthly contributions and annual top-ups
 */
export function calculateCompoundInterest(inputs: CompoundInterestInputs): YearlyResult[] {
  const {
    initialAmount,
    monthlyContribution,
    annualTopup,
    annualInterestRate,
    years,
  } = inputs

  const results: YearlyResult[] = []
  let balance = initialAmount
  const monthlyRate = annualInterestRate / 100 / 12
  let totalContributedSoFar = initialAmount

  for (let year = 1; year <= years; year++) {
    // Monthly contribution increases by Annual Topup each year
    const monthlyContributionThisYear = monthlyContribution + annualTopup * (year - 1)
    const totalContributionThisYear = monthlyContributionThisYear * 12

    // Add monthly contributions throughout the year and apply monthly interest
    for (let month = 1; month <= 12; month++) {
      balance += monthlyContributionThisYear
      totalContributedSoFar += monthlyContributionThisYear
      balance *= 1 + monthlyRate
    }

    const interestEarned = balance - totalContributedSoFar
    const totalAmount = balance

    results.push({
      year,
      monthlyContribution: monthlyContributionThisYear,
      totalContribution: totalContributionThisYear,
      interestEarned,
      totalInvested: totalContributedSoFar,
      totalAmount,
    })
  }

  return results
}

/**
 * Get summary from compound interest results
 */
export function getCompoundInterestSummary(results: YearlyResult[]): CompoundInterestSummary {
  if (results.length === 0) {
    return {
      totalInvested: 0,
      interestEarned: 0,
      totalAmount: 0,
    }
  }

  const finalData = results[results.length - 1]
  return {
    totalInvested: finalData.totalInvested,
    interestEarned: finalData.interestEarned,
    totalAmount: finalData.totalAmount,
  }
}

/**
 * Default inputs for compound interest calculator
 */
export const DEFAULT_COMPOUND_INTEREST_INPUTS: CompoundInterestInputs = {
  initialAmount: 10000,
  monthlyContribution: 500,
  annualTopup: 0,
  annualInterestRate: 7,
  years: 30,
}
