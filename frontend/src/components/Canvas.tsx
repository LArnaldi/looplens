'use client'

import { useCallback } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  useNodesState,
  useReactFlow,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import NodeCardFlow from './NodeCardFlow'
import { findNodeDefinition } from '@/lib/nodes'
import type { NodeCardProps } from './NodeCard'

type NodeCardNode = Node<NodeCardProps>

const nodeTypes = { nodeCard: NodeCardFlow }

function CanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeCardNode>([])
  const { screenToFlowPosition } = useReactFlow()

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const nodeType = event.dataTransfer.getData('nodeType')
      if (!nodeType) return

      const definition = findNodeDefinition(nodeType)
      if (!definition) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      setNodes((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'nodeCard',
          position,
          data: {
            label: definition.node.label,
            icon: definition.node.icon,
            color: definition.category.color,
          },
        },
      ])
    },
    [screenToFlowPosition, setNodes]
  )

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Background
        variant={BackgroundVariant.Lines}
        color="#e4e4e4fb"
        gap={24}
        lineWidth={1}
      />
    </ReactFlow>
  )
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  )
}
