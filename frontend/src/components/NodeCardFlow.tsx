import { type Node, type NodeProps } from '@xyflow/react'
import NodeCard, { type NodeCardProps } from './NodeCard'

type NodeCardNode = Node<NodeCardProps>

export default function NodeCardFlow({ data }: NodeProps<NodeCardNode>) {
  return <NodeCard {...data} />
}
