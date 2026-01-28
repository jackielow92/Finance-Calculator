import { ChangeEvent } from 'react'

interface InputProps {
  label: string
  value: number | string
  onChange: (value: number) => void
  icon?: string
  type?: 'number' | 'text'
  min?: number
  max?: number
  step?: number
  placeholder?: string
  prefix?: string
  suffix?: string
  helperText?: string
  className?: string
}

function Input({
  label,
  value,
  onChange,
  icon,
  type = 'number',
  min,
  max,
  step = 1,
  placeholder,
  prefix,
  suffix,
  helperText,
  className = '',
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = type === 'number' ? parseFloat(e.target.value) || 0 : Number(e.target.value) || 0
    onChange(val)
  }

  return (
    <div className={`input-group ${className}`}>
      <label className="input-label">
        {icon && <i className={`fas ${icon} input-icon`}></i>}
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sec font-semibold">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`neu-input ${prefix ? 'pl-12' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sec font-semibold">
            {suffix}
          </span>
        )}
      </div>
      {helperText && <p className="mt-1 text-xs text-text-sec">{helperText}</p>}
    </div>
  )
}

export default Input
