// Compound Interest Types
export interface CompoundInterestInputs {
  initialAmount: number
  monthlyContribution: number
  annualTopup: number
  annualInterestRate: number
  years: number
}

export interface YearlyResult {
  year: number
  monthlyContribution: number
  totalContribution: number
  interestEarned: number
  totalInvested: number
  totalAmount: number
}

export interface CompoundInterestSummary {
  totalInvested: number
  interestEarned: number
  totalAmount: number
}

// Deduction Types
export interface DeductionResult {
  employer: number
  employee: number
  total: number
}

// DSR Types
export type DsrStatusLevel = 'Good' | 'Moderate' | 'High' | 'Very High'

export interface DsrStatus {
  status: DsrStatusLevel
  className: string
  message: string
}

// Tab Types
export interface Tab {
  id: string
  label: string
  icon: string
}
