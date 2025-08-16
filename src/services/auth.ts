import { api } from "./config";

export async function login(identifier: string, password: string) {
  try {
    const res = await api.post("/auth/local", { identifier, password });
    return res.data; // jwt + user
  } catch (err: any) {
    console.error("❌ Login error:", err.response?.data || err.message);
    return { error: err.response?.data };
  }
}

export async function register(username: string, email: string, password: string) {
  try {
    const res = await api.post("/auth/local/register", { username, email, password });
    return res.data; // jwt + user
  } catch (err: any) {
    console.error("❌ Register error:", err.response?.data || err.message);
    return { error: err.response?.data };
  }
}
