# CI/CD demo preparation
Objective: prepare the supplied demo locally and configure GitHub and Render Free.
Delivery: single-pr initial import; no application behavior changes planned. Runner: npm test.

## Specs
- S1: "implementa la guia para tener preparado el ordenador" — follow the supplied GUIA_DEMO.md, verifying local prerequisites, pipeline and demo scenarios.
- S2: "te autorizo todo , raliza los cambios que veas conveniente si tengo una cuenta asociada a git ya en esta computadora el de render tengo cuenta pero podemos entrar a la sesion" — use the existing GitHub session and sign into Render. Do not introduce paid resources.

## Tasks
- T1 [S1] inline: local prerequisites, extract and verify package — complete; hashes and Bash syntax checks passed.
- T2 [S1,S2] inline: publish initial demo repository and verify test/build pipeline — pending. Risk: item 5 (CI and deployment configuration).
- T3 [S1,S2] inline: configure Render Free, production secret, APP_URL and branch protection — pending. Risk: items 2 and 5 (deploy secret, branch guard and deployment).
- T4 [S1] inline: verify successful deployment, prepare failing PR without merging, capture DORA — pending.

## Log
- L1 Original request: "implementa la guia para tener preparado el ordenador"
- L2 Authorization: "te autorizo todo"
- L3 Authorization: "te autorizo todo , raliza los cambios que veas conveniente si tengo una cuenta asociada a git ya en esta computadora el de render tengo cuenta pero podemos entrar a la sesion"
- L4 Extracted 14 files with SHA256 match. Git, gh, jq, GNU utilities and Node/npm exist in Git Bash; WSL not installed or needed for the adapted local path. All three shell scripts pass bash -n. DORA empty offline fixture passed. No application source changes; RED is not applicable to environment setup.
- L5 Existing GitHub session verified for kevinpariona27. demo-cicd repository does not exist. Render sign-in reached the workspace successfully. Engram mirror pending: resolved project zapata_v2 is rejected as unbacked by the memory server.
- L6 Initial import is the supplied archive, not authored implementation; no oversized implementation PR is planned. Future code changes require separate tests and review. No force pushes or intentional-error merges authorized by this plan.