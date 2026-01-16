import { getAllLinesWithStations } from "../database/metroData.js";
import { buildMetroGraph } from "./metroGraph.js";
import { findRouteBFS } from "./BFS.js";

const lines = await getAllLinesWithStations();
const graph = buildMetroGraph(lines);

// Pick two station IDs that exist in your DB:
const startId = lines[0]?.stations[0]?.stationId;
const endId = lines[0]?.stations[lines[0].stations.length - 1]?.stationId;

const result = findRouteBFS(graph, startId, endId);
console.log(JSON.stringify({ startId, endId, result }, null, 2));
