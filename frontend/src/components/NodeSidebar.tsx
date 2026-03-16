'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/nodes'

export default function NodeSidebar() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (label: string) =>
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }))

  return (
    <aside className="node-sidebar">
      <div className="node-sidebar__header">
        <span className="node-sidebar__title">Nodes</span>
      </div>

      <div className="node-sidebar__content">
        {CATEGORIES.map((category) => {
          const isCollapsed = collapsed[category.label] ?? false
          return (
            <div key={category.label} className="node-category">
              <button
                className="node-category__header"
                onClick={() => toggle(category.label)}
                aria-expanded={!isCollapsed}
              >
                <span
                  className="node-category__dot"
                  style={{ backgroundColor: category.color }}
                />
                <span className="node-category__label">{category.label}</span>
                {isCollapsed ? (
                  <ChevronRight size={12} className="node-category__chevron" />
                ) : (
                  <ChevronDown size={12} className="node-category__chevron" />
                )}
              </button>

              {!isCollapsed && (
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
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
