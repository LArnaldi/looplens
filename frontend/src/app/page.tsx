'use client'

import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import NodeSidebar from '@/components/NodeSidebar'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <NodeSidebar />
      <div style={{ flex: 1 }}>
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
