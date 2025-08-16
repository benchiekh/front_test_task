// src/app/page.tsx
"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.module.css';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="landing-hero d-flex flex-column align-items-center justify-content-center">
      <div className="text-section text-center">
        <h1 className="display-3 fw-bold mb-3">
          Bienvenue sur <span className="text-primary">TodoApp For Tek&Me</span>
        </h1>
        <p className="lead mb-4">
          Gérez vos tâches efficacement, organisez votre quotidien et boostez votre productivité.
        </p>

        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-4">
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => router.push('/login')}
          >
            Se connecter
          </button>
          <button 
            className="btn btn-outline-primary btn-lg"
            onClick={() => router.push('/register')}
          >
            S inscrire
          </button>
        </div>

        <small className="text-muted">
          Commencez dès maintenant et ne perdez plus jamais vos idées !
        </small>
      </div>
    </div>
  );
}
