"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = await login(identifier, password);
    console.log("📥 Login API response:", data);

    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      console.log("✅ Token enregistré:", localStorage.getItem("token"));

      toast.success("Connexion réussie ✅", { autoClose: 1000 });
      setTimeout(() => router.push("/tasks"), 1000);
    } else {
      console.error("❌ Login error:", data.error);
      toast.error(data.error?.message || "Erreur de connexion ❌", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ width: "350px", borderRadius: "15px", backgroundColor: "#ffffff" }}
      >
        <h3 className="text-center mb-4 text-primary">Connexion</h3>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email ou nom d'utilisateur"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
          Se connecter
        </button>

        <small className="text-muted d-block text-center">
          Pas encore de compte ?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/register")}
          >
            Inscrivez-vous
          </span>
        </small>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
