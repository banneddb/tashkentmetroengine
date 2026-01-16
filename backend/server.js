import express from "express";
import cors from "cors";

import { getAllLinesWithStations, getStationsOnLine } from "./database/metroData.js";
import { buildMetroGraph } from "./graph/metroGraph.js";
import { findRouteBFS } from "./graph/BFS.js";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

let graph = null;
let linesCache = null;

// Build graph once at startup 
async function refreshTopology() {
  linesCache = await getAllLinesWithStations();
  graph = buildMetroGraph(linesCache);
  console.log(`Topology loaded: ${graph.size} stations`);
}

await refreshTopology();

// ---- Endpoints ----

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Get all lines with stations (grouped)
app.get("/lines", async (req, res) => {
  try {
    // Use cache for speed; refresh later if you want
    res.json(linesCache);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lines" });
  }
});

// Get ordered stations on a specific line
app.get("/lines/:lineId/stations", async (req, res) => {
  try {
    const lineId = Number(req.params.lineId);
    if (!Number.isInteger(lineId)) {
      return res.status(400).json({ error: "lineId must be an integer" });
    }

    const stations = await getStationsOnLine(lineId);
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stations for line" });
  }
});

// Route endpoint (fewest stops)
app.get("/route", (req, res) => {
  try {
    const from = Number(req.query.from);
    const to = Number(req.query.to);

    if (!Number.isInteger(from) || !Number.isInteger(to)) {
      return res
        .status(400)
        .json({ error: "Query params 'from' and 'to' must be integers" });
    }

    const result = findRouteBFS(graph, from, to);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to compute route" });
  }
});

// Optional: manual refresh if DB changes
app.post("/refresh", async (req, res) => {
  try {
    await refreshTopology();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to refresh topology" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
