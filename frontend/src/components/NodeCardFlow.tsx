import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'
import NodeCard, { type NodeCardProps } from './NodeCard'

type NodeCardNode = Node<NodeCardProps>

export default function NodeCardFlow({ id, data }: NodeProps<NodeCardNode>) {
  const { deleteElements } = useReactFlow()

  return (
    <div className="node-card-wrapper">
      <Handle type="target" position={Position.Left} id="resource-in" className="handle--resource" style={{ top: '35%' }} />
      <Handle type="target" position={Position.Left} id="signal-in"   className="handle--signal"   style={{ top: '65%' }} />
      <NodeCard {...data} />
      <Handle type="source" position={Position.Right} id="resource-out" className="handle--resource" style={{ top: '35%' }} />
      <Handle type="source" position={Position.Right} id="signal-out"   className="handle--signal"   style={{ top: '65%' }} />
      <button
        className="node-card-delete"
        onClick={() => deleteElements({ nodes: [{ id }] })}
        title="Elimina nodo"
      >
        ×
      </button>
    </div>
  )
}
