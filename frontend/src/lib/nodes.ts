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

export type NodeDefinition = {
  type: string
  label: string
  icon: LucideIcon
}

export type CategoryDefinition = {
  label: string
  color: string
  nodes: NodeDefinition[]
}

export function findNodeDefinition(
  type: string
): { node: NodeDefinition; category: CategoryDefinition } | undefined {
  for (const category of CATEGORIES) {
    const node = category.nodes.find((n) => n.type === type)
    if (node) return { node, category }
  }
}

export const CATEGORIES: CategoryDefinition[] = [
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
