import { useState } from 'react'
import { Card } from '../common'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
}

function Collapsible({ title, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-gray-200/50 mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-sm font-medium text-text-main hover:text-primary transition-colors"
      >
        <span>{title}</span>
        <i className={`fas fa-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      {isOpen && (
        <div className="pb-3 text-sm text-text-sec leading-relaxed">{children}</div>
      )}
    </div>
  )
}

interface TaxCardProps {
  title: string
  subtitle: string
  icon: string
  iconColorClass: string
  description: string
  formulaContent: React.ReactNode
  exampleContent: React.ReactNode
  note: string
}

function TaxCard({
  title,
  subtitle,
  icon,
  iconColorClass,
  description,
  formulaContent,
  exampleContent,
  note,
}: TaxCardProps) {
  return (
    <div className="p-4 bg-bg rounded-xl shadow-neu-out">
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconColorClass}`}
        >
          <i className={`fas ${icon} text-white`}></i>
        </div>
        <div>
          <h4 className="font-bold text-text-main">{title}</h4>
          <p className="text-xs text-text-sec">{subtitle}</p>
        </div>
      </div>

      <p className="text-sm text-text-sec mb-2">{description}</p>

      <Collapsible title="Formula">{formulaContent}</Collapsible>

      <Collapsible title="Example">{exampleContent}</Collapsible>

      <div className="mt-3 pt-3 border-t border-gray-200/50">
        <p className="text-xs text-text-sec italic">
          <i className="fas fa-info-circle mr-1 text-primary"></i>
          {note}
        </p>
      </div>
    </div>
  )
}

function TaxExplanation() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <i className="fas fa-info-circle text-primary text-xl"></i>
        <h3 className="text-lg font-bold text-text-main">
          How EPF, PCB, SOCSO, and EIS are Calculated
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* EPF Card */}
        <TaxCard
          title="EPF (KWSP / Kumpulan Wang Simpanan Pekerja)"
          subtitle="Retirement Savings Contribution (Mandatory)"
          icon="fa-piggy-bank"
          iconColorClass="bg-gradient-to-br from-blue-500 to-blue-600"
          description="EPF is a compulsory retirement saving scheme in Malaysia. Every month, both employee and employer contribute a portion of the employee's monthly wages into the EPF account."
          formulaContent={
            <div className="space-y-2">
              <p>Employee EPF = Monthly Salary × 11%</p>
              <p>Employer EPF =</p>
              <ul className="ml-4 list-disc">
                <li>Monthly Salary × 13% (if salary ≤ RM 5,000)</li>
                <li>Monthly Salary × 12% (if salary {'>'} RM 5,000)</li>
              </ul>
              <p className="mt-2">Total EPF = Employee EPF + Employer EPF</p>
              <p>Net Salary = Monthly Salary − Employee EPF</p>
            </div>
          }
          exampleContent={
            <div className="space-y-1">
              <p>Monthly Salary: RM 5,000</p>
              <p>Employee EPF (11%): RM 550</p>
              <p>Employer EPF (13%): RM 650</p>
              <p className="font-semibold text-text-main mt-2">
                Total EPF Contribution: RM 1,200
              </p>
            </div>
          }
          note="EPF (KWSP) follows Jadual Ketiga wage-band table (Employer / Employee amounts)."
        />

        {/* PCB Card */}
        <TaxCard
          title="PCB (Potongan Cukai Berjadual)"
          subtitle="Monthly Tax Deduction"
          icon="fa-receipt"
          iconColorClass="bg-gradient-to-br from-purple-500 to-purple-600"
          description="PCB is calculated based on your monthly taxable income after EPF deductions. The calculation follows Malaysia's progressive tax rates, which range from 0% to 30% depending on your annual income bracket."
          formulaContent={
            <div>
              <p>PCB = (Annual Taxable Income × Tax Rate - Relief) ÷ 12</p>
            </div>
          }
          exampleContent={
            <div className="space-y-1">
              <p>Monthly Salary: RM 5,000</p>
              <p>Annual Income: RM 60,000</p>
              <p>After EPF (11%): RM 53,400</p>
              <p>PCB Rate: 11% (RM 35,001 - RM 50,000 bracket)</p>
              <p className="font-semibold text-text-main mt-2">Monthly PCB: ~RM 247</p>
            </div>
          }
          note="PCB is deducted monthly and may be adjusted at year-end when filing actual tax returns."
        />

        {/* SOCSO Card */}
        <TaxCard
          title="SOCSO (Social Security)"
          subtitle="Employee Protection Scheme"
          icon="fa-shield-alt"
          iconColorClass="bg-gradient-to-br from-green-500 to-green-600"
          description="SOCSO provides social protection for employees in case of work-related accidents, disability, or death. The contribution is calculated based on your monthly salary with specific rate tiers."
          formulaContent={
            <div>
              <p>SOCSO = Monthly Salary × Rate (0.5% for RM 4,000 and below)</p>
            </div>
          }
          exampleContent={
            <div className="space-y-1">
              <p>Monthly Salary: RM 5,000</p>
              <p>Employee Rate: 0.5% (capped at RM 4,000)</p>
              <p>Employer Rate: 1.75% (capped at RM 4,000)</p>
              <p className="font-semibold text-text-main mt-2">Employee SOCSO: RM 20.00</p>
              <p className="font-semibold text-text-main">Employer SOCSO: RM 70.00</p>
            </div>
          }
          note="SOCSO contributions are capped at RM 4,000 monthly salary for calculation purposes."
        />

        {/* EIS Card */}
        <TaxCard
          title="EIS (Employment Insurance)"
          subtitle="Unemployment Protection"
          icon="fa-umbrella"
          iconColorClass="bg-gradient-to-br from-orange-500 to-orange-600"
          description="EIS provides financial assistance and support for employees who lose their jobs. It's a mandatory contribution for most Malaysian employees, calculated as a percentage of monthly salary."
          formulaContent={
            <div>
              <p>EIS = Monthly Salary × 0.2% (capped at RM 4,000)</p>
            </div>
          }
          exampleContent={
            <div className="space-y-1">
              <p>Monthly Salary: RM 5,000</p>
              <p>Employee Rate: 0.2% (capped at RM 4,000)</p>
              <p>Employer Rate: 0.2% (capped at RM 4,000)</p>
              <p className="font-semibold text-text-main mt-2">Employee EIS: RM 8.00</p>
              <p className="font-semibold text-text-main">Employer EIS: RM 8.00</p>
            </div>
          }
          note="EIS provides up to 6 months of financial assistance and job search support for eligible claimants."
        />
      </div>
    </Card>
  )
}

export default TaxExplanation
