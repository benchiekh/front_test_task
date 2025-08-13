"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerUser } from "@/services/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert("Veuillez remplir tous les champs ❌");
      return;
    }

    const data = await registerUser(username, email, password);
    if (data.jwt) {
      alert("Inscription réussie ✅");
      router.push("/login"); // redirection vers login
    } else {
      alert(data.error?.message || "Erreur lors de l'inscription ❌");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Créer un compte</h2>
        <input
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
        />
        <input
          className="form-control mb-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresse email"
        />
        <input
          className="form-control mb-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
        <button className="btn btn-success w-100" onClick={handleRegister}>
          S'inscrire
        </button>
      </div>
    </div>
  );
}
