import { API_URL } from "./config";

export async function getTasks(token: string) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function createTask(token: string, title: string) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ data: { title } }),
  });
  return res.json();
}
