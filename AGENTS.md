# MorphIndex_Main

## Cursor Cloud specific instructions

### What this repo is
A single-product, dependency-free **static website** (marketing landing page + a UI-only register/login page) living in `faceiq-clone/`. Plain HTML/CSS/vanilla JS — no framework, no package manager, no build step, no backend, and no database. Python 3 and Node.js are preinstalled in the cloud environment, so nothing needs to be installed to run it.

### Running it (dev mode)
Serve the static files and open http://localhost:8080:

```bash
cd faceiq-clone
PORT=8080 ./serve.sh
```

`serve.sh` runs `serve.py` (a `SimpleHTTPRequestHandler` subclass) under `python3`/`python`, falling back to `npx serve`. See `README.md` for the full documented flow.

### Non-obvious caveats
- In-page CTAs link to clean URLs (e.g. `/register`, no extension) because `vercel.json` sets `cleanUrls: true`. `serve.py` emulates this locally by serving `register.html` for `/register`, so clean URLs work both locally and on Vercel. (A plain `python -m http.server` would 404 on `/register` — always run via `serve.sh`/`serve.py`.)
- The register form and social-login buttons are UI-only (client-side validation via `js/auth.js`); submitting does not hit any backend, so "Continue" simply stays on the page.
- Theme (`js/theme.js`) and i18n (`js/i18n.js`) run entirely client-side and persist via `localStorage`. Toggling dark mode may briefly show a loading/transition spinner before the dark page renders.

### Lint / test / build
There is **no** lint, test, or build tooling in this repo (no `package.json`, no test runner, `vercel.json` sets `buildCommand: null`). Verification is manual: serve the site and load `index.html` / `register.html`.

### Git push policy (save GitHub push quota)
GitHub push quota is limited (~100/day). **Do not push after every agent iteration or intermediate commit.**

- Work on a `cursor/*` branch; commit locally as you go.
- **Push once** when the feature/fix is complete, tested, and ready (or when the user explicitly asks).
- Do not push to `main` mid-development.

### Deploying to production (Vercel)
Deploy finished, tested work to **Vercel production** without requiring a git push:

```bash
npx vercel deploy --prod --yes --token="$VERCEL_TOKEN"
```

- Prefer `vercel deploy --prod` over pushing `main` on every feature — it deploys the local tree and does not consume a GitHub push.
- Push `main` only when remote history must be updated (optional after deploy, not mandatory every time).
- Requires `VERCEL_TOKEN` in the environment. If missing, surface this to the user instead of skipping deploy.
- On a fresh VM, link with `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID`, or `npx vercel link --yes --project <name> --token="$VERCEL_TOKEN"`.
- `vercel.json` at the repo root sets `outputDirectory: faceiq-clone`, `buildCommand: null`, and `cleanUrls: true` — deploy from the repo root.
