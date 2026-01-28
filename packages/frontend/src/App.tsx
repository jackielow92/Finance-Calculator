import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import TabNavigation from './components/layout/TabNavigation'
import CompoundInterestCalculator from './components/compound-interest/CompoundInterestCalculator'
import SalaryCalculator from './components/salary/SalaryCalculator'
import HousingLoanCalculator from './components/housing-loan/HousingLoanCalculator'

type TabId = 'compound-interest' | 'salary' | 'housing-loan'

const tabs = [
  { id: 'compound-interest' as const, label: 'Compound Interest', icon: 'fa-chart-line' },
  { id: 'salary' as const, label: 'Salary Calculator', icon: 'fa-wallet' },
  { id: 'housing-loan' as const, label: 'Housing Loan', icon: 'fa-house' },
]

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('compound-interest')

  return (
    <div className="min-h-screen bg-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabId)}
        />

        <main className="mt-8">
          {activeTab === 'compound-interest' && <CompoundInterestCalculator />}
          {activeTab === 'salary' && <SalaryCalculator />}
          {activeTab === 'housing-loan' && <HousingLoanCalculator />}
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
