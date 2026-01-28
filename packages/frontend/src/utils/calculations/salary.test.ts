import { describe, it, expect } from 'vitest'
import { calculateEpf, calculateSocso, calculateEis, calculateSalaryBreakdown } from './salary'

describe('calculateEpf', () => {
  it('returns zero for zero wages', () => {
    const result = calculateEpf(0)
    expect(result.employer).toBe(0)
    expect(result.employee).toBe(0)
    expect(result.total).toBe(0)
  })

  it('returns correct EPF for salary in table range', () => {
    const result = calculateEpf(5000)
    expect(result.employer).toBe(650)
    expect(result.employee).toBe(550)
    expect(result.total).toBe(1200)
  })

  it('handles salary above table range', () => {
    const result = calculateEpf(25000)
    expect(result.employer).toBeGreaterThan(0)
    expect(result.employee).toBeGreaterThan(0)
  })
})

describe('calculateSocso', () => {
  it('returns correct SOCSO for salary <= RM3000', () => {
    const result = calculateSocso(3000)
    expect(result.employer).toBe(51.65)
    expect(result.employee).toBe(14.75)
  })

  it('returns correct SOCSO for salary > RM6000 (capped)', () => {
    const result = calculateSocso(10000)
    expect(result.employer).toBe(104.15)
    expect(result.employee).toBe(29.75)
  })
})

describe('calculateEis', () => {
  it('returns correct EIS for salary <= RM3000', () => {
    const result = calculateEis(3000)
    expect(result.employer).toBe(5.9)
    expect(result.employee).toBe(5.9)
  })

  it('returns correct EIS for salary > RM6000 (capped)', () => {
    const result = calculateEis(10000)
    expect(result.employer).toBe(11.9)
    expect(result.employee).toBe(11.9)
  })
})

describe('calculateSalaryBreakdown', () => {
  it('calculates complete salary breakdown', () => {
    const result = calculateSalaryBreakdown({
      basicSalary: 5000,
      bonus: 0,
      pcbCategory: 'B',
    })

    expect(result.grossSalary).toBe(5000)
    expect(result.epf.total).toBeGreaterThan(0)
    expect(result.socso.total).toBeGreaterThan(0)
    expect(result.eis.total).toBeGreaterThan(0)
    expect(result.netSalary).toBeLessThan(result.grossSalary)
  })

  it('includes bonus in calculations', () => {
    const withBonus = calculateSalaryBreakdown({
      basicSalary: 5000,
      bonus: 1000,
      pcbCategory: 'B',
    })

    const withoutBonus = calculateSalaryBreakdown({
      basicSalary: 5000,
      bonus: 0,
      pcbCategory: 'B',
    })

    expect(withBonus.grossSalary).toBe(6000)
    expect(withBonus.epf.total).toBeGreaterThan(withoutBonus.epf.total)
  })
})
