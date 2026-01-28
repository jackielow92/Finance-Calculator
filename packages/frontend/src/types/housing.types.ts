import { DsrStatus } from './calculator.types'

export interface HousingLoanInputs {
  monthlyIncome: number
  propertyPrice: number
  loanTenure: number
  interestRate: number
  downpaymentPercent: number
}

export interface Commitments {
  carLoan: number
  ptptn: number
  creditCard: number
  personalLoan: number
  other: number
}

export interface UpfrontCostPercentages {
  downpayment: number
  spLegalFee: number
  stampDuty: number
  loanLegalFee: number
  loanStampDuty: number
  mot?: number // Subsale only
  valuationFee?: number // Subsale only
}

export interface UpfrontCosts {
  downpayment: number
  spLegalFee: number
  stampDuty: number
  loanLegalFee: number
  loanStampDuty: number
  mot?: number
  valuationFee?: number
  total: number
}

export type PropertyType = 'new' | 'subsale'

export interface HousingLoanCalculation {
  loanAmount: number
  monthlyPayment: number
  totalCommitments: number
  dsrScore: number
  dsrStatus: DsrStatus
  upfrontCosts: {
    new: UpfrontCosts
    subsale: UpfrontCosts
  }
}

export const DEFAULT_UPFRONT_PERCENTAGES: Record<PropertyType, UpfrontCostPercentages> = {
  new: {
    downpayment: 10,
    spLegalFee: 1,
    stampDuty: 3,
    loanLegalFee: 0.5,
    loanStampDuty: 0.5,
  },
  subsale: {
    downpayment: 10,
    spLegalFee: 1,
    mot: 3,
    loanLegalFee: 0.5,
    loanStampDuty: 0.5,
    valuationFee: 0.25,
  },
}
