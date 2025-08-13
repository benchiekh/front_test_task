"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await login(identifier, password);
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      alert("Connexion réussie ✅");
      router.push("/tasks");
    } else {
      alert(data.error?.message || "Erreur de connexion ❌");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Connexion</h2>
        <input
          className="form-control mb-3"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email ou nom d'utilisateur"
        />
        <input
          className="form-control mb-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Se connecter
        </button>
      </div>
    </div>
  );
}
