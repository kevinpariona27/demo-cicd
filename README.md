# demo-cicd

API de demostración para la exposición de CI/CD — Arquitectura de Software (UNSCH).

**Guía completa paso a paso:** [docs/GUIA_DEMO.md](docs/GUIA_DEMO.md)

## Contenido

| Archivo | Qué hace |
| --- | --- |
| `src/app.js`, `src/server.js` | API Express con `/` (página con la versión) y `/health` |
| `test/app.test.js` | Pruebas unitarias (quality gate) |
| `Dockerfile` | Imagen multi-stage sobre `node:24-alpine` |
| `.github/workflows/ci-cd.yml` | Pipeline: test → build + Trivy + GHCR → deploy en Render + health check |
| `scripts/cambiar-version.sh` | Escenario 1: cambia la versión y abre el pull request |
| `scripts/preparar-error.sh` | Escenario 2: abre un pull request con un error a propósito |
| `scripts/dora.sh` | Calcula las 4 métricas DORA del historial del pipeline |

## Configuración necesaria en GitHub

- Entorno `production` con el secreto `RENDER_DEPLOY_HOOK` (y revisores opcionales).
- Variable `APP_URL` con la URL pública de Render, sin `/` final.
- Protección de `main`: pull request obligatorio y check `test` requerido.

## Probar en local (opcional)

```bash
npm install
npm test
npm start          # http://localhost:3000 y http://localhost:3000/health
```

## Preparación en Windows

Use Git Bash desde esta carpeta. Git, GitHub CLI, jq, Node.js y npm ya están disponibles en el equipo preparado; no se requiere instalar WSL ni Docker para operar la demo.

```bash
npm ci
npm test
bash scripts/cambiar-version.sh 1.1.0
bash scripts/dora.sh 30
```

El cambio de versión usa `npm version`, por lo que ese script sí requiere Node.js y npm locales. Los scripts de cambio y error publican ramas y crean pull requests; no son comprobaciones locales. No fusione `error-demo` ni ejecute su preparación sobre trabajo sin guardar.

La imagen de producción usa Node 24, actualiza los paquetes de Alpine y no incluye npm ni Yarn en la etapa final. El pipeline comprueba /health de la imagen antes del escaneo de seguridad; no se desactiva el bloqueo de vulnerabilidades altas o críticas.
