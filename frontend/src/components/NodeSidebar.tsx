'use client'

import { CATEGORIES } from '@/lib/nodes'

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
