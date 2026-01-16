export function buildMetroGraph(lines) {
  const graph = new Map();

  function ensureStation(station) {
    if (!graph.has(station.stationId)) {
      graph.set(station.stationId, {
        stationId: station.stationId,
        name: station.name,
        neighbors: []
      });
    }
  }

  function addNeighbor(fromId, toId, lineId) {
    const node = graph.get(fromId);
    const exists = node.neighbors.some(
      (n) => n.stationId === toId && n.lineId === lineId
    );

    if (!exists) {
      node.neighbors.push({ stationId: toId, lineId });
    }
  }

  for (const line of lines) {
    const stations = line.stations;

    for (let i = 0; i < stations.length - 1; i++) {
      const current = stations[i];
      const next = stations[i + 1];

      ensureStation(current);
      ensureStation(next);

      addNeighbor(current.stationId, next.stationId, line.lineId);
      addNeighbor(next.stationId, current.stationId, line.lineId);
    }
  }

  return graph;
}
