'use client'

import { useCallback, useState } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  Panel,
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
import ResourceEdge from './ResourceEdge'
import SignalEdge from './SignalEdge'
import { findNodeDefinition } from '@/lib/nodes'
import type { NodeCardProps } from './NodeCard'

type NodeCardNode = Node<NodeCardProps>

const nodeTypes = { nodeCard: NodeCardFlow }
const edgeTypes = { resource: ResourceEdge, signal: SignalEdge }

function CanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeCardNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [contextMenu, setContextMenu] = useState<{ nodeId: string; x: number; y: number } | null>(null)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const { screenToFlowPosition, deleteElements } = useReactFlow()

  const onConnect = useCallback(
    (connection: Connection) => {
      const edgeType = connection.sourceHandle?.startsWith('resource') ? 'resource' : 'signal'
      setEdges((prev) => addEdge({ ...connection, type: edgeType }, prev))
    },
    [setEdges]
  )

  const onNodeContextMenu = useCallback<NodeMouseHandler>((event, node) => {
    event.preventDefault()
    setContextMenu({ nodeId: node.id, x: event.clientX, y: event.clientY })
  }, [])

  const onPaneClick = useCallback(() => {
    setContextMenu(null)
    setShortcutsOpen(false)
  }, [])

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
        edgeTypes={edgeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        isValidConnection={isValidConnection}
        deleteKeyCode={['Delete', 'Backspace']}
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Background
          variant={BackgroundVariant.Lines}
          color="#e4e4e4fb"
          gap={24}
          lineWidth={1}
        />
        <MiniMap zoomable pannable />
        <Controls />
        <Panel position="top-right">
          <button
            className="canvas-help-btn"
            onClick={() => setShortcutsOpen((v) => !v)}
            aria-label="Keyboard shortcuts"
          >
            ?
          </button>
          {shortcutsOpen && (
            <div className="canvas-shortcuts-popover">
              <p className="canvas-shortcuts-title">Keyboard shortcuts</p>
              <ul className="canvas-shortcuts-list">
                <li><span className="canvas-shortcuts-key">Del / Backspace</span> elimina nodo selezionato</li>
                <li><span className="canvas-shortcuts-key">Ctrl + Scroll</span> zoom</li>
                <li><span className="canvas-shortcuts-key">Right-click</span> menu contestuale</li>
                <li><span className="canvas-shortcuts-key">Drag from sidebar</span> aggiungi nodo</li>
              </ul>
            </div>
          )}
        </Panel>
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
