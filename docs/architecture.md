# Architecture Overview

## Data Flow

```
Browser (React Flow canvas)
    │
    │  JSON graph payload
    ▼
Next.js API route  ──► /api/engine/simulate  (rewrite proxy)
                                │
                                │  POST /simulate
                                ▼
                   .NET 8 Minimal API (port 5050)
                                │
                                ▼
                   SimulationEngine.Run(EconomyGraph)
                                │
                                ▼
                   SimulationResult (tick snapshots)
                                │
                   ◄────────────┘
Browser renders chart / highlights imbalanced nodes
```

## Core Concepts

| Concept | Description |
|---------|-------------|
| **Node** | A participant in the economy (Source, Sink, Converter, Storage) |
| **Edge** | A resource flow channel between two nodes |
| **Tick** | One discrete time step in the simulation |
| **Snapshot** | The resource state of all nodes at the end of a tick |
| **Rate** | Resources produced (+) or consumed (-) per tick |

## Node Types

- **Source** — generates resources each tick (e.g. Gold Mine, XP reward)
- **Sink** — consumes resources (e.g. Shop purchase, crafting cost)
- **Converter** — transforms resource A into resource B at a ratio *(planned)*
- **Storage** — buffers resources with a capacity cap *(planned)*
