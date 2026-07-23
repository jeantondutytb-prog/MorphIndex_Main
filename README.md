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

> **Important :** Vercel déploie en **Production** uniquement sur la branche `main`. Tous les pushes des agents doivent aller sur `main` (pas seulement sur des branches `cursor/*`).

1. Va sur [vercel.com](https://vercel.com) → **Add New Project** → importe le repo `MorphIndex_Main`
2. Laisse les réglages par défaut (le fichier `vercel.json` à la racine pointe déjà vers `faceiq-clone/`)
3. Clique **Deploy** — tu obtiens une URL du type `morphindex-main.vercel.app`
4. Dans le projet Vercel : **Settings → Domains** → ajoute ton nom de domaine
5. Chez ton registrar (OVH, Namecheap, etc.), configure les DNS indiqués par Vercel (souvent un CNAME `www` → `cname.vercel-dns.com`, ou les nameservers Vercel)

### Configurer la connexion Google (Supabase)

L'authentification passe par **Supabase** (gratuit). Sans cette config, le bouton Google ne pourra pas fonctionner.

#### 1. Créer le projet Supabase

1. Va sur [supabase.com](https://supabase.com) → **New project**
2. Note l'**URL du projet** et la clé **anon public** (Settings → API)

#### 2. Activer Google dans Supabase

1. Supabase → **Authentication** → **Providers** → **Google** → activer
2. Crée un client OAuth dans [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (type **Web application**)
3. Dans Google, ajoute l'URI de redirection Supabase :
   - `https://<ton-projet>.supabase.co/auth/v1/callback`
4. Copie le **Client ID** et le **Client Secret** Google dans Supabase

#### 3. Configurer les URLs Supabase

Dans **Authentication → URL Configuration** :

| Champ | Valeur |
|-------|--------|
| Site URL | `https://www.morphindex.com` |
| Redirect URLs | `https://www.morphindex.com/register`, `https://www.morphindex.com/login`, `https://www.morphindex.com/app` |

#### 4. Variables d'environnement Vercel

Dans le projet Vercel → **Settings → Environment Variables** :

| Variable | Valeur |
|----------|--------|
| `SUPABASE_URL` | URL du projet Supabase |
| `SUPABASE_ANON_KEY` | Clé anon public Supabase |
| `AUTH_REDIRECT_URL` | `/app` (page après connexion) |

Redéploie le projet après avoir ajouté les variables.

#### 5. Test local (optionnel)

Pour tester en local avec `serve.sh`, remplis temporairement `faceiq-clone/js/config.js` avec tes clés Supabase (ne commite pas les vraies clés).
