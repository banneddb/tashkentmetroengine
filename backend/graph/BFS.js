// Finding the shortest path to a person destination (fewest stops)

// takes in the graph of the stations, the current station and the final destination.
export function findRouteBFS(graph, startStationID, destinationStationID) {

    // no stops (current station = destination)
    if (startStationID == destinationStationID) {
        return {path: [startStationID], stops: 0 };
    }

    // invalid station
    if (!graph.has(startStationID) || !graph.has(destinationStationID)) {
        return {path: [], stops: -1}
    }

    // BFS queue and log all visitedStations
    const queue = [startStationID];
    const visitedStations = new Set([startStationID]);

    // to traverse the graph
    const parent = new Map();
    const parentLine = new Map();

    while (queue.length > 0) {
        const currentStation = queue.shift();

        const node = graph.get(currentStation);

        for (const neighbors of node.neighbors) {
                const nextId = neighbors.stationId;

                if (visitedStations.has(nextId)) continue;

                visitedStations.add(nextId);
                parent.set(nextId, currentStation);
                parentLine.set(nextId, neighbors.lineId);
          
                // Found destination → reconstruct path
                if (nextId === destinationStationID) {
                  const path = [];
                  let cur = destinationStationID;
          
                  while (cur !== undefined) {
                    path.push(cur);
                    cur = parent.get(cur);
                  }
                  const stepLineIds = [];

                  
                  for (let i = 1; i < path.length; i++) {
                  const toId = path[i];
                  stepLineIds.push(parentLine.get(toId));
                  }

                  path.reverse();
                  
                  return {
                    stationPathIds: path,
                    stepLineIds,
                    stops: path.length-1
                  }
                  
                }
          
                queue.push(nextId);
              }
            }
          
            // 3) No route found
            return { path: [], stops: -1 };
          }