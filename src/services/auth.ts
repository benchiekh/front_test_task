import { api } from "./config";

export async function login(identifier: string, password: string) {
 
    const res = await api.post("/auth/local", { identifier, password });
    return res.data; // jwt + user
  
}

export async function register(username: string, email: string, password: string) {
 
    const res = await api.post("/auth/local/register", { username, email, password });
    return res.data; // jwt + user
  
}
