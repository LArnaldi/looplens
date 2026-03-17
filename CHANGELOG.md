# Changelog

All notable changes to LoopLens are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/)

---

## [Unreleased]

## [0.3.0] — 2026-03-17

### Added
- `ResourceEdge` custom edge: solid orange (`#f97316`, 2px) for resource connections
- `SignalEdge` custom edge: dashed blue (`#3b82f6`, 2px, `6 3` dash pattern) for signal/control connections
- Automatic edge type assignment on connect: reads `sourceHandle` prefix to pick `resource` or `signal` type
- Connection validation: only same-type handles can be connected (resource↔resource, signal↔signal)
- MiniMap (zoomable, pannable) and Controls panel on canvas
- Snap-to-grid (16×16) for node placement
- Keyboard shortcuts popover (? button, top-right panel)
- Node deletion via Delete/Backspace key, context menu (right-click), and ✕ button on hover

### Changed
- Canvas now registers `edgeTypes` for resource and signal connections

## [0.2.0] — 2026-03-17

### Added
- Infinite canvas with React Flow and subtle grid background
- Node sidebar with 9 nodes across 7 categories (Data, Flow, Storage, Logic, Event, Time, Meta), collapsible per category
- Toggle button to show/hide the sidebar
- Generic `NodeCard` component (icon, label, category color accent)
- Drag-and-drop from sidebar to canvas: drops a `NodeCard` populated with the correct node data
- `src/lib/nodes.ts` as single source of truth for node and category definitions
- GitHub Actions CI for frontend (lint → test → build) and engine; release workflow on tag push
- Vitest setup with jsdom, ESLint flat config

## [0.1.0] — 2026-03-16

### Added
- Initial project scaffold (Next.js 15 + .NET 8)
- Design document: node library, domains, data model, 4-phase roadmap
- 30 node types defined across 10 categories
- Repository structure and README
