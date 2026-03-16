using LoopLens.Core.Models;

namespace LoopLens.Core.Simulation;

public record SimulationResult(int Ticks, IReadOnlyList<IReadOnlyDictionary<string, double>> Snapshots);

public class SimulationEngine
{
    /// <summary>
    /// Runs a tick-based simulation over the provided economy graph.
    /// Each tick: Source nodes produce resources; Sink nodes consume them.
    /// </summary>
    public SimulationResult Run(EconomyGraph graph)
    {
        var state = graph.Nodes.ToDictionary(n => n.Id, _ => 0.0);
        var snapshots = new List<IReadOnlyDictionary<string, double>>();

        for (int tick = 0; tick < graph.Ticks; tick++)
        {
            Tick(graph, state);
            snapshots.Add(new Dictionary<string, double>(state));
        }

        return new SimulationResult(graph.Ticks, snapshots);
    }

    private static void Tick(EconomyGraph graph, Dictionary<string, double> state)
    {
        foreach (var node in graph.Nodes)
        {
            switch (node.Type)
            {
                case NodeType.Source:
                    state[node.Id] += node.Rate;
                    // Distribute production along outgoing edges
                    var outgoing = graph.Edges.Where(e => e.Source == node.Id).ToList();
                    if (outgoing.Count > 0)
                    {
                        double share = node.Rate / outgoing.Count;
                        foreach (var edge in outgoing)
                            state[edge.Target] += share;
                    }
                    break;

                case NodeType.Sink:
                    state[node.Id] = Math.Max(0, state[node.Id] - node.Rate);
                    break;
            }
        }
    }
}
