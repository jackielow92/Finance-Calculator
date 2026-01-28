import { Card } from '../common'
import { useHousingLoan } from '../../hooks'
import HousingLoanInputs from './HousingLoanInputs'
import CommitmentsSection from './CommitmentsSection'
import LoanResultCards from './LoanResultCards'
import UpfrontCostSection from './UpfrontCostSection'

function HousingLoanCalculator() {
  const {
    inputs,
    setInput,
    commitments,
    setCommitment,
    totalExistingCommitments,
    newPercentages,
    setNewPercentage,
    subsalePercentages,
    setSubsalePercentage,
    calculation,
    reset,
  } = useHousingLoan()

  return (
    <div className="space-y-6">
      {/* Property & Loan Details */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text-main flex items-center">
            <i className="fas fa-house-chimney mr-2 text-primary"></i>
            Property & Loan Details
          </h2>
          <button
            onClick={reset}
            className="neu-btn px-4 py-2 text-sm"
          >
            <i className="fas fa-rotate-right mr-2"></i>
            Reset
          </button>
        </div>
        <HousingLoanInputs inputs={inputs} onInputChange={setInput} />
      </Card>

      {/* Existing Commitments */}
      <CommitmentsSection
        commitments={commitments}
        onCommitmentChange={setCommitment}
        totalCommitments={totalExistingCommitments}
      />

      {/* Results */}
      <LoanResultCards calculation={calculation} />

      {/* Upfront Costs */}
      <UpfrontCostSection
        newCosts={calculation.upfrontCosts.new}
        subsaleCosts={calculation.upfrontCosts.subsale}
        newPercentages={newPercentages}
        subsalePercentages={subsalePercentages}
        onNewPercentageChange={setNewPercentage}
        onSubsalePercentageChange={setSubsalePercentage}
      />

      {/* Disclaimer */}
      <div className="text-center text-xs text-text-sec p-4">
        <i className="fas fa-info-circle mr-1"></i>
        This calculator provides estimates only. Actual loan approval depends on bank assessment.
        Consult a financial advisor for personalized advice.
      </div>
    </div>
  )
}

export default HousingLoanCalculator
