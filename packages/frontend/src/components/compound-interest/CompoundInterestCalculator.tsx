import { Card } from '../common'
import { useCompoundInterest } from '../../hooks'
import CompoundInterestInputs from './CompoundInterestInputs'
import CompoundInterestSummary from './CompoundInterestSummary'
import CompoundInterestChart from './CompoundInterestChart'
import CompoundInterestTable from './CompoundInterestTable'

function CompoundInterestCalculator() {
  const { inputs, setInput, results, summary } = useCompoundInterest()

  return (
    <div className="space-y-6">
      {/* Inputs Section */}
      <Card>
        <h2 className="text-xl font-bold text-text-main mb-4 flex items-center">
          <i className="fas fa-sliders mr-2 text-primary"></i>
          Investment Parameters
        </h2>
        <CompoundInterestInputs inputs={inputs} onInputChange={setInput} />
      </Card>

      {/* Summary Section */}
      <CompoundInterestSummary summary={summary} />

      {/* Chart Section */}
      <CompoundInterestChart results={results} />

      {/* Table Section */}
      <Card>
        <h2 className="text-xl font-bold text-text-main mb-4 flex items-center">
          <i className="fas fa-table mr-2 text-primary"></i>
          Year-by-Year Breakdown
        </h2>
        <CompoundInterestTable results={results} />
      </Card>
    </div>
  )
}

export default CompoundInterestCalculator
