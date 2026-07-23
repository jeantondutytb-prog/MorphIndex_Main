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

`serve.sh` prefers `python3 -m http.server`, falling back to `python` then `npx serve`. See `README.md` for the full documented flow.

### Non-obvious caveats
- The local static server (`python -m http.server`) does **not** do clean-URL rewrites. In-page CTAs link to `/register` (no extension), which returns **404 locally**. Navigate to `http://localhost:8080/register.html` explicitly when testing. Production (Vercel) handles the clean URL, so this is a local-only quirk — not a bug to fix.
- The register form and social-login buttons are UI-only (client-side validation via `js/auth.js`); submitting does not hit any backend, so "Continue" simply stays on the page.
- Theme (`js/theme.js`) and i18n (`js/i18n.js`) run entirely client-side and persist via `localStorage`. Toggling dark mode may briefly show a loading/transition spinner before the dark page renders.

### Lint / test / build
There is **no** lint, test, or build tooling in this repo (no `package.json`, no test runner, `vercel.json` sets `buildCommand: null`). Verification is manual: serve the site and load `index.html` / `register.html`.
