import { DeductionResult, SalaryInputs, SalaryCalculation, PcbCategory, EpfTableRow } from '../../types'
import { interpolate } from '../formatters'

// EPF Table based on Jadual Ketiga
export const EPF_TABLE: EpfTableRow[] = [
  { min: 10.01, max: 20.0, employer: 3.0, employee: 3.0, total: 6.0 },
  { min: 20.01, max: 40.0, employer: 6.0, employee: 5.0, total: 11.0 },
  { min: 40.01, max: 60.0, employer: 8.0, employee: 7.0, total: 15.0 },
  { min: 60.01, max: 80.0, employer: 11.0, employee: 9.0, total: 20.0 },
  { min: 80.01, max: 100.0, employer: 13.0, employee: 11.0, total: 24.0 },
  { min: 100.01, max: 120.0, employer: 16.0, employee: 14.0, total: 30.0 },
  { min: 120.01, max: 140.0, employer: 19.0, employee: 16.0, total: 35.0 },
  { min: 140.01, max: 160.0, employer: 21.0, employee: 18.0, total: 39.0 },
  { min: 160.01, max: 180.0, employer: 24.0, employee: 20.0, total: 44.0 },
  { min: 180.01, max: 200.0, employer: 26.0, employee: 22.0, total: 48.0 },
  { min: 200.01, max: 220.0, employer: 29.0, employee: 25.0, total: 54.0 },
  { min: 220.01, max: 240.0, employer: 32.0, employee: 27.0, total: 59.0 },
  { min: 240.01, max: 260.0, employer: 34.0, employee: 29.0, total: 63.0 },
  { min: 260.01, max: 280.0, employer: 37.0, employee: 31.0, total: 68.0 },
  { min: 280.01, max: 300.0, employer: 39.0, employee: 33.0, total: 72.0 },
  { min: 300.01, max: 320.0, employer: 42.0, employee: 36.0, total: 78.0 },
  { min: 320.01, max: 340.0, employer: 45.0, employee: 38.0, total: 83.0 },
  { min: 340.01, max: 360.0, employer: 47.0, employee: 40.0, total: 87.0 },
  { min: 360.01, max: 380.0, employer: 50.0, employee: 42.0, total: 92.0 },
  { min: 380.01, max: 400.0, employer: 52.0, employee: 44.0, total: 96.0 },
  { min: 400.01, max: 420.0, employer: 55.0, employee: 47.0, total: 102.0 },
  { min: 420.01, max: 440.0, employer: 58.0, employee: 49.0, total: 107.0 },
  { min: 440.01, max: 460.0, employer: 60.0, employee: 51.0, total: 111.0 },
  { min: 460.01, max: 480.0, employer: 63.0, employee: 53.0, total: 116.0 },
  { min: 480.01, max: 500.0, employer: 65.0, employee: 55.0, total: 120.0 },
  { min: 500.01, max: 520.0, employer: 68.0, employee: 58.0, total: 126.0 },
  { min: 520.01, max: 540.0, employer: 71.0, employee: 60.0, total: 131.0 },
  { min: 540.01, max: 560.0, employer: 73.0, employee: 62.0, total: 135.0 },
  { min: 560.01, max: 580.0, employer: 76.0, employee: 64.0, total: 140.0 },
  { min: 580.01, max: 600.0, employer: 78.0, employee: 66.0, total: 144.0 },
  { min: 600.01, max: 620.0, employer: 81.0, employee: 69.0, total: 150.0 },
  { min: 620.01, max: 640.0, employer: 84.0, employee: 71.0, total: 155.0 },
  { min: 640.01, max: 660.0, employer: 86.0, employee: 73.0, total: 159.0 },
  { min: 660.01, max: 680.0, employer: 89.0, employee: 75.0, total: 164.0 },
  { min: 680.01, max: 700.0, employer: 91.0, employee: 77.0, total: 168.0 },
  { min: 700.01, max: 720.0, employer: 94.0, employee: 80.0, total: 174.0 },
  { min: 720.01, max: 740.0, employer: 97.0, employee: 82.0, total: 179.0 },
  { min: 740.01, max: 760.0, employer: 99.0, employee: 84.0, total: 183.0 },
  { min: 760.01, max: 780.0, employer: 102.0, employee: 86.0, total: 188.0 },
  { min: 780.01, max: 800.0, employer: 104.0, employee: 88.0, total: 192.0 },
  { min: 800.01, max: 820.0, employer: 107.0, employee: 91.0, total: 198.0 },
  { min: 820.01, max: 840.0, employer: 110.0, employee: 93.0, total: 203.0 },
  { min: 840.01, max: 860.0, employer: 112.0, employee: 95.0, total: 207.0 },
  { min: 860.01, max: 880.0, employer: 115.0, employee: 97.0, total: 212.0 },
  { min: 880.01, max: 900.0, employer: 117.0, employee: 99.0, total: 216.0 },
  { min: 900.01, max: 920.0, employer: 120.0, employee: 102.0, total: 222.0 },
  { min: 920.01, max: 940.0, employer: 123.0, employee: 104.0, total: 227.0 },
  { min: 940.01, max: 960.0, employer: 125.0, employee: 106.0, total: 231.0 },
  { min: 960.01, max: 980.0, employer: 128.0, employee: 108.0, total: 236.0 },
  { min: 980.01, max: 1000.0, employer: 130.0, employee: 110.0, total: 240.0 },
  { min: 1000.01, max: 1500.0, employer: 195.0, employee: 165.0, total: 360.0 },
  { min: 1500.01, max: 2000.0, employer: 260.0, employee: 220.0, total: 480.0 },
  { min: 2000.01, max: 2500.0, employer: 325.0, employee: 275.0, total: 600.0 },
  { min: 2500.01, max: 3000.0, employer: 390.0, employee: 330.0, total: 720.0 },
  { min: 3000.01, max: 3500.0, employer: 455.0, employee: 385.0, total: 840.0 },
  { min: 3500.01, max: 4000.0, employer: 520.0, employee: 440.0, total: 960.0 },
  { min: 4000.01, max: 4500.0, employer: 585.0, employee: 495.0, total: 1080.0 },
  { min: 4500.01, max: 5000.0, employer: 650.0, employee: 550.0, total: 1200.0 },
  { min: 5000.01, max: 5500.0, employer: 660.0, employee: 605.0, total: 1265.0 },
  { min: 5500.01, max: 6000.0, employer: 720.0, employee: 660.0, total: 1380.0 },
  { min: 6000.01, max: 6500.0, employer: 780.0, employee: 715.0, total: 1495.0 },
  { min: 6500.01, max: 7000.0, employer: 840.0, employee: 770.0, total: 1610.0 },
  { min: 7000.01, max: 7500.0, employer: 900.0, employee: 825.0, total: 1725.0 },
  { min: 7500.01, max: 8000.0, employer: 960.0, employee: 880.0, total: 1840.0 },
  { min: 8000.01, max: 8500.0, employer: 1020.0, employee: 935.0, total: 1955.0 },
  { min: 8500.01, max: 9000.0, employer: 1080.0, employee: 990.0, total: 2070.0 },
  { min: 9000.01, max: 9500.0, employer: 1140.0, employee: 1045.0, total: 2185.0 },
  { min: 9500.01, max: 10000.0, employer: 1200.0, employee: 1100.0, total: 2300.0 },
  { min: 10000.01, max: 11000.0, employer: 1320.0, employee: 1210.0, total: 2530.0 },
  { min: 11000.01, max: 12000.0, employer: 1440.0, employee: 1320.0, total: 2760.0 },
  { min: 12000.01, max: 13000.0, employer: 1560.0, employee: 1430.0, total: 2990.0 },
  { min: 13000.01, max: 14000.0, employer: 1680.0, employee: 1540.0, total: 3220.0 },
  { min: 14000.01, max: 15000.0, employer: 1800.0, employee: 1650.0, total: 3450.0 },
  { min: 15000.01, max: 16000.0, employer: 1920.0, employee: 1760.0, total: 3680.0 },
  { min: 16000.01, max: 17000.0, employer: 2040.0, employee: 1870.0, total: 3910.0 },
  { min: 17000.01, max: 18000.0, employer: 2160.0, employee: 1980.0, total: 4140.0 },
  { min: 18000.01, max: 19000.0, employer: 2280.0, employee: 2090.0, total: 4370.0 },
  { min: 19000.01, max: 20000.0, employer: 2400.0, employee: 2200.0, total: 4600.0 },
]

// SOCSO bands
const SOCSO_BANDS = [
  { upTo: 3000, employer: 51.65, employee: 14.75 },
  { upTo: 4000, employer: 69.15, employee: 19.75 },
  { upTo: 5000, employer: 86.65, employee: 24.75 },
  { upTo: 6000, employer: 104.15, employee: 29.75 },
  { upTo: Infinity, employer: 104.15, employee: 29.75 },
]

// EIS bands
const EIS_BANDS = [
  { upTo: 3000, employer: 5.9, employee: 5.9 },
  { upTo: 4000, employer: 7.9, employee: 7.9 },
  { upTo: 5000, employer: 9.9, employee: 9.9 },
  { upTo: 6000, employer: 11.9, employee: 11.9 },
  { upTo: Infinity, employer: 11.9, employee: 11.9 },
]

// PCB approximation points for salaries above RM60k
const PCB_POINTS = [
  { salary: 3000, pcb: 0.0 },
  { salary: 4000, pcb: 16.7 },
  { salary: 5000, pcb: 110.0 },
  { salary: 10000, pcb: 929.2 },
  { salary: 11000, pcb: 1179.2 },
  { salary: 12000, pcb: 1429.2 },
  { salary: 13000, pcb: 1679.2 },
  { salary: 14000, pcb: 1929.2 },
]

/**
 * Lookup EPF from table using binary search
 */
export function lookupEpfFromTable(wages: number): DeductionResult {
  if (!isFinite(wages) || wages <= 0) {
    return { employer: 0, employee: 0, total: 0 }
  }

  // Binary search by band max
  let lo = 0
  let hi = EPF_TABLE.length - 1
  let ans = -1

  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (wages <= EPF_TABLE[mid].max) {
      ans = mid
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }

  if (ans === -1) {
    // Above last band: use last row
    const last = EPF_TABLE[EPF_TABLE.length - 1]
    return { employer: last.employer, employee: last.employee, total: last.total }
  }

  const row = EPF_TABLE[ans]
  if (wages < row.min) {
    const prev = ans > 0 ? EPF_TABLE[ans - 1] : row
    return { employer: prev.employer, employee: prev.employee, total: prev.total }
  }

  return { employer: row.employer, employee: row.employee, total: row.total }
}

/**
 * Calculate EPF contributions
 */
export function calculateEpf(wages: number): DeductionResult {
  return lookupEpfFromTable(wages)
}

/**
 * Calculate SOCSO contributions
 */
export function calculateSocso(salary: number): DeductionResult {
  const s = Math.max(0, salary || 0)
  let chosen = SOCSO_BANDS[0]

  for (const b of SOCSO_BANDS) {
    if (s <= b.upTo) {
      chosen = b
      break
    }
  }

  const total = Math.round((chosen.employer + chosen.employee) * 100) / 100
  return {
    employer: chosen.employer,
    employee: chosen.employee,
    total,
  }
}

/**
 * Calculate EIS contributions
 */
export function calculateEis(salary: number): DeductionResult {
  const s = Math.max(0, salary || 0)
  let chosen = EIS_BANDS[0]

  for (const b of EIS_BANDS) {
    if (s <= b.upTo) {
      chosen = b
      break
    }
  }

  const total = Math.round((chosen.employer + chosen.employee) * 100) / 100
  return {
    employer: chosen.employer,
    employee: chosen.employee,
    total,
  }
}

/**
 * Auto PCB approximation for gross salary (fallback for >RM60k)
 */
export function autoPcbApproxFromGross(monthlySalary: number): number {
  const s = Math.max(0, monthlySalary || 0)

  if (s <= PCB_POINTS[0].salary) return PCB_POINTS[0].pcb

  for (let i = 0; i < PCB_POINTS.length - 1; i++) {
    const a = PCB_POINTS[i]
    const b = PCB_POINTS[i + 1]
    if (s <= b.salary) {
      const v = interpolate(s, a.salary, a.pcb, b.salary, b.pcb)
      return Math.round(v * 100) / 100
    }
  }

  // Above the last point: extend using last segment slope
  const n = PCB_POINTS.length
  const a = PCB_POINTS[n - 2]
  const b = PCB_POINTS[n - 1]
  const v = interpolate(s, a.salary, a.pcb, b.salary, b.pcb)
  return Math.round(v * 100) / 100
}

/**
 * Calculate complete salary breakdown
 */
export function calculateSalaryBreakdown(inputs: SalaryInputs, pcbLookup?: (net: number, category: PcbCategory) => number | null): SalaryCalculation {
  const { basicSalary, bonus, pcbCategory } = inputs
  const grossSalary = basicSalary + bonus

  const epf = calculateEpf(grossSalary)
  const socso = calculateSocso(grossSalary)
  const eis = calculateEis(grossSalary)

  // Calculate PCB tax
  const netRemuneration = grossSalary - epf.employee
  let tax = 0

  if (pcbLookup) {
    const tableVal = pcbLookup(netRemuneration, pcbCategory)
    tax = tableVal !== null ? tableVal : autoPcbApproxFromGross(grossSalary)
  } else {
    tax = autoPcbApproxFromGross(grossSalary)
  }

  const employeeDeductions = epf.employee + socso.employee + eis.employee + tax
  const employerContributions = epf.employer + socso.employer + eis.employer
  const netSalary = grossSalary - employeeDeductions

  return {
    grossSalary,
    epf,
    socso,
    eis,
    tax,
    netSalary,
    totals: {
      employer: employerContributions,
      employee: employeeDeductions,
      all: employerContributions + employeeDeductions,
    },
  }
}

/**
 * Default salary inputs
 */
export const DEFAULT_SALARY_INPUTS: SalaryInputs = {
  basicSalary: 5000,
  bonus: 0,
  pcbCategory: 'B',
}
