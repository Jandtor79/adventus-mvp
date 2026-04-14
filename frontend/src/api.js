const API_URL = "http://localhost:3000";

export async function getAlerts() {
  const res = await fetch(`${API_URL}/api/alerts`);
  return res.json();
}

export async function createEvent(data) {
  const res = await fetch(`${API_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}