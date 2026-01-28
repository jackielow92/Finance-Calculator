import { Tab } from '../../types'

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
}

function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="flex flex-wrap justify-center gap-3 md:gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
        >
          <i className={`fas ${tab.icon} mr-2`}></i>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
        </button>
      ))}
    </nav>
  )
}

export default TabNavigation
