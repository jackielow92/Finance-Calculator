import { Input } from '../common'
import { CompoundInterestInputs as Inputs } from '../../types'

interface CompoundInterestInputsProps {
  inputs: Inputs
  onInputChange: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void
}

function CompoundInterestInputs({ inputs, onInputChange }: CompoundInterestInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="Initial Investment"
        value={inputs.initialAmount}
        onChange={(val) => onInputChange('initialAmount', val)}
        icon="fa-piggy-bank"
        prefix="RM"
        min={0}
        step={1000}
      />
      <Input
        label="Monthly Contribution"
        value={inputs.monthlyContribution}
        onChange={(val) => onInputChange('monthlyContribution', val)}
        icon="fa-calendar-plus"
        prefix="RM"
        min={0}
        step={100}
      />
      <Input
        label="Annual Top-up"
        value={inputs.annualTopup}
        onChange={(val) => onInputChange('annualTopup', val)}
        icon="fa-arrow-trend-up"
        prefix="RM"
        min={0}
        step={50}
        helperText="Increase to monthly contribution each year"
      />
      <Input
        label="Annual Interest Rate"
        value={inputs.annualInterestRate}
        onChange={(val) => onInputChange('annualInterestRate', val)}
        icon="fa-percent"
        suffix="%"
        min={0}
        max={50}
        step={0.1}
      />
      <Input
        label="Investment Duration"
        value={inputs.years}
        onChange={(val) => onInputChange('years', val)}
        icon="fa-clock"
        suffix="years"
        min={1}
        max={50}
        step={1}
        className="md:col-span-2"
      />
    </div>
  )
}

export default CompoundInterestInputs
