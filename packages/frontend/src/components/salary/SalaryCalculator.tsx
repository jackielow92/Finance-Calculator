import { Card, SummaryCard } from '../common'
import { useSalaryCalculator } from '../../hooks'
import { formatCurrency } from '../../utils'
import SalaryInputs from './SalaryInputs'
import DeductionTable from './DeductionTable'
import TaxExplanation from './TaxExplanation'

function SalaryCalculator() {
  const { inputs, setInput, calculation, isPcbLoading } = useSalaryCalculator()

  return (
    <div className="space-y-6">
      {/* Inputs Section */}
      <Card>
        <h2 className="text-xl font-bold text-text-main mb-4 flex items-center">
          <i className="fas fa-keyboard mr-2 text-primary"></i>
          Salary Details
        </h2>
        <SalaryInputs inputs={inputs} onInputChange={setInput} />
        {isPcbLoading && (
          <p className="mt-2 text-sm text-text-sec">
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Loading PCB tax table...
          </p>
        )}
      </Card>

      {/* Summary Cards */}
      <div className="summary-grid">
        <SummaryCard
          label="Gross Salary"
          value={formatCurrency(calculation.grossSalary)}
          icon="fa-money-bill-trend-up"
        />
        <SummaryCard
          label="Total Deductions"
          value={formatCurrency(calculation.totals.employee)}
          icon="fa-money-bill-transfer"
          variant="warning"
        />
        <SummaryCard
          label="Net Salary"
          value={formatCurrency(calculation.netSalary)}
          icon="fa-wallet"
          variant="success"
          large
        />
      </div>

      {/* Deduction Table */}
      <Card>
        <h2 className="text-xl font-bold text-text-main mb-4 flex items-center">
          <i className="fas fa-table mr-2 text-primary"></i>
          Salary Statement
        </h2>
        <DeductionTable
          calculation={calculation}
          basicSalary={inputs.basicSalary}
          bonus={inputs.bonus}
        />
      </Card>

      {/* Tax Explanation */}
      <TaxExplanation />
    </div>
  )
}

export default SalaryCalculator
