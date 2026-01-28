import { describe, it, expect } from 'vitest'
import { calculateCompoundInterest, getCompoundInterestSummary } from './compoundInterest'

describe('calculateCompoundInterest', () => {
  it('calculates correctly with initial amount only', () => {
    const results = calculateCompoundInterest({
      initialAmount: 10000,
      monthlyContribution: 0,
      annualTopup: 0,
      annualInterestRate: 7,
      years: 1,
    })

    expect(results).toHaveLength(1)
    expect(results[0].totalInvested).toBe(10000)
    expect(results[0].totalAmount).toBeCloseTo(10723.07, 0)
  })

  it('calculates correctly with monthly contributions', () => {
    const results = calculateCompoundInterest({
      initialAmount: 10000,
      monthlyContribution: 500,
      annualTopup: 0,
      annualInterestRate: 7,
      years: 10,
    })

    expect(results).toHaveLength(10)
    expect(results[9].totalInvested).toBe(10000 + 500 * 12 * 10)
    expect(results[9].totalAmount).toBeGreaterThan(results[9].totalInvested)
  })

  it('handles annual topup correctly', () => {
    const results = calculateCompoundInterest({
      initialAmount: 0,
      monthlyContribution: 500,
      annualTopup: 50,
      annualInterestRate: 0,
      years: 3,
    })

    expect(results[0].monthlyContribution).toBe(500)
    expect(results[1].monthlyContribution).toBe(550)
    expect(results[2].monthlyContribution).toBe(600)
  })

  it('handles zero interest rate', () => {
    const results = calculateCompoundInterest({
      initialAmount: 1000,
      monthlyContribution: 100,
      annualTopup: 0,
      annualInterestRate: 0,
      years: 2,
    })

    expect(results[1].totalInvested).toBe(1000 + 100 * 12 * 2)
    expect(results[1].totalAmount).toBe(results[1].totalInvested)
    expect(results[1].interestEarned).toBe(0)
  })
})

describe('getCompoundInterestSummary', () => {
  it('returns zeros for empty results', () => {
    const summary = getCompoundInterestSummary([])

    expect(summary.totalInvested).toBe(0)
    expect(summary.interestEarned).toBe(0)
    expect(summary.totalAmount).toBe(0)
  })

  it('returns final year data', () => {
    const results = calculateCompoundInterest({
      initialAmount: 10000,
      monthlyContribution: 500,
      annualTopup: 0,
      annualInterestRate: 7,
      years: 5,
    })

    const summary = getCompoundInterestSummary(results)

    expect(summary.totalInvested).toBe(results[4].totalInvested)
    expect(summary.interestEarned).toBe(results[4].interestEarned)
    expect(summary.totalAmount).toBe(results[4].totalAmount)
  })
})
