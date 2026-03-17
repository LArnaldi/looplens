import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import NodeCard, { type NodeCardProps } from './NodeCard'

type NodeCardNode = Node<NodeCardProps>

export default function NodeCardFlow({ data }: NodeProps<NodeCardNode>) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <NodeCard {...data} />
      <Handle type="source" position={Position.Right} />
    </>
  )
}
