'use client'

import { useState } from 'react'
import { PanelLeft } from 'lucide-react'
import NodeSidebar from '@/components/NodeSidebar'
import Canvas from '@/components/Canvas'

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
        <Canvas />
      </div>
    </div>
  )
}
