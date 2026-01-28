import { Input } from '../common'
import { HousingLoanInputs as Inputs } from '../../types'

interface HousingLoanInputsProps {
  inputs: Inputs
  onInputChange: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void
}

function HousingLoanInputs({ inputs, onInputChange }: HousingLoanInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="Monthly Income"
        value={inputs.monthlyIncome}
        onChange={(val) => onInputChange('monthlyIncome', val)}
        icon="fa-wallet"
        prefix="RM"
        min={0}
        step={500}
      />
      <Input
        label="Property Price"
        value={inputs.propertyPrice}
        onChange={(val) => onInputChange('propertyPrice', val)}
        icon="fa-house"
        prefix="RM"
        min={0}
        step={10000}
      />
      <Input
        label="Loan Tenure"
        value={inputs.loanTenure}
        onChange={(val) => onInputChange('loanTenure', val)}
        icon="fa-calendar"
        suffix="years"
        min={1}
        max={35}
        step={1}
      />
      <Input
        label="Interest Rate"
        value={inputs.interestRate}
        onChange={(val) => onInputChange('interestRate', val)}
        icon="fa-percent"
        suffix="%"
        min={0}
        max={20}
        step={0.1}
      />
      <Input
        label="Downpayment"
        value={inputs.downpaymentPercent}
        onChange={(val) => onInputChange('downpaymentPercent', val)}
        icon="fa-hand-holding-dollar"
        suffix="%"
        min={0}
        max={100}
        step={5}
        className="md:col-span-2"
      />
    </div>
  )
}

export default HousingLoanInputs
