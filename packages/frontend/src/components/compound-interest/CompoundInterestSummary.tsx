import { SummaryCard } from '../common'
import { CompoundInterestSummary as Summary } from '../../types'
import { formatCurrency } from '../../utils'

interface CompoundInterestSummaryProps {
  summary: Summary
}

function CompoundInterestSummary({ summary }: CompoundInterestSummaryProps) {
  return (
    <div className="summary-grid">
      <SummaryCard
        label="Total Invested"
        value={formatCurrency(summary.totalInvested)}
        icon="fa-sack-dollar"
      />
      <SummaryCard
        label="Interest Earned"
        value={formatCurrency(summary.interestEarned)}
        icon="fa-coins"
      />
      <SummaryCard
        label="Total Amount"
        value={formatCurrency(summary.totalAmount)}
        icon="fa-chart-pie"
        variant="success"
        large
      />
    </div>
  )
}

export default CompoundInterestSummary
