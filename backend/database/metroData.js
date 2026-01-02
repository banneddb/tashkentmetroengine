import pool from './pool.js';

async function getStationsOnLine(lineId) {
  const sql = `
    SELECT
      sil.station_pos_in_line AS position,
      s.station_id AS stationId,
      s.station_name AS name
    FROM stations_in_line sil
    JOIN station s ON s.station_id = sil.station_id
    WHERE sil.line_id = ?
    ORDER BY sil.station_pos_in_line;
  `;

  const [rows] = await pool.query(sql, [lineId]);
  return rows;
}

export async function getAllLinesWithStations() {
    const sql = `
      SELECT
        l.line_id AS lineId,
        l.line_name AS lineName,
        sil.station_pos_in_line AS position,
        s.station_id AS stationId,
        s.station_name AS name
      FROM line l
      JOIN stations_in_line sil ON sil.line_id = l.line_id
      JOIN station s ON s.station_id = sil.station_id
      ORDER BY l.line_id, sil.station_pos_in_line;
    `;
  
    const [rows] = await pool.query(sql);
    const linesMap = new Map();
  
    for (const row of rows) {
      if (!linesMap.has(row.lineId)) {
        linesMap.set(row.lineId, {
          lineId: row.lineId,
          lineName: row.lineName,
          stations: []
        });
      }
  
      linesMap.get(row.lineId).stations.push({
        stationId: row.stationId,
        name: row.name,
        position: row.position
      });
    }
  
    return Array.from(linesMap.values());
  }
  

export { getStationsOnLine };