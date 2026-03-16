'use client'

import { useState } from 'react'
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { PanelLeft } from 'lucide-react'
import NodeSidebar from '@/components/NodeSidebar'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      {sidebarOpen && <NodeSidebar />}
      <div style={{ flex: 1, position: 'relative' }}>
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          <PanelLeft size={16} />
        </button>
        <ReactFlow>
          <Background
            variant={BackgroundVariant.Lines}
            color="#e4e4e4fb"
            gap={24}
            lineWidth={1}
          />
        </ReactFlow>
      </div>
    </div>
  )
}
