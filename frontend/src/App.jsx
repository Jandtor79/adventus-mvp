import { useEffect, useState } from "react";
import { getAlerts, createEvent } from "./api";

function App() {
  const [alerts, setAlerts] = useState([]);

  async function loadAlerts() {
    const data = await getAlerts();
    setAlerts(data);
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  async function handleCreate() {
    await createEvent({
      title: "Nuevo dron detectado",
      level: "alta",
      confidence: 90,
      location: "Centro educativo",
      zone: "Tejado",
      source: ["vision"],
    });

    loadAlerts();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>ADVENTUS</h1>

      <button onClick={handleCreate}>
        Simular detección
      </button>

      <h2>Alertas</h2>

      {alerts.map((a) => (
        <div
          key={a.id}
          style={{ margin: 10, padding: 10, border: "1px solid gray" }}
        >
          <strong>{a.title}</strong>
          <div>{a.location}</div>
          <div>{a.confidence}%</div>
        </div>
      ))}
    </div>
  );
}

export default App;