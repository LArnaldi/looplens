import { BaseEdge, getStraightPath, type EdgeProps } from '@xyflow/react'

export default function SignalEdge({
  id, sourceX, sourceY, targetX, targetY, markerEnd,
}: EdgeProps) {
  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY })
  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd={markerEnd}
      style={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '6 3' }}
    />
  )
}
