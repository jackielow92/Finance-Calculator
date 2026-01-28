import { useState, ReactNode } from 'react'

interface CollapsibleSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  icon?: string
  className?: string
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  icon,
  className = '',
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`neu-card ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="collapsible-header w-full text-left"
      >
        <span className="font-bold text-text-main flex items-center">
          {icon && <i className={`fas ${icon} mr-2 text-primary`}></i>}
          {title}
        </span>
        <i
          className={`fas fa-chevron-down text-text-sec transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        ></i>
      </button>
      <div
        className={`collapsible-content ${isOpen ? 'max-h-[2000px] mt-4' : 'max-h-0'}`}
      >
        {children}
      </div>
    </div>
  )
}

export default CollapsibleSection
