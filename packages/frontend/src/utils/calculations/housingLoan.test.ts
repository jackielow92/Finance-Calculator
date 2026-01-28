import { describe, it, expect } from 'vitest'
import {
  calculateMonthlyPayment,
  calculateDsr,
  getDsrStatus,
  calculateTotalCommitments,
  calculateHousingLoan,
} from './housingLoan'

describe('calculateMonthlyPayment', () => {
  it('calculates standard housing loan correctly', () => {
    const payment = calculateMonthlyPayment(270000, 4.5, 30)
    expect(payment).toBeCloseTo(1368.36, 0)
  })

  it('returns 0 for invalid inputs', () => {
    expect(calculateMonthlyPayment(0, 4.5, 30)).toBe(0)
    expect(calculateMonthlyPayment(270000, 0, 30)).toBe(0)
    expect(calculateMonthlyPayment(270000, 4.5, 0)).toBe(0)
  })

  it('handles short tenure', () => {
    const payment = calculateMonthlyPayment(100000, 5, 5)
    expect(payment).toBeGreaterThan(0)
    expect(payment).toBeGreaterThan(100000 / (5 * 12)) // Higher than simple division
  })
})

describe('calculateDsr', () => {
  it('returns correct DSR percentage', () => {
    expect(calculateDsr(5000, 1500)).toBe(30)
    expect(calculateDsr(10000, 3500)).toBe(35)
  })

  it('handles zero income', () => {
    expect(calculateDsr(0, 1000)).toBe(0)
  })
})

describe('getDsrStatus', () => {
  it('returns Good for DSR <= 30', () => {
    expect(getDsrStatus(25).status).toBe('Good')
    expect(getDsrStatus(30).status).toBe('Good')
  })

  it('returns Moderate for DSR 31-50', () => {
    expect(getDsrStatus(35).status).toBe('Moderate')
    expect(getDsrStatus(50).status).toBe('Moderate')
  })

  it('returns High for DSR 51-70', () => {
    expect(getDsrStatus(55).status).toBe('High')
    expect(getDsrStatus(70).status).toBe('High')
  })

  it('returns Very High for DSR > 70', () => {
    expect(getDsrStatus(75).status).toBe('Very High')
    expect(getDsrStatus(90).status).toBe('Very High')
  })
})

describe('calculateTotalCommitments', () => {
  it('sums all commitments', () => {
    const total = calculateTotalCommitments({
      carLoan: 500,
      ptptn: 200,
      creditCard: 300,
      personalLoan: 400,
      other: 100,
    })
    expect(total).toBe(1500)
  })
})

describe('calculateHousingLoan', () => {
  it('calculates complete housing loan breakdown', () => {
    const result = calculateHousingLoan(
      {
        monthlyIncome: 5000,
        propertyPrice: 300000,
        loanTenure: 30,
        interestRate: 4.5,
        downpaymentPercent: 10,
      },
      {
        carLoan: 500,
        ptptn: 0,
        creditCard: 0,
        personalLoan: 0,
        other: 0,
      }
    )

    expect(result.loanAmount).toBe(270000)
    expect(result.monthlyPayment).toBeGreaterThan(0)
    expect(result.totalCommitments).toBe(result.monthlyPayment + 500)
    expect(result.dsrScore).toBeGreaterThan(0)
    expect(result.upfrontCosts.new.total).toBeGreaterThan(0)
    expect(result.upfrontCosts.subsale.total).toBeGreaterThan(0)
  })
})
