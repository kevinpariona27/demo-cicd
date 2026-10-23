const express = require('express');
const { version } = require('../package.json');

const app = express();

// Página principal: interfaz moderna para la demo del Sistema de Asistencia QR (UNSCH)
app.get('/', (req, res) => {
  const commitSha = process.env.GIT_SHA || 'ccf6fca';
  const shortSha = commitSha.slice(0, 7);
  const porcentaje = porcentajeAsistencia(18, 20);

  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Asistencia QR · UNSCH</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #4f46e5;
      --bg-gradient: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 100%);
      --card-bg: rgba(30, 41, 59, 0.7);
      --card-border: rgba(255, 255, 255, 0.08);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background: #090d16;
      background-image: var(--bg-gradient);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 2.5rem 1rem;
    }
    .container {
      width: 100%;
      max-width: 840px;
      margin: 0 auto;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--card-border);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }
    .brand-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      box-shadow: 0 0 25px rgba(99, 102, 241, 0.45);
    }
    .brand-text h2 {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .brand-text p {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .badge-live {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #34d399;
      padding: 0.4rem 0.95rem;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 600;
    }
    .badge-live::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10b981;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
    .card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, #6366f1, #ec4899, #10b981);
    }
    .hero {
      text-align: center;
      margin-bottom: 2rem;
    }
    .hero-version {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25));
      border: 1px solid rgba(168, 85, 247, 0.5);
      color: #d8b4fe;
      padding: 0.45rem 1.4rem;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.25);
    }
    .hero h1 {
      font-size: 2.35rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 0.75rem;
      background: linear-gradient(to right, #ffffff, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 540px;
      margin: 0 auto;
      line-height: 1.5;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    @media (max-width: 680px) {
      .grid { grid-template-columns: 1fr; }
      .card { padding: 1.5rem; }
      header { flex-direction: column; gap: 1rem; align-items: flex-start; }
    }
    .qr-box {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid var(--card-border);
      border-radius: 18px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .qr-svg {
      width: 145px;
      height: 145px;
      background: #ffffff;
      padding: 10px;
      border-radius: 14px;
      margin-bottom: 1rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }
    .qr-label {
      font-size: 0.85rem;
      color: #94a3b8;
    }
    .qr-label strong {
      color: #f8fafc;
      display: block;
      margin-top: 0.25rem;
      font-family: monospace;
      font-size: 0.95rem;
    }
    .stats-col {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .stat-card {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 1.1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .stat-info span {
      display: block;
      font-size: 0.78rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .stat-info strong {
      font-size: 1.4rem;
      font-weight: 700;
      color: #f8fafc;
    }
    .stat-icon {
      font-size: 1.5rem;
      background: rgba(255, 255, 255, 0.05);
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    footer {
      margin-top: 2.5rem;
      text-align: center;
      color: #64748b;
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    footer a {
      color: #818cf8;
      text-decoration: none;
      transition: color 0.2s;
    }
    footer a:hover {
      color: #a5b4fc;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">
        <div class="brand-icon">🎓</div>
        <div class="brand-text">
          <h2>UNSCH · Ingeniería de Sistemas</h2>
          <p>Arquitectura de Software — Demostración CI/CD</p>
        </div>
      </div>
      <div class="badge-live">Producción Activa</div>
    </header>

    <main class="card">
      <div class="hero">
        <div class="hero-version">
          <span>🚀 Versión ${version}</span>
        </div>
        <h1>Sistema de Asistencia QR</h1>
        <p>Control de asistencia en tiempo real con validación biométrica, integración continua y despliegue automatizado.</p>
      </div>

      <div class="grid">
        <div class="qr-box">
          <svg class="qr-svg" viewBox="0 0 100 100">
            <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
            <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
            <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
            <rect x="18" y="18" width="9" height="9" fill="#0f172a" />
            <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
            <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
            <rect x="73" y="18" width="9" height="9" fill="#0f172a" />
            <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
            <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
            <rect x="18" y="73" width="9" height="9" fill="#0f172a" />
            <rect x="45" y="15" width="10" height="10" fill="#0f172a" />
            <rect x="42" y="32" width="16" height="8" fill="#0f172a" />
            <rect x="45" y="45" width="12" height="12" fill="#0f172a" />
            <rect x="65" y="45" width="8" height="15" fill="#0f172a" />
            <rect x="42" y="65" width="14" height="20" fill="#0f172a" />
            <rect x="65" y="68" width="22" height="8" fill="#0f172a" />
            <rect x="75" y="80" width="12" height="10" fill="#0f172a" />
          </svg>
          <div class="qr-label">
            <span>Escaneo Dinámico de Aula</span>
            <strong>TOKEN: ${shortSha}</strong>
          </div>
        </div>

        <div class="stats-col">
          <div class="stat-card">
            <div class="stat-info">
              <span>Porcentaje de Asistencia</span>
              <strong>${porcentaje}%</strong>
            </div>
            <div class="stat-icon">📈</div>
          </div>

          <div class="stat-card">
            <div class="stat-info">
              <span>Quality Gate & Seguridad</span>
              <strong>100% Passed (Vitest + Trivy)</strong>
            </div>
            <div class="stat-icon">🛡️</div>
          </div>

          <div class="stat-card">
            <div class="stat-info">
              <span>Artefacto Contenedor</span>
              <strong>GHCR · Inmutable</strong>
            </div>
            <div class="stat-icon">📦</div>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <p>Pipeline: <strong>Vitest</strong> ➔ <strong>Trivy Scan</strong> ➔ <strong>GHCR</strong> ➔ <strong>Render Zero-Downtime</strong></p>
      <p>Observabilidad: <a href="/health">/health (JSON Status)</a> · Commit: <code>${commitSha}</code></p>
    </footer>
  </div>
</body>
</html>`);
});

// Health check: lo usa el pipeline (y Render) para saber si la versión nueva está sana
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version,
    commit: process.env.GIT_SHA || 'local',
  });
});

// Función de negocio con pruebas unitarias (la que se rompe en el escenario 2)
function porcentajeAsistencia(presentes, total) {
  if (total <= 0) return 0;
  return Math.round((presentes / total) * 10);
}

module.exports = { app, porcentajeAsistencia };
