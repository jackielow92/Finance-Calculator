import { YearlyResult } from '../../types'
import { formatCurrency } from '../../utils'

interface CompoundInterestTableProps {
  results: YearlyResult[]
}

function CompoundInterestTable({ results }: CompoundInterestTableProps) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Monthly Contribution</th>
            <th>Total Contribution</th>
            <th>Interest Earned</th>
            <th>Total Invested</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.year}>
              <td className="font-bold">{row.year}</td>
              <td>{formatCurrency(row.monthlyContribution)}</td>
              <td>{formatCurrency(row.totalContribution)}</td>
              <td className="text-primary">{formatCurrency(row.interestEarned)}</td>
              <td>{formatCurrency(row.totalInvested)}</td>
              <td className="font-bold text-dsr-good">{formatCurrency(row.totalAmount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompoundInterestTable
