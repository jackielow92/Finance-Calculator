import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

function Card({ children, className = '' }: CardProps) {
  return <div className={`neu-card ${className}`}>{children}</div>
}

export default Card
