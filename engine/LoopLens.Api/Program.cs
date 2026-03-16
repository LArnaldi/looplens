using LoopLens.Core.Models;
using LoopLens.Core.Simulation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<SimulationEngine>();
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors();

// ── Health ───────────────────────────────────────────────────────────────────
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// ── Simulate ─────────────────────────────────────────────────────────────────
app.MapPost("/simulate", (SimulationRequestDto request, SimulationEngine engine) =>
{
    var graph = new EconomyGraph(
        Nodes: request.Nodes.Select(n => new EconomyNode(n.Id, Enum.Parse<NodeType>(n.Type, true), n.Rate)).ToList(),
        Edges: request.Edges.Select(e => new EconomyEdge(e.Source, e.Target)).ToList(),
        Ticks: request.Ticks
    );

    var result = engine.Run(graph);
    return Results.Ok(result);
});

app.Run();

// ── DTOs ─────────────────────────────────────────────────────────────────────
record SimulationRequestDto(
    List<NodeDto> Nodes,
    List<EdgeDto> Edges,
    int Ticks
);

record NodeDto(string Id, string Type, double Rate);
record EdgeDto(string Source, string Target);
