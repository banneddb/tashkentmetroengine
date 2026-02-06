export function buildSegments(graph, stationPathIds, stepLineIds) {
    if (!stationPathIds || stationPathIds.length === 0) {
      return { transfers: -1, segments: [] };
    }
  
    if (stationPathIds.length === 1) {
      const id = stationPathIds[0];
      return {
        transfers: 0,
        segments: [{
          lineId: null,
          stations: [{ stationId: id, name: graph.get(id)?.name }]
        }]
      };
    }
  
    const segments = [];
    let currentLine = stepLineIds[0];
  
    // start current segment with the first station
    let currentStations = [{
      stationId: stationPathIds[0],
      name: graph.get(stationPathIds[0])?.name
    }];
  
    for (let i = 1; i < stationPathIds.length; i++) {
      const stationId = stationPathIds[i];
      const lineUsed = stepLineIds[i - 1];
  
      // line change => close previous segment and start new
      if (lineUsed !== currentLine) {
        segments.push({
            lineId: currentLine ?? null,
            stations: currentStations
          });
          
  
        currentLine = lineUsed;
  
        // new segment starts at the transfer station (previous station)
        const prevId = stationPathIds[i - 1];
        currentStations = [{
          stationId: prevId,
          name: graph.get(prevId)?.name
        }];
      }
  
      currentStations.push({
        stationId,
        name: graph.get(stationId)?.name
      });
    }
  
    segments.push({
        lineId: currentLine ?? null,
        stations: currentStations
      });
      
  
    return {
      transfers: Math.max(0, segments.length - 1),
      segments
    };
  }
  