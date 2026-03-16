using LoopLens.Core.Models;
using LoopLens.Core.Simulation;

namespace LoopLens.Tests;

public class SimulationEngineTests
{
    private readonly SimulationEngine _engine = new();

    [Fact]
    public void Source_AccumulatesResourceEachTick()
    {
        var graph = new EconomyGraph(
            Nodes: [new EconomyNode("src", NodeType.Source, Rate: 10)],
            Edges: [],
            Ticks: 3
        );

        var result = _engine.Run(graph);

        Assert.Equal(3, result.Snapshots.Count);
        Assert.Equal(10,  result.Snapshots[0]["src"]);
        Assert.Equal(20,  result.Snapshots[1]["src"]);
        Assert.Equal(30,  result.Snapshots[2]["src"]);
    }

    [Fact]
    public void Source_FlowsIntoConnectedSink()
    {
        var graph = new EconomyGraph(
            Nodes:
            [
                new EconomyNode("src",  NodeType.Source, Rate: 20),
                new EconomyNode("sink", NodeType.Sink,   Rate: 0),
            ],
            Edges: [new EconomyEdge("src", "sink")],
            Ticks: 1
        );

        var result = _engine.Run(graph);
        var snapshot = result.Snapshots[0];

        // Sink receives the full production of Source
        Assert.Equal(20, snapshot["sink"]);
    }

    [Fact]
    public void Sink_DoesNotGoBelowZero()
    {
        var graph = new EconomyGraph(
            Nodes: [new EconomyNode("sink", NodeType.Sink, Rate: 100)],
            Edges: [],
            Ticks: 1
        );

        var result = _engine.Run(graph);

        Assert.Equal(0, result.Snapshots[0]["sink"]);
    }
}
