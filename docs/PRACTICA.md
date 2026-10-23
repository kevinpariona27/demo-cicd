# Práctica de CI/CD preparada

Repositorio: https://github.com/kevinpariona27/demo-cicd
Aplicación: https://demo-cicd-tkm1.onrender.com
Estado y commit: https://demo-cicd-tkm1.onrender.com/health

## Antes de comenzar

1. Abrir la aplicación para despertar la instancia gratuita.
2. Confirmar que /health responde healthy y versión 1.1.0 después del ensayo.
3. Abrir GitHub Pull requests, Actions y Render Deploys/Events.
4. Mantener abierto el PR error-demo. Es intencional y nunca debe fusionarse.

## Camino correcto: 1.1.0 a 1.2.0

El PR de version-1-2-0 se deja abierto y con test aprobado para la presentación.
Desde Git Bash:

```bash
cd /c/Users/kevin/Documents/demo-cicd
gh pr checks version-1-2-0
gh pr merge version-1-2-0 --merge
```

En Actions, abrir la nueva ejecución de main. Mostrar test, build, comprobación de la imagen, Trivy y publicación. Cuando deploy espere, usar Review deployments, seleccionar production y Approve and deploy. La aprobación manual demuestra entrega continua; no se deshabilitó esta protección.

Esperar deploy en verde y verificar /health: healthy, versión 1.2.0 y el commit de esa ejecución. No reutilizar una ejecución antigua para el cambio de versión.

## Quality gate

Abrir el PR error-demo y mostrar la prueba fallida: el porcentaje devuelve 9 en lugar de 90. El check test requerido impide la fusión normal. No usar Merge anyway, bypass administrativo ni fusionar este PR.

## Health check y rollback

Mostrar /health y su commit. En Render, mostrar el historial de despliegues y la opción Rollback si está disponible. No ejecutarlo durante la preparación: se conserva la versión ensayada.

## Métricas y respaldo

```bash
bash scripts/dora.sh 30
```

Las métricas son aproximaciones calculadas desde ejecuciones del workflow, no mediciones completas de incidentes ni del tiempo desde el primer commit. Los fallos de preparación afectan la muestra y deben explicarse.

Antes de exponer, realizar y grabar un ensayo como respaldo. La instancia gratuita puede tardar al despertar. No mostrar el Deploy Hook, tokens ni secretos en pantalla.

## Seguridad de la configuración

APP_URL es una variable pública del repositorio con la URL base, sin /health ni barra final. RENDER_DEPLOY_HOOK es un secreto del entorno production. Si se agregan variables después de crear una ejecución, volver a ejecutar el workflow para validar la configuración actual.