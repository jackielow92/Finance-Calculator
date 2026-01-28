import { SalaryCalculation } from '../../types'
import { formatCurrency } from '../../utils'

interface DeductionTableProps {
  calculation: SalaryCalculation
  basicSalary: number
  bonus: number
}

function DeductionTable({ calculation, basicSalary, bonus }: DeductionTableProps) {
  const { epf, socso, eis, tax, netSalary, totals } = calculation

  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Employer</th>
            <th>Employee</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Income Section */}
          <tr className="bg-primary/5">
            <td colSpan={4} className="font-bold text-primary">Income</td>
          </tr>
          <tr>
            <td>Basic Salary</td>
            <td>-</td>
            <td>{formatCurrency(basicSalary)}</td>
            <td>{formatCurrency(basicSalary)}</td>
          </tr>
          <tr>
            <td>Bonus</td>
            <td>-</td>
            <td>{formatCurrency(bonus)}</td>
            <td>{formatCurrency(bonus)}</td>
          </tr>
          <tr className="bg-dsr-good/10">
            <td className="font-bold">Gross Salary</td>
            <td>-</td>
            <td className="font-bold">{formatCurrency(calculation.grossSalary)}</td>
            <td className="font-bold text-dsr-good">{formatCurrency(calculation.grossSalary)}</td>
          </tr>

          {/* Deductions Section */}
          <tr className="bg-primary/5">
            <td colSpan={4} className="font-bold text-primary">Statutory Deductions</td>
          </tr>
          <tr>
            <td>
              <span className="flex items-center">
                <span className="gradient-icon gradient-epf w-6 h-6 text-xs mr-2">
                  <i className="fas fa-landmark"></i>
                </span>
                EPF (KWSP)
              </span>
            </td>
            <td>{formatCurrency(epf.employer)}</td>
            <td>{formatCurrency(epf.employee)}</td>
            <td>{formatCurrency(epf.total)}</td>
          </tr>
          <tr>
            <td>
              <span className="flex items-center">
                <span className="gradient-icon gradient-socso w-6 h-6 text-xs mr-2">
                  <i className="fas fa-shield-halved"></i>
                </span>
                SOCSO (PERKESO)
              </span>
            </td>
            <td>{formatCurrency(socso.employer)}</td>
            <td>{formatCurrency(socso.employee)}</td>
            <td>{formatCurrency(socso.total)}</td>
          </tr>
          <tr>
            <td>
              <span className="flex items-center">
                <span className="gradient-icon gradient-eis w-6 h-6 text-xs mr-2">
                  <i className="fas fa-briefcase"></i>
                </span>
                EIS (SIP)
              </span>
            </td>
            <td>{formatCurrency(eis.employer)}</td>
            <td>{formatCurrency(eis.employee)}</td>
            <td>{formatCurrency(eis.total)}</td>
          </tr>
          <tr>
            <td>
              <span className="flex items-center">
                <span className="gradient-icon gradient-pcb w-6 h-6 text-xs mr-2">
                  <i className="fas fa-receipt"></i>
                </span>
                PCB (Tax)
              </span>
            </td>
            <td>-</td>
            <td>{formatCurrency(tax)}</td>
            <td>{formatCurrency(tax)}</td>
          </tr>

          {/* Totals Section */}
          <tr className="bg-primary/5">
            <td colSpan={4} className="font-bold text-primary">Totals</td>
          </tr>
          <tr>
            <td>Total Employer Contributions</td>
            <td className="font-bold">{formatCurrency(totals.employer)}</td>
            <td>-</td>
            <td>{formatCurrency(totals.employer)}</td>
          </tr>
          <tr>
            <td>Total Employee Deductions</td>
            <td>-</td>
            <td className="font-bold">{formatCurrency(totals.employee)}</td>
            <td>{formatCurrency(totals.employee)}</td>
          </tr>
          <tr className="bg-dsr-good/10">
            <td className="font-bold">Net Salary (Take-home)</td>
            <td>-</td>
            <td className="font-bold text-dsr-good text-lg">{formatCurrency(netSalary)}</td>
            <td className="font-bold text-dsr-good text-lg">{formatCurrency(netSalary)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DeductionTable
