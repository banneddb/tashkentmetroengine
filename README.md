# 🚇 Tashkent Metro Routing Engine

A **backend-driven metro routing engine** that models the Tashkent Metro system as a graph and computes routes between stations using graph traversal algorithms (specifically BFS).

This project focuses on **systems thinking, algorithms, and backend architecture**. It is designed to demonstrate how real-world transit systems can be modeled, queried, and exposed via clean APIs.

> **Project Status:** In progress
> * MySQL schema and Node.js async queries designed and hosted 
> * Core routing logic implemented using **BFS**
> * Transfer weighting and time-based optimization planned
> * Frontend visualization planned

---

## Project Goals

* Model a real metro system as a **graph** (stations + connections)
* Implement **route-finding algorithms** (starting with BFS)
* Design a **scalable backend API** that can support a frontend
* Practice clean backend architecture using real data constraints
* Showcase algorithmic thinking beyond CRUD applications

---

## High-Level System Design

The system is intentionally split into **three layers**:

1. **Database Layer** – stores metro topology
2. **Backend Layer** – routing engine + API
3. **Frontend Layer (planned)** – user interaction & visualization

### 🔄 Data & Control Flow

```text
+-------------+        HTTP Request        +------------------+
|  Frontend   |  ---------------------->   |   Express API    |
| (Planned)   |                            |  (Node.js)       |
+-------------+                            +---------+--------+
                                                          |
                                                          | Query
                                                          v
                                              +-----------+-----------+
                                              |        MySQL DB       |
                                              |  Stations / Lines /   |
                                              |     Connections       |
                                              +-----------+-----------+
                                                          |
                                                          | Graph Build
                                                          v
                                              +-----------+-----------+
                                              |   Routing Engine      |
                                              |   (BFS Algorithm)     |
                                              +-----------+-----------+
                                                          |
                                                          | Route Result
                                                          v
+-------------+        JSON Response       +------------------+
|  Frontend   |  <----------------------   |   Express API    |
| (Planned)   |                            |                  |
+-------------+                            +------------------+
```

---

## Database Design (MySQL)
* **Stations** → nodes in the graph
* **Connections** → edges between stations
* **Lines** → metadata used for future transfer logic

### Example Tables

```sql
Stations(id, name, line)
Connections(station_a, station_b)
```

This schema allows the backend to build an **adjacency list** for graph traversal dynamically.

---

**Stack:**
* React.js (planned)
* Node.js
* Express
* SQL
* MySQL

