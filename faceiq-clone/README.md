# FaceIQ Labs — Clone landing page

Clone statique de [faceiqlabs.com](https://www.faceiqlabs.com/) en HTML + CSS.

## Ouvrir dans le navigateur

### Option 1 — Script rapide (recommandé)

```bash
cd faceiq-clone
chmod +x serve.sh
./serve.sh
```

Puis ouvrez **http://localhost:8080** dans Chrome, Firefox ou Safari.

### Option 2 — Python

```bash
cd faceiq-clone
python3 -m http.server 8080
```

Puis ouvrez **http://localhost:8080**.

### Option 3 — Node.js

```bash
cd faceiq-clone
npx serve . -l 8080
```

Puis ouvrez **http://localhost:8080**.

## Important

- **Ne double-cliquez pas** sur `index.html` : le CSS et la vidéo ne se chargeront pas correctement en `file://`.
- **Entrez toujours dans le dossier `faceiq-clone`** avant de lancer le serveur.
- `http://localhost:8080` ne fonctionne que sur **votre** machine, pas sur l’environnement cloud de l’agent Cursor.

## Structure

```
faceiq-clone/
├── index.html
├── css/styles.css
└── assets/
```
