import { Input, Select } from '../common'
import { SalaryInputs as Inputs, PcbCategory, PCB_CATEGORY_LABELS } from '../../types'

interface SalaryInputsProps {
  inputs: Inputs
  onInputChange: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void
}

const pcbOptions = Object.entries(PCB_CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}))

function SalaryInputs({ inputs, onInputChange }: SalaryInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="Basic Salary"
        value={inputs.basicSalary}
        onChange={(val) => onInputChange('basicSalary', val)}
        icon="fa-money-bill-wave"
        prefix="RM"
        min={0}
        step={100}
      />
      <Input
        label="Bonus"
        value={inputs.bonus}
        onChange={(val) => onInputChange('bonus', val)}
        icon="fa-gift"
        prefix="RM"
        min={0}
        step={100}
      />
      <Select
        label="PCB Category"
        value={inputs.pcbCategory}
        onChange={(val) => onInputChange('pcbCategory', val as PcbCategory)}
        options={pcbOptions}
        icon="fa-user-tag"
        className="md:col-span-2"
      />
    </div>
  )
}

export default SalaryInputs
