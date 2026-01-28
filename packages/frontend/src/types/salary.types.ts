import { DeductionResult } from './calculator.types'

export type PcbCategory =
  | 'B'
  | 'K2'
  | 'KA1_2'
  | 'KA2_2'
  | 'KA3_2'
  | 'KA4_2'
  | 'KA5_2'
  | 'KA6_2'
  | 'KA7_2'
  | 'KA8_2'
  | 'KA9_2'
  | 'KA10_2'
  | 'K3'
  | 'KA1_3'
  | 'KA2_3'
  | 'KA3_3'
  | 'KA4_3'
  | 'KA5_3'
  | 'KA6_3'
  | 'KA7_3'
  | 'KA8_3'
  | 'KA9_3'
  | 'KA10_3'

export interface SalaryInputs {
  basicSalary: number
  bonus: number
  pcbCategory: PcbCategory
}

export interface EpfTableRow {
  min: number
  max: number
  employer: number
  employee: number
  total: number
}

export interface SalaryCalculation {
  grossSalary: number
  epf: DeductionResult
  socso: DeductionResult
  eis: DeductionResult
  tax: number
  netSalary: number
  totals: {
    employer: number
    employee: number
    all: number
  }
}

export interface PcbTableEntry {
  min: number
  max: number
  values: Record<string, number>
}

export interface PcbTableData {
  entries: PcbTableEntry[]
}

export const PCB_CATEGORY_LABELS: Record<PcbCategory, string> = {
  B: 'Single (B)',
  K2: 'Married, spouse working (K2)',
  KA1_2: 'Married + 1 child, spouse working',
  KA2_2: 'Married + 2 children, spouse working',
  KA3_2: 'Married + 3 children, spouse working',
  KA4_2: 'Married + 4 children, spouse working',
  KA5_2: 'Married + 5 children, spouse working',
  KA6_2: 'Married + 6 children, spouse working',
  KA7_2: 'Married + 7 children, spouse working',
  KA8_2: 'Married + 8 children, spouse working',
  KA9_2: 'Married + 9 children, spouse working',
  KA10_2: 'Married + 10 children, spouse working',
  K3: 'Married, spouse not working (K3)',
  KA1_3: 'Married + 1 child, spouse not working',
  KA2_3: 'Married + 2 children, spouse not working',
  KA3_3: 'Married + 3 children, spouse not working',
  KA4_3: 'Married + 4 children, spouse not working',
  KA5_3: 'Married + 5 children, spouse not working',
  KA6_3: 'Married + 6 children, spouse not working',
  KA7_3: 'Married + 7 children, spouse not working',
  KA8_3: 'Married + 8 children, spouse not working',
  KA9_3: 'Married + 9 children, spouse not working',
  KA10_3: 'Married + 10 children, spouse not working',
}
