interface SummaryCardProps {
  label: string
  value: string
  icon?: string
  variant?: 'default' | 'success' | 'warning' | 'danger'
  large?: boolean
  className?: string
}

function SummaryCard({
  label,
  value,
  icon,
  variant = 'default',
  large = false,
  className = '',
}: SummaryCardProps) {
  const variantClasses = {
    default: 'text-primary',
    success: 'text-dsr-good',
    warning: 'text-dsr-moderate',
    danger: 'text-dsr-danger',
  }

  return (
    <div className={`summary-card ${className}`}>
      {icon && <i className={`fas ${icon} text-2xl mb-2 ${variantClasses[variant]}`}></i>}
      <span className="summary-label">{label}</span>
      <span className={`${large ? 'summary-value-large' : 'summary-value'} ${variantClasses[variant]}`}>
        {value}
      </span>
    </div>
  )
}

export default SummaryCard
