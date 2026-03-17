import { BaseEdge, getStraightPath, type EdgeProps } from '@xyflow/react'

export default function ResourceEdge({
  id, sourceX, sourceY, targetX, targetY, markerEnd,
}: EdgeProps) {
  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY })
  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd={markerEnd}
      style={{ stroke: '#f97316', strokeWidth: 2 }}
    />
  )
}
