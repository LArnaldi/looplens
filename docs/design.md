# LoopLens — Design Document

> Version 1.0 — 2026-03-16

---

## 1. Vision

LoopLens is a **visual node-based editor** for game designers to model, communicate, and reason about game systems.

The tool is intentionally **domain-agnostic**: it is not an economy simulator, a combat balancer, or a narrative tool — it is a general-purpose **systems thinking canvas** that can represent any game design problem. A designer should be able to use LoopLens to sketch a loot system, a dialogue tree, an NPC behavior loop, or a progression curve, using the same vocabulary of nodes.

The guiding principle: **make invisible dynamics visible**.

---

## 2. Target User

A **game designer** — junior or senior — who needs to:

- Communicate system ideas to engineers, producers, and other designers
- Reason about feedback loops, bottlenecks, and unintended consequences before writing code
- Document existing game systems in a readable, interactive format
- Iterate on balance and structure at the design level, not the implementation level

The tool does not require programming knowledge. The designer works visually.

---

## 3. Scope

### In scope
- Visual canvas for creating and connecting nodes
- Predefined node library covering all major game design domains
- Custom/blank node for edge cases not covered by the library
- Annotations and grouping for documentation and clarity
- Export of the graph as JSON for future simulation use

### Out of scope (for now)
- Real-time simulation (deferred to engine layer)
- Multiplayer / collaborative editing
- Version history / branching
- Code generation

---

## 4. Domains a Game Designer Must Be Able to Model

LoopLens must be expressive enough to cover all of these without domain-specific tooling:

| Domain | Concrete Examples |
|--------|------------------|
| Economy | Resources, crafting, markets, inflation, sinks |
| Progression | XP → Level → Unlock, skill trees, mastery |
| Combat | Damage, cooldowns, status effects, death/respawn |
| Narrative | Dialogue branches, story states, choices and consequences |
| AI / Behavior | NPC state machines, decision trees, patrol/aggro logic |
| Feedback Loops | Rubber band, catch-up mechanics, snowball effects |
| Retention / Engagement | Daily rewards, streaks, FOMO, onboarding funnels |
| Social | Co-op, competition, trading between players |
| Difficulty | Scaling systems, Dynamic Difficulty Adjustment (DDA) |
| Player Journey | Tutorial flow, aha moments, friction points |

---

## 5. Node Library

Nodes are the atomic units of a system graph. Each node has a **semantic meaning** that guides the designer's thinking. Nodes are grouped into categories, each with a distinct visual color.

### 5.1 Categories and Colors

| Category | Color | Purpose |
|----------|-------|---------|
| Data | Blue | Static values, variables, flags, states |
| Flow | Green | Movement of things through the system |
| Storage | Cyan | Accumulation and containment |
| Transform | Orange | Change and conversion |
| Logic | Yellow | Conditions, decisions, routing |
| Event | Pink | Signals and discrete occurrences |
| Time | Gray | Cadence, delay, pacing |
| Probability | Purple | Uncertainty and randomness |
| Agent | Amber | Actors with intent (player, NPC) |
| Meta | Slate | Structure, annotation, grouping |

---

### 5.2 Full Node List

#### Data
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Variable** | Any named value in the system (HP, gold, score, speed) | name, type, value, min, max |
| **Counter** | Integer that rises or falls in response to discrete events (kill count, combo, days played) | start, step, target, reset on target |
| **Flag** | Boolean — something has happened or not (quest done, tutorial seen, feature unlocked) | default, persistent |
| **State** | A discrete state node in a state machine (Idle, Combat, Dead, Stunned) | label, transitions |

#### Flow
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Source** | Introduces something into the system (spawn, regen, item drop, daily reward) | rate, amount, trigger condition |
| **Sink** | Removes or consumes something (death, purchase, decay, expiry) | trigger, amount |

#### Storage
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Pool** | Accumulates something over time (inventory, health bar, energy, reputation) | capacity, current value, overflow behavior |
| **Queue** | Ordered FIFO buffer (ability queue, event stack, NPC action list) | max size, drain rate |

#### Transform
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Converter** | Takes inputs and produces different outputs (crafting, upgrade, currency exchange) | recipe / ratio, cost |
| **Modifier** | Alters a value passing through it (buff, debuff, difficulty scalar, bonus multiplier) | operation (×, +, %, clamp), factor |
| **Formula** | Custom expression that computes an output from N inputs (damage formula, score calc) | expression string |

#### Logic
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Gate** | Blocks or allows flow based on a condition (paywall, unlock requirement, level gate) | condition, open/closed state |
| **Switch** | Routes toward one of N branches based on value or state (difficulty branch, A/B path) | cases, default branch |
| **Comparator** | Compares two values and emits a boolean signal (HP < 20%, score > threshold) | operator (<, >, =, ≠) |
| **AND / OR** | Combines boolean conditions (quest A done AND item B owned) | mode (AND / OR) |

#### Event
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Trigger** | Emits a signal when a condition becomes true (on death, on level up, on purchase) | condition, one-shot / repeat |
| **Event** | A named discrete occurrence that other nodes can listen to (PlayerDied, QuestCompleted) | name, payload |
| **Listener** | Reacts to a specific named event and activates downstream logic | event name |

#### Time
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Timer** | Emits a periodic signal (cooldown tick, regen interval, daily reset, pacing beat) | interval, repeat, auto-start |
| **Delay** | Introduces latency in a flow (animation lock, grace period, ramp-up time) | duration |

#### Probability
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Chance** | Probabilistic gate — flow passes or doesn't (crit, dodge, proc, random event) | probability % |
| **Dice** | Produces a random value in a range (damage roll, loot quality, stat variance) | min, max, distribution type |
| **Loot Table** | Selects one output from a weighted list (drop table, gacha, random reward pool) | entries with weights |

#### Agent
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Player** | The player as an actor in the system (decisions, inputs, agency) | behavior label, skill level |
| **NPC / Agent** | An AI-controlled entity with behavior (enemy, vendor, companion) | behavior type |
| **Decision** | A choice point where a player or AI selects among branches (narrative, strategic) | options, acting agent |

#### Meta
| Node | What it represents | Key Parameters |
|------|--------------------|----------------|
| **Feedback Loop** | Visual annotation marking a reinforcing (+) or balancing (−) loop | type, label |
| **Group / Frame** | Visual container grouping related nodes into a named subsystem | label, color |
| **Comment** | Free-text note on the canvas | text, color |
| **Custom** | Blank node fully configurable for cases not covered by the library | label, color, free params |

---

## 6. Minimum Viable Node Set (Phase 1)

Not all nodes will be built at once. The following 16 nodes cover ~80% of real design scenarios and form the foundation of the first release:

```
Variable, Flag, State
Source, Sink, Pool
Gate, Switch, Trigger
Timer, Chance
Player, Decision
Feedback Loop, Group, Comment, Custom
```

Remaining nodes are added in subsequent phases based on designer feedback.

---

## 7. Edge Types

Edges (connections between nodes) are not all the same. Two types exist:

| Type | What flows | Visual |
|------|-----------|--------|
| **Resource flow** | Quantities — gold, HP, XP, items | Solid line |
| **Signal / Control** | Discrete trigger or boolean — "fire this", "this is true" | Dashed line |

The system should prevent connecting a resource output to a signal input and vice versa, guiding the designer toward semantically correct graphs.

---

## 8. Canvas UX

- **Left sidebar**: Node library grouped by category, drag-and-drop onto canvas
- **Right panel**: Properties editor for the selected node (parameters, label, color override)
- **Canvas**: React Flow canvas, infinite, zoomable, pannable
- **Top bar**: Graph name, save/export actions, zoom controls

---

## 9. Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Frontend | Next.js 15 (TypeScript) | Application shell, routing |
| Graph Editor | React Flow (@xyflow/react) | Node/edge canvas, custom node types |
| Styling | Tailwind CSS | Utility-first design system |
| Icons | Lucide React | Node icons |
| State | React useState / useReducer | Canvas state, node params |
| Testing | Vitest + Testing Library | Unit and component tests |

The backend (.NET 8 simulation engine) is decoupled and not required for the frontend to function. The canvas works standalone; simulation is an optional future layer.

---

## 10. Data Model

A graph saved or exported from LoopLens has the following structure:

```ts
type NodeParam = {
  key: string
  label: string
  type: 'number' | 'string' | 'boolean' | 'select'
  value: unknown
  options?: string[] // for select type
}

type LoopLensNode = {
  id: string
  type: string           // e.g. "source", "gate", "timer"
  category: string       // e.g. "flow", "logic", "time"
  label: string
  position: { x: number; y: number }
  params: NodeParam[]
}

type LoopLensEdge = {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  edgeType: 'resource' | 'signal'
  label?: string
}

type LoopLensGraph = {
  id: string
  name: string
  nodes: LoopLensNode[]
  edges: LoopLensEdge[]
  createdAt: string
  updatedAt: string
}
```

---

## 11. Phased Roadmap

### Phase 1 — Foundation
- Blank canvas with React Flow
- Node sidebar with drag-and-drop
- 16 MVP nodes (see Section 6)
- Property panel for selected node
- Export graph as JSON

### Phase 2 — Full Node Library
- Remaining 14 nodes
- Edge type validation (resource vs signal)
- Group / Frame node with visual containment

### Phase 3 — Simulation Bridge
- Connect to .NET engine via REST API
- Run tick-based simulation on the graph
- Highlight nodes with anomalies (starvation, overflow, deadlock)

### Phase 4 — Collaboration & Export
- Save/load graphs from local storage or file
- Export as PNG / SVG
- Scenario comparison view
