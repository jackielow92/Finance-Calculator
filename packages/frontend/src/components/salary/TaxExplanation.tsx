import { CollapsibleSection } from '../common'

interface TaxCardProps {
  title: string
  subtitle: string
  icon: string
  gradient: string
  description: string
  formula?: string
  example?: string
  note?: string
}

function TaxCard({ title, subtitle, icon, gradient, description, formula, example, note }: TaxCardProps) {
  return (
    <div className="neu-card">
      <div className="flex items-start mb-3">
        <span className={`gradient-icon ${gradient} mr-3 flex-shrink-0`}>
          <i className={`fas ${icon}`}></i>
        </span>
        <div>
          <h4 className="font-bold text-text-main">{title}</h4>
          <p className="text-sm text-text-sec">{subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-text-sec mb-3">{description}</p>
      {formula && (
        <div className="bg-bg/50 rounded-lg p-2 mb-2">
          <p className="text-xs text-text-sec font-mono">{formula}</p>
        </div>
      )}
      {example && (
        <p className="text-xs text-primary">{example}</p>
      )}
      {note && (
        <p className="text-xs text-text-sec mt-2 italic">{note}</p>
      )}
    </div>
  )
}

function TaxExplanation() {
  const cards: TaxCardProps[] = [
    {
      title: 'EPF (KWSP)',
      subtitle: 'Employees Provident Fund',
      icon: 'fa-landmark',
      gradient: 'gradient-epf',
      description: 'Mandatory retirement savings scheme. Employer contributes 13% (for salaries ≤RM5,000) or 12% (>RM5,000), employee contributes 11%.',
      formula: 'Employer: 12-13% | Employee: 11%',
      example: 'E.g., RM5,000 salary → RM650 (employer) + RM550 (employee)',
      note: 'Contribution rates may vary based on age and citizenship.',
    },
    {
      title: 'SOCSO (PERKESO)',
      subtitle: 'Social Security Organization',
      icon: 'fa-shield-halved',
      gradient: 'gradient-socso',
      description: 'Provides protection for employment injury and invalidity. Contributions are based on fixed salary bands.',
      formula: 'Fixed amount based on salary band',
      example: 'E.g., RM5,000 salary → RM86.65 (employer) + RM24.75 (employee)',
      note: 'Covers workplace injuries, occupational diseases, and invalidity.',
    },
    {
      title: 'EIS (SIP)',
      subtitle: 'Employment Insurance System',
      icon: 'fa-briefcase',
      gradient: 'gradient-eis',
      description: 'Provides temporary financial assistance to unemployed workers. Equal contribution from employer and employee.',
      formula: 'Fixed amount based on salary band',
      example: 'E.g., RM5,000 salary → RM9.90 each (employer & employee)',
      note: 'Provides job search allowance, training allowance, and early re-employment allowance.',
    },
    {
      title: 'PCB (MTD)',
      subtitle: 'Monthly Tax Deduction',
      icon: 'fa-receipt',
      gradient: 'gradient-pcb',
      description: 'Scheduled monthly deductions for income tax. Based on net remuneration (salary minus EPF) and tax category.',
      formula: 'Based on LHDN PCB Schedule',
      example: 'Tax amount varies by salary, marital status, and number of children.',
      note: 'PCB categories: B (Single), K2/K3 (Married), KA (with children).',
    },
  ]

  return (
    <CollapsibleSection title="Understanding Your Deductions" icon="fa-info-circle" defaultOpen={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <TaxCard key={card.title} {...card} />
        ))}
      </div>
    </CollapsibleSection>
  )
}

export default TaxExplanation
