import { Input, Card } from '../common'
import { Commitments } from '../../types'
import { formatCurrency } from '../../utils'

interface CommitmentsSectionProps {
  commitments: Commitments
  onCommitmentChange: <K extends keyof Commitments>(key: K, value: Commitments[K]) => void
  totalCommitments: number
}

function CommitmentsSection({
  commitments,
  onCommitmentChange,
  totalCommitments,
}: CommitmentsSectionProps) {
  return (
    <Card>
      <h3 className="text-lg font-bold text-text-main mb-4 flex items-center">
        <i className="fas fa-credit-card mr-2 text-primary"></i>
        Existing Monthly Commitments
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          label="Car Loan"
          value={commitments.carLoan}
          onChange={(val) => onCommitmentChange('carLoan', val)}
          icon="fa-car"
          prefix="RM"
          min={0}
          step={100}
        />
        <Input
          label="PTPTN"
          value={commitments.ptptn}
          onChange={(val) => onCommitmentChange('ptptn', val)}
          icon="fa-graduation-cap"
          prefix="RM"
          min={0}
          step={50}
        />
        <Input
          label="Credit Card"
          value={commitments.creditCard}
          onChange={(val) => onCommitmentChange('creditCard', val)}
          icon="fa-credit-card"
          prefix="RM"
          min={0}
          step={100}
        />
        <Input
          label="Personal Loan"
          value={commitments.personalLoan}
          onChange={(val) => onCommitmentChange('personalLoan', val)}
          icon="fa-hand-holding-dollar"
          prefix="RM"
          min={0}
          step={100}
        />
        <Input
          label="Other Commitments"
          value={commitments.other}
          onChange={(val) => onCommitmentChange('other', val)}
          icon="fa-file-invoice-dollar"
          prefix="RM"
          min={0}
          step={100}
        />
      </div>
      <div className="mt-4 p-4 bg-bg/50 rounded-lg flex justify-between items-center">
        <span className="font-semibold text-text-sec">Total Existing Commitments</span>
        <span className="font-bold text-primary text-lg">{formatCurrency(totalCommitments)}</span>
      </div>
    </Card>
  )
}

export default CommitmentsSection
