'use client'

import { useCallback, useState } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import NodeCardFlow from './NodeCardFlow'
import { findNodeDefinition } from '@/lib/nodes'
import type { NodeCardProps } from './NodeCard'

type NodeCardNode = Node<NodeCardProps>

const nodeTypes = { nodeCard: NodeCardFlow }

function CanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeCardNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [contextMenu, setContextMenu] = useState<{ nodeId: string; x: number; y: number } | null>(null)
  const { screenToFlowPosition, deleteElements } = useReactFlow()

  const onConnect = useCallback(
    (connection: Connection) => setEdges((prev) => addEdge(connection, prev)),
    [setEdges]
  )

  const onNodeContextMenu = useCallback<NodeMouseHandler>((event, node) => {
    event.preventDefault()
    setContextMenu({ nodeId: node.id, x: event.clientX, y: event.clientY })
  }, [])

  const onPaneClick = useCallback(() => setContextMenu(null), [])

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    const sourceType = connection.sourceHandle?.split('-')[0]
    const targetType = connection.targetHandle?.split('-')[0]
    return sourceType === targetType
  }, [])

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
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        isValidConnection={isValidConnection}
        deleteKeyCode={['Delete', 'Backspace']}
      >
        <Background
          variant={BackgroundVariant.Lines}
          color="#e4e4e4fb"
          gap={24}
          lineWidth={1}
        />
      </ReactFlow>
      {contextMenu && (
        <ul
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            className="context-menu__item context-menu__item--danger"
            onClick={() => {
              deleteElements({ nodes: [{ id: contextMenu.nodeId }] })
              setContextMenu(null)
            }}
          >
            Elimina nodo
          </li>
        </ul>
      )}
    </>
  )
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  )
}
