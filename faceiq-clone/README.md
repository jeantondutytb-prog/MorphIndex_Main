# MorphIndex — Landing page

Landing page statique pour **MorphIndex**, en HTML + CSS.

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

- **Ne double-cliquez pas** sur `index.html` : le CSS ne se chargera pas correctement en `file://`.
- **Entrez toujours dans le dossier `faceiq-clone`** avant de lancer le serveur.

## Structure

```
faceiq-clone/
├── index.html
├── brand.html          # Aperçu des 4 logos
├── css/styles.css
├── assets/logos/
│   ├── logo-primary.svg
│   ├── logo-secondary.svg
│   ├── logo-simplified.svg
│   └── logo-submark.svg
└── js/
    ├── i18n.js
    └── theme.js
```

## Langues

Le site est disponible en **français**, **anglais** et **espagnol**. Utilisez le bouton globe (FR / EN / ES) dans la barre de navigation. La préférence est sauvegardée dans le navigateur.
