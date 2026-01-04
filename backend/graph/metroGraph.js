export function buildMetroGraph(lines) {
    const graph = new Map()
    

    /// function to add all stations to the undirected graph
    function ensureStation(station) {
      if (!graph.has(station.stationId)) {
        graph.set(station.stationId, {
          stationId: station.stationId,
          name: station.name, // each station is an object containing attributes
          neighbors: [] // new attribute added for creating the graph
        });
      }
    }
  
    for (const line of lines) {
      const stations = line.stations;
  
      for (let i = 0; i < stations.length - 1; i++) {
        const current = stations[i];
        const next = stations[i + 1];
  
        ensureStation(current);
        ensureStation(next);
  
        graph.get(current.stationId).neighbors.push({
          stationId: next.stationId,
          lineId: line.lineId
        });
  
        graph.get(next.stationId).neighbors.push({
          stationId: current.stationId,
          lineId: line.lineId
        });
      }
    }
  
    return graph;
  }
  