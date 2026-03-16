# LoopLens

> A visual node-based editor for designing, simulating, and balancing game economies.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org)
[![.NET](https://img.shields.io/badge/.NET-8-512BD4?logo=dotnet)](https://dotnet.microsoft.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Vision

Game economies are complex feedback loops: resources flow, players make decisions, and small imbalances compound into broken experiences. LoopLens gives designers a visual canvas to **model these systems as graphs**, wire up production/consumption nodes, and **run deterministic simulations** to surface balance problems before a single line of game code is written.

The goal is not to replace spreadsheets — it's to make invisible dynamics *visible*.

---

## Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Frontend | Next.js 15 (TypeScript) | UI shell, routing, state management |
| Graph Editor | React Flow | Node/edge canvas, custom node types |
| Simulation Engine | .NET 8 (C#) | Tick-based economy simulation |
| API Bridge | ASP.NET Core Minimal API | REST endpoints consumed by the frontend |
| Styling | Tailwind CSS | Utility-first design system |
| Testing (TS) | Vitest + Testing Library | Unit & component tests |
| Testing (C#) | xUnit | Engine unit tests |

---

## Project Structure

```
looplens/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── components/nodes/   # React Flow custom nodes
│   │   ├── hooks/              # Simulation state hooks
│   │   └── lib/api/            # API client (fetch wrappers)
│   └── package.json
├── engine/            # .NET 8 simulation engine
│   ├── LoopLens.Core/          # Domain models, simulation logic
│   ├── LoopLens.Api/           # ASP.NET Core Minimal API host
│   └── LoopLens.Tests/         # xUnit test project
├── docs/              # Architecture diagrams, design notes
└── .github/
    └── workflows/     # CI/CD pipelines
```

---

## Installation (Linux)

### Prerequisites

- Node.js >= 20 (`nvm` recommended)
- .NET 8 SDK — [install guide](https://learn.microsoft.com/en-us/dotnet/core/install/linux)
- Git

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/looplens.git
cd looplens
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_ENGINE_URL=http://localhost:5050
npm run dev
```

Frontend available at `http://localhost:3000`.

### 3. Simulation Engine

```bash
cd engine
dotnet restore
dotnet run --project LoopLens.Api
```

API available at `http://localhost:5050`.

### 4. Run Tests

```bash
# TypeScript
cd frontend && npm test

# C#
cd engine && dotnet test
```

---

## Roadmap

- [ ] Core node types: Source, Sink, Converter, Storage
- [ ] Tick-based simulation engine (C#)
- [ ] Real-time graph rendering via React Flow
- [ ] REST API bridge (Next.js ↔ .NET)
- [ ] Export simulation results as CSV/JSON
- [ ] Scenario comparison view

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full history.

---

## License

MIT © [Your Name]
