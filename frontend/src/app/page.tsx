'use client'

import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow>
        <Background
          variant={BackgroundVariant.Lines}
          color="#e4e4e4fb"
          gap={24}
          lineWidth={1}
        />
      </ReactFlow>
    </div>
  )
}
