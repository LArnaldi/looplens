namespace LoopLens.Core.Models;

public enum NodeType { Source, Sink, Converter, Storage }

public record EconomyNode(string Id, NodeType Type, double Rate);

public record EconomyEdge(string Source, string Target);

public record EconomyGraph(
    IReadOnlyList<EconomyNode> Nodes,
    IReadOnlyList<EconomyEdge> Edges,
    int Ticks
);
