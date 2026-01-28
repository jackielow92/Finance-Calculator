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

export default UpfrontCostSection
