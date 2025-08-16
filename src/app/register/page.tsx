"use client";
import { useState } from "react";
import { register } from "@/services/auth";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await register(username, email, password);
    console.log("📥 Register API response:", data);

    if (data.jwt) {
      toast.success("✅ Compte créé avec succès, connectez-vous !", {
        autoClose: 1000,  
      });
      setTimeout(() => router.push("/login"), 1000);
    } else {
      console.error("❌ Register error:", data.error);
      toast.error(data.error?.message || "❌ Erreur lors de l'inscription", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success w-100">S inscrire</button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
}
