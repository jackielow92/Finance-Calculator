import { SummaryCard, Card } from '../common'
import { HousingLoanCalculation } from '../../types'
import { formatCurrency, formatPercent } from '../../utils'

interface LoanResultCardsProps {
  calculation: HousingLoanCalculation
}

function LoanResultCards({ calculation }: LoanResultCardsProps) {
  const { monthlyPayment, loanAmount, dsrScore, dsrStatus, totalCommitments } = calculation

  return (
    <div className="space-y-4">
      <div className="summary-grid">
        <SummaryCard
          label="Loan Amount"
          value={formatCurrency(loanAmount)}
          icon="fa-building-columns"
        />
        <SummaryCard
          label="Monthly Repayment"
          value={formatCurrency(monthlyPayment)}
          icon="fa-calendar-days"
          variant="warning"
        />
        <SummaryCard
          label="Total Monthly Commitments"
          value={formatCurrency(totalCommitments)}
          icon="fa-coins"
        />
      </div>

      {/* DSR Score Card */}
      <Card className="text-center">
        <h3 className="text-lg font-bold text-text-main mb-4">
          <i className="fas fa-gauge-high mr-2 text-primary"></i>
          Debt Service Ratio (DSR)
        </h3>
        <div className="flex flex-col items-center">
          <div
            className={`text-5xl font-extrabold mb-2 ${dsrStatus.className}`}
          >
            {formatPercent(dsrScore)}
          </div>
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
              dsrScore <= 30
                ? 'bg-dsr-good/20 text-dsr-good'
                : dsrScore <= 50
                ? 'bg-dsr-moderate/20 text-dsr-moderate'
                : dsrScore <= 70
                ? 'bg-dsr-high/20 text-dsr-high'
                : 'bg-dsr-danger/20 text-dsr-danger'
            }`}
          >
            {dsrStatus.status}
          </div>
          <p className="mt-2 text-text-sec">{dsrStatus.message}</p>
        </div>

        {/* DSR Explanation */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-dsr-good/10 rounded">
            <span className="font-bold text-dsr-good">≤30%</span>
            <br />Good
          </div>
          <div className="p-2 bg-dsr-moderate/10 rounded">
            <span className="font-bold text-dsr-moderate">31-50%</span>
            <br />Moderate
          </div>
          <div className="p-2 bg-dsr-high/10 rounded">
            <span className="font-bold text-dsr-high">51-70%</span>
            <br />High
          </div>
          <div className="p-2 bg-dsr-danger/10 rounded">
            <span className="font-bold text-dsr-danger">&gt;70%</span>
            <br />Very High
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LoanResultCards
