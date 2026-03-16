'use client'

import {
  Hash,
  Flag,
  ArrowDownToLine,
  ArrowUpFromLine,
  Database,
  Lock,
  Zap,
  Clock,
  MessageSquare,
  Box,
  type LucideIcon,
} from 'lucide-react'

type NodeDefinition = {
  type: string
  label: string
  icon: LucideIcon
}

type CategoryDefinition = {
  label: string
  color: string
  nodes: NodeDefinition[]
}

const CATEGORIES: CategoryDefinition[] = [
  {
    label: 'Data',
    color: '#3b82f6',
    nodes: [
      { type: 'variable', label: 'Variable', icon: Hash },
      { type: 'flag', label: 'Flag', icon: Flag },
    ],
  },
  {
    label: 'Flow',
    color: '#22c55e',
    nodes: [
      { type: 'source', label: 'Source', icon: ArrowDownToLine },
      { type: 'sink', label: 'Sink', icon: ArrowUpFromLine },
    ],
  },
  {
    label: 'Storage',
    color: '#06b6d4',
    nodes: [{ type: 'pool', label: 'Pool', icon: Database }],
  },
  {
    label: 'Logic',
    color: '#eab308',
    nodes: [{ type: 'gate', label: 'Gate', icon: Lock }],
  },
  {
    label: 'Event',
    color: '#ec4899',
    nodes: [{ type: 'trigger', label: 'Trigger', icon: Zap }],
  },
  {
    label: 'Time',
    color: '#6b7280',
    nodes: [{ type: 'timer', label: 'Timer', icon: Clock }],
  },
  {
    label: 'Meta',
    color: '#64748b',
    nodes: [
      { type: 'comment', label: 'Comment', icon: MessageSquare },
      { type: 'custom', label: 'Custom', icon: Box },
    ],
  },
]

export default function NodeSidebar() {
  return (
    <aside className="node-sidebar">
      <div className="node-sidebar__header">
        <span className="node-sidebar__title">Nodes</span>
      </div>

      <div className="node-sidebar__content">
        {CATEGORIES.map((category) => (
          <div key={category.label} className="node-category">
            <div className="node-category__header">
              <span
                className="node-category__dot"
                style={{ backgroundColor: category.color }}
              />
              <span className="node-category__label">{category.label}</span>
            </div>

            <div className="node-category__items">
              {category.nodes.map((node) => {
                const Icon = node.icon
                return (
                  <div key={node.type} className="node-item">
                    <Icon
                      className="node-item__icon"
                      size={14}
                      style={{ color: category.color }}
                    />
                    <span className="node-item__label">{node.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
