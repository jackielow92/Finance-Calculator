import {
  DsrStatus,
  HousingLoanInputs,
  Commitments,
  UpfrontCosts,
  UpfrontCostPercentages,
  HousingLoanCalculation,
  DEFAULT_UPFRONT_PERCENTAGES,
} from '../../types'

/**
 * Calculate monthly mortgage payment using standard formula
 * P × [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  loanTenure: number
): number {
  if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
    return 0
  }

  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTenure * 12

  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  return isFinite(monthlyPayment) ? monthlyPayment : 0
}

/**
 * Calculate Debt Service Ratio (DSR) score
 */
export function calculateDsr(monthlyIncome: number, totalMonthlyCommitments: number): number {
  if (monthlyIncome <= 0) return 0
  return (totalMonthlyCommitments / monthlyIncome) * 100
}

/**
 * Get DSR status based on score
 */
export function getDsrStatus(dsrScore: number): DsrStatus {
  if (dsrScore <= 30) {
    return {
      status: 'Good',
      className: 'text-dsr-good',
      message: "You're financially ready!",
    }
  } else if (dsrScore <= 50) {
    return {
      status: 'Moderate',
      className: 'text-dsr-moderate',
      message: 'Manageable but be cautious',
    }
  } else if (dsrScore <= 70) {
    return {
      status: 'High',
      className: 'text-dsr-high',
      message: 'Consider reducing other commitments',
    }
  } else {
    return {
      status: 'Very High',
      className: 'text-dsr-danger',
      message: 'Financial risk - reconsider loan',
    }
  }
}

/**
 * Calculate total existing commitments
 */
export function calculateTotalCommitments(commitments: Commitments): number {
  return (
    commitments.carLoan +
    commitments.ptptn +
    commitments.creditCard +
    commitments.personalLoan +
    commitments.other
  )
}

/**
 * Calculate upfront costs for new property
 */
export function calculateNewPropertyCosts(
  propertyPrice: number,
  loanAmount: number,
  percentages: UpfrontCostPercentages
): UpfrontCosts {
  const downpayment = propertyPrice * (percentages.downpayment / 100)
  const spLegalFee = propertyPrice * (percentages.spLegalFee / 100)
  const stampDuty = propertyPrice * (percentages.stampDuty / 100)
  const loanLegalFee = loanAmount * (percentages.loanLegalFee / 100)
  const loanStampDuty = loanAmount * (percentages.loanStampDuty / 100)

  const total = downpayment + spLegalFee + stampDuty + loanLegalFee + loanStampDuty

  return {
    downpayment,
    spLegalFee,
    stampDuty,
    loanLegalFee,
    loanStampDuty,
    total,
  }
}

/**
 * Calculate upfront costs for subsale property
 */
export function calculateSubsalePropertyCosts(
  propertyPrice: number,
  loanAmount: number,
  percentages: UpfrontCostPercentages
): UpfrontCosts {
  const downpayment = propertyPrice * (percentages.downpayment / 100)
  const spLegalFee = propertyPrice * (percentages.spLegalFee / 100)
  const mot = propertyPrice * ((percentages.mot || 0) / 100)
  const loanLegalFee = loanAmount * (percentages.loanLegalFee / 100)
  const loanStampDuty = loanAmount * (percentages.loanStampDuty / 100)
  const valuationFee = propertyPrice * ((percentages.valuationFee || 0) / 100)

  const total = downpayment + spLegalFee + mot + loanLegalFee + loanStampDuty + valuationFee

  return {
    downpayment,
    spLegalFee,
    stampDuty: 0,
    loanLegalFee,
    loanStampDuty,
    mot,
    valuationFee,
    total,
  }
}

/**
 * Calculate complete housing loan breakdown
 */
export function calculateHousingLoan(
  inputs: HousingLoanInputs,
  commitments: Commitments,
  newPercentages: UpfrontCostPercentages = DEFAULT_UPFRONT_PERCENTAGES.new,
  subsalePercentages: UpfrontCostPercentages = DEFAULT_UPFRONT_PERCENTAGES.subsale
): HousingLoanCalculation {
  const { monthlyIncome, propertyPrice, loanTenure, interestRate, downpaymentPercent } = inputs

  // Calculate loan amount
  const downpaymentAmount = propertyPrice * (downpaymentPercent / 100)
  const loanAmount = propertyPrice - downpaymentAmount

  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTenure)

  // Calculate total commitments
  const existingCommitments = calculateTotalCommitments(commitments)
  const totalCommitments = existingCommitments + monthlyPayment

  // Calculate DSR
  const dsrScore = calculateDsr(monthlyIncome, totalCommitments)
  const dsrStatus = getDsrStatus(dsrScore)

  // Calculate upfront costs
  const newCosts = calculateNewPropertyCosts(propertyPrice, loanAmount, newPercentages)
  const subsaleCosts = calculateSubsalePropertyCosts(propertyPrice, loanAmount, subsalePercentages)

  return {
    loanAmount,
    monthlyPayment,
    totalCommitments,
    dsrScore,
    dsrStatus,
    upfrontCosts: {
      new: newCosts,
      subsale: subsaleCosts,
    },
  }
}

/**
 * Default housing loan inputs
 */
export const DEFAULT_HOUSING_LOAN_INPUTS: HousingLoanInputs = {
  monthlyIncome: 5000,
  propertyPrice: 300000,
  loanTenure: 30,
  interestRate: 4.5,
  downpaymentPercent: 10,
}

/**
 * Default commitments
 */
export const DEFAULT_COMMITMENTS: Commitments = {
  carLoan: 0,
  ptptn: 0,
  creditCard: 0,
  personalLoan: 0,
  other: 0,
}
