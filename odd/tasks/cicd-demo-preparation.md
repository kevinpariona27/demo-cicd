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
- L7 Local baseline: npm ci --ignore-scripts and npm test passed (3 tests). npm audit returned two critical and one moderate issue in test tooling. Updating Vitest to 4.1.12 (Node20-compatible) is in progress; npm metadata/downloads are slow, not proven stuck. Trivy v0.36.0 was resolved through the official annotated tag to commit ed142fd0673e97e23eac54620cfb913e5ce36c25 and pinned immutably. Added LF policy and executable bits for shell scripts. GitHub repository created: https://github.com/kevinpariona27/demo-cicd; no push yet.

- L8 Dependency verification: original npm audit was RED (2 critical, 1 moderate). Vitest 4.1.12 is installed exactly; normal npm ci succeeds, npm test passes 3/3, npm audit is GREEN (0 vulnerabilities). ignore-scripts initially caused a missing native binding; normal npm ci fixed it. RDD is explicitly off globally; no native review started. Production environment created with owner reviewer and protected-branches-only deployment policy.

- L9 Local independent verification passed for candidate 6717024; hosted run 40014759131 passed Node20 tests and Docker build but Trivy blocked four HIGH OpenSSL findings and 22 Node-package findings in the base image (including npm tooling). T2 remains pending. Correction: Node24 in CI/image, apk upgrade for fixed OS packages, remove unused npm/Yarn from runtime, add container /health smoke check. No vulnerability threshold weakened. Own checks: 3 tests pass, audit0. Risk: item5 (runtime and CI).

- L10 PR1 merged as 9b083d00cdec6d91da141f1b2c6eb488b577d41b. Hosted run40015288823: tests and Docker build PASS; added health smoke FAIL with curl56 connection reset, not covered by retry-connrefused. Trivy/GHCR/deploy skipped. T2 is BLOCKED; additional correction needs user decision after scoped recheck. Proposed finite retry-all-errors correction, not yet applied.
- L11 T3 PARTIAL: main requires PR+test (zero approvals); production requires owner review and protected branches. Render signed in, Existing Image form open, no service created. APP_URL and deploy secret pending image publication. T4 not started. RDD explicitly globally OFF. Local/independent tests3/3 and audit0 passed.
- L12 Scratch cleanup was denied before execution; retained C:\Users\kevin\AppData\Local\Temp\npm-vitest-diagnose-61be735a717445c6a1ccaef168465ad9 and C:\Users\kevin\AppData\Local\Temp\tmp.UgUJZyd2W6. Do not claim cleanup. Engram mirror remains unavailable (resolved project rejected as unbacked).
- L13 User authorized additional correction and completion: "si prepara todo para ya poder hacer hacer la parte practica". Retry startup on all transient curl errors with finite retry count and request timeouts; do not weaken health assertion or security scan. Prior hosted run is RED evidence; GREEN requires hosted container smoke and scan. Risk: item5 (CI).
