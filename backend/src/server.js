import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let alerts = [
  {
    id: "al_001",
    title: "Posible dron detectado",
    level: "alta",
    confidence: 86,
    location: "IES Málaga Norte",
    zone: "Cubierta este",
    source: ["audio", "vision"],
    status: "activa",
    createdAt: new Date().toISOString(),
  },
];

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "adventus-api" });
});

app.get("/api/alerts", (_req, res) => {
  res.json(alerts);
});

app.post("/api/events", (req, res) => {
  const { title, level, confidence, location, zone, source } = req.body;

  if (!title || !level || confidence == null || !location) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newAlert = {
    id: `al_${Date.now()}`,
    title,
    level,
    confidence,
    location,
    zone: zone || "Sin zona",
    source: Array.isArray(source) ? source : [],
    status: "activa",
    createdAt: new Date().toISOString(),
  };

  alerts.unshift(newAlert);
  res.status(201).json(newAlert);
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`ADVENTUS API escuchando en puerto ${port}`);
});