# MorphIndex_Main

## MorphIndex — Landing page

La landing page de **MorphIndex** se trouve dans le dossier `faceiq-clone/`.

### Prévisualiser en local

```bash
cd faceiq-clone
chmod +x serve.sh   # macOS / Linux uniquement
./serve.sh
```

Sous Windows, double-cliquez sur `faceiq-clone/serve.bat` ou exécutez :

```bat
cd faceiq-clone
serve.bat
```

Puis ouvrez **http://localhost:8080** dans votre navigateur.

### Déployer sur Vercel (recommandé pour le domaine custom)

1. Va sur [vercel.com](https://vercel.com) → **Add New Project** → importe le repo `MorphIndex_Main`
2. Laisse les réglages par défaut (le fichier `vercel.json` à la racine pointe déjà vers `faceiq-clone/`)
3. Clique **Deploy** — tu obtiens une URL du type `morphindex-main.vercel.app`
4. Dans le projet Vercel : **Settings → Domains** → ajoute ton nom de domaine
5. Chez ton registrar (OVH, Namecheap, etc.), configure les DNS indiqués par Vercel (souvent un CNAME `www` → `cname.vercel-dns.com`, ou les nameservers Vercel)
