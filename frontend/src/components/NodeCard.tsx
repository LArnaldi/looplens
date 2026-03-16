import type { LucideIcon } from 'lucide-react'

export type NodeCardProps = {
  label: string
  icon: LucideIcon
  color: string
}

export default function NodeCard({ label, icon: Icon, color }: NodeCardProps) {
  return (
    <div className="node-card" style={{ borderLeftColor: color }}>
      <Icon className="node-card__icon" size={15} style={{ color }} />
      <span className="node-card__label">{label}</span>
    </div>
  )
}
