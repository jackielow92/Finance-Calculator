import { useRef } from 'react'
import { Card, ExportButton } from '../common'
import { useCompoundInterest } from '../../hooks'
import CompoundInterestInputs from './CompoundInterestInputs'
import CompoundInterestSummary from './CompoundInterestSummary'
import CompoundInterestChart from './CompoundInterestChart'
import CompoundInterestTable from './CompoundInterestTable'

function CompoundInterestCalculator() {
  const { inputs, setInput, results, summary } = useCompoundInterest()
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-6">
      {/* Inputs Section */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text-main flex items-center">
            <i className="fas fa-sliders mr-2 text-primary"></i>
            Investment Parameters
          </h2>
          <ExportButton
            contentRef={contentRef}
            filename="Compound_Interest_Report"
            title="Compound Interest Calculator Report"
          />
        </div>
        <CompoundInterestInputs inputs={inputs} onInputChange={setInput} />
      </Card>

      {/* Exportable Content */}
      <div ref={contentRef} className="space-y-6">
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
    </div>
  )
}

export default CompoundInterestCalculator
