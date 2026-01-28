import { useState } from 'react'
import { Card, Input } from '../common'
import { UpfrontCosts, UpfrontCostPercentages, PropertyType } from '../../types'
import { formatCurrency } from '../../utils'

interface UpfrontCostSectionProps {
  newCosts: UpfrontCosts
  subsaleCosts: UpfrontCosts
  newPercentages: UpfrontCostPercentages
  subsalePercentages: UpfrontCostPercentages
  onNewPercentageChange: <K extends keyof UpfrontCostPercentages>(
    key: K,
    value: UpfrontCostPercentages[K]
  ) => void
  onSubsalePercentageChange: <K extends keyof UpfrontCostPercentages>(
    key: K,
    value: UpfrontCostPercentages[K]
  ) => void
}

function UpfrontCostSection({
  newCosts,
  subsaleCosts,
  newPercentages,
  subsalePercentages,
  onNewPercentageChange,
  onSubsalePercentageChange,
}: UpfrontCostSectionProps) {
  const [activeTab, setActiveTab] = useState<PropertyType>('new')

  return (
    <Card>
      <h3 className="text-lg font-bold text-text-main mb-4 flex items-center">
        <i className="fas fa-file-invoice-dollar mr-2 text-primary"></i>
        Upfront Costs Estimate
      </h3>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('new')}
          className={`tab flex-1 ${activeTab === 'new' ? 'active' : ''}`}
        >
          <i className="fas fa-building mr-2"></i>
          New Property
        </button>
        <button
          onClick={() => setActiveTab('subsale')}
          className={`tab flex-1 ${activeTab === 'subsale' ? 'active' : ''}`}
        >
          <i className="fas fa-home mr-2"></i>
          Subsale
        </button>
      </div>

      {/* New Property Costs */}
      {activeTab === 'new' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CostRow
              label="Downpayment"
              percentage={newPercentages.downpayment}
              amount={newCosts.downpayment}
              onPercentageChange={(val) => onNewPercentageChange('downpayment', val)}
            />
            <CostRow
              label="S&P Legal Fee"
              percentage={newPercentages.spLegalFee}
              amount={newCosts.spLegalFee}
              onPercentageChange={(val) => onNewPercentageChange('spLegalFee', val)}
            />
            <CostRow
              label="Stamp Duty"
              percentage={newPercentages.stampDuty}
              amount={newCosts.stampDuty}
              onPercentageChange={(val) => onNewPercentageChange('stampDuty', val)}
            />
            <CostRow
              label="Loan Legal Fee"
              percentage={newPercentages.loanLegalFee}
              amount={newCosts.loanLegalFee}
              onPercentageChange={(val) => onNewPercentageChange('loanLegalFee', val)}
            />
            <CostRow
              label="Loan Stamp Duty"
              percentage={newPercentages.loanStampDuty}
              amount={newCosts.loanStampDuty}
              onPercentageChange={(val) => onNewPercentageChange('loanStampDuty', val)}
            />
          </div>
          <div className="mt-4 p-4 bg-dsr-good/10 rounded-lg flex justify-between items-center">
            <span className="font-bold text-text-main">Total Upfront Cost</span>
            <span className="font-extrabold text-dsr-good text-xl">
              {formatCurrency(newCosts.total)}
            </span>
          </div>

          {/* Fee Explanations - New Property */}
          <FeeExplanations propertyType="new" />
        </div>
      )}

      {/* Subsale Property Costs */}
      {activeTab === 'subsale' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CostRow
              label="Downpayment"
              percentage={subsalePercentages.downpayment}
              amount={subsaleCosts.downpayment}
              onPercentageChange={(val) => onSubsalePercentageChange('downpayment', val)}
            />
            <CostRow
              label="S&P Legal Fee"
              percentage={subsalePercentages.spLegalFee}
              amount={subsaleCosts.spLegalFee}
              onPercentageChange={(val) => onSubsalePercentageChange('spLegalFee', val)}
            />
            <CostRow
              label="MOT (Transfer)"
              percentage={subsalePercentages.mot || 0}
              amount={subsaleCosts.mot || 0}
              onPercentageChange={(val) => onSubsalePercentageChange('mot', val)}
            />
            <CostRow
              label="Loan Legal Fee"
              percentage={subsalePercentages.loanLegalFee}
              amount={subsaleCosts.loanLegalFee}
              onPercentageChange={(val) => onSubsalePercentageChange('loanLegalFee', val)}
            />
            <CostRow
              label="Loan Stamp Duty"
              percentage={subsalePercentages.loanStampDuty}
              amount={subsaleCosts.loanStampDuty}
              onPercentageChange={(val) => onSubsalePercentageChange('loanStampDuty', val)}
            />
            <CostRow
              label="Valuation Fee"
              percentage={subsalePercentages.valuationFee || 0}
              amount={subsaleCosts.valuationFee || 0}
              onPercentageChange={(val) => onSubsalePercentageChange('valuationFee', val)}
            />
          </div>
          <div className="mt-4 p-4 bg-dsr-good/10 rounded-lg flex justify-between items-center">
            <span className="font-bold text-text-main">Total Upfront Cost</span>
            <span className="font-extrabold text-dsr-good text-xl">
              {formatCurrency(subsaleCosts.total)}
            </span>
          </div>

          {/* Fee Explanations - Subsale */}
          <FeeExplanations propertyType="subsale" />
        </div>
      )}
    </Card>
  )
}

interface CostRowProps {
  label: string
  percentage: number
  amount: number
  onPercentageChange: (value: number) => void
}

function CostRow({ label, percentage, amount, onPercentageChange }: CostRowProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <Input
          label={label}
          value={percentage}
          onChange={onPercentageChange}
          suffix="%"
          min={0}
          max={100}
          step={0.5}
        />
      </div>
      <div className="w-32 text-right">
        <span className="text-sm text-text-sec block">Amount</span>
        <span className="font-semibold text-primary">{formatCurrency(amount)}</span>
      </div>
    </div>
  )
}

interface FeeExplanationsProps {
  propertyType: PropertyType
}

const NEW_PROPERTY_FEES = [
  {
    icon: 'fa-file-contract',
    name: 'S&P Legal Fee (~1%)',
    description: 'Based on Bar Council scale. Developer often covers this for new projects.',
  },
  {
    icon: 'fa-stamp',
    name: 'Stamp Duty (~3%)',
    description:
      'Government tiered rates, 1–4% typical. Sometimes waived for first-home buyers.',
  },
  {
    icon: 'fa-gavel',
    name: 'Loan Legal Fee (~0.5%)',
    description: 'Legal work for loan documents. Sometimes free in new launches.',
  },
  {
    icon: 'fa-file-invoice-dollar',
    name: 'Loan Stamp Duty (0.5%)',
    description: 'Fixed at 0.5% of loan amount.',
  },
]

const SUBSALE_FEES = [
  {
    icon: 'fa-file-contract',
    name: 'S&P Legal Fee (~1%)',
    description: 'Based on Bar Council scale for Sale and Purchase Agreement.',
  },
  {
    icon: 'fa-stamp',
    name: 'MOT (~3%)',
    description:
      'Memorandum of Transfer stamp duty. Government tiered rates for property title transfer.',
  },
  {
    icon: 'fa-gavel',
    name: 'Loan Legal Fee (~0.5%)',
    description: 'Legal work for loan agreement documents.',
  },
  {
    icon: 'fa-file-invoice-dollar',
    name: 'Loan Stamp Duty (0.5%)',
    description: 'Fixed at 0.5% of loan amount.',
  },
  {
    icon: 'fa-calculator',
    name: 'Valuation Fee (~0.25%)',
    description: 'Property valuation required by bank for loan approval.',
  },
]

function FeeExplanations({ propertyType }: FeeExplanationsProps) {
  const fees = propertyType === 'new' ? NEW_PROPERTY_FEES : SUBSALE_FEES
  const noteText =
    propertyType === 'new'
      ? 'Total costs usually range from 3.5–5% of property price. For new projects, developers often absorb S&P Legal Fee, Loan Legal Fee, or Stamp Duty.'
      : 'Total costs usually range from 5–7% of property price. Subsale properties require additional MOT and valuation fees.'

  return (
    <div className="mt-6 p-4 bg-bg rounded-lg shadow-neu-in">
      <div className="flex items-center gap-2 mb-4">
        <i className="fas fa-info-circle text-primary"></i>
        <h4 className="font-bold text-text-main">Fee Explanations</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fees.map((fee) => (
          <div
            key={fee.name}
            className="flex items-start gap-3 p-3 bg-bg rounded-lg shadow-neu-out transition-all duration-300 hover:shadow-neu-in hover:scale-[1.02] cursor-default"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <i className={`fas ${fee.icon} text-sm`}></i>
            </div>
            <div>
              <div className="font-semibold text-text-main text-sm">{fee.name}</div>
              <div className="text-xs text-text-sec mt-1">{fee.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <i className="fas fa-lightbulb text-primary mt-0.5"></i>
        <div>
          <div className="font-semibold text-text-main text-sm">Important Note</div>
          <div className="text-xs text-text-sec mt-1">{noteText}</div>
        </div>
      </div>
    </div>
  )
}

export default UpfrontCostSection
