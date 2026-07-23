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

### Deploying to production (Vercel) — standing instruction
The owner wants every code change deployed to **Vercel production**. After pushing your branch, deploy the working tree straight to production (this does not merge any PR):

```bash
npx vercel deploy --prod --yes --token="$VERCEL_TOKEN"
```

- Requires a `VERCEL_TOKEN` secret in the environment. If it is missing, the deploy cannot run — surface this to the user instead of skipping the deploy.
- The first deploy on a fresh VM links the project. To target the existing project non-interactively, either provide `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID` secrets, or link once with `npx vercel link --yes --project <existing-project-name> --token="$VERCEL_TOKEN"` (find the name via `npx vercel projects ls --token="$VERCEL_TOKEN"`).
- `vercel.json` at the repo root already sets `outputDirectory: faceiq-clone`, `buildCommand: null`, and `cleanUrls: true`, so no build config is needed — deploy from the repo root.
