import { ChangeEvent } from 'react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  icon?: string
  className?: string
}

function Select({ label, value, onChange, options, icon, className = '' }: SelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={`input-group ${className}`}>
      <label className="input-label">
        {icon && <i className={`fas ${icon} input-icon`}></i>}
        {label}
      </label>
      <div className="relative">
        <select value={value} onChange={handleChange} className="neu-select pr-10">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-text-sec pointer-events-none"></i>
      </div>
    </div>
  )
}

export default Select
