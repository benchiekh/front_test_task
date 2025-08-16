import { api } from "./config";

// Login
export async function login(identifier: string, password: string) {
   
    const res = await api.post("/api/auth/local", { identifier, password });
    return res.data; // { jwt, user }
  
}

// Register
export async function register(username: string, email: string, password: string) {
  
    const res = await api.post("/api/auth/local/register", { username, email, password });
    return res.data; // { jwt, user }
 
}
