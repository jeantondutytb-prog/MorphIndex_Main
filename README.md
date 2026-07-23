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
| `ANTHROPIC_API_KEY` | Clé API Anthropic (analyse faciale vision) |
| `ANTHROPIC_MODEL` | Optionnel — voir recommandations ci-dessous (défaut : `claude-sonnet-4-6`) |
| `FAL_KEY` | Clé API fal.ai (aperçu 6 mois après abonnement) |
| `FAL_MODEL` | Optionnel — voir recommandations ci-dessous (défaut : `fal-ai/image-editing/face-enhancement`) |
| `APP_ORIGIN` | Optionnel — origine CORS (défaut : `https://www.morphindex.com`) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (Dashboard → Developers → API keys) |
| `STRIPE_WEBHOOK_SECRET` | Secret du webhook Stripe (`checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`) |
| `STRIPE_PRICE_MONTHLY` | ID du prix Stripe mensuel (ex. `price_...`, 9,99 €/mois) |
| `STRIPE_PRICE_YEARLY` | ID du prix Stripe annuel (ex. `price_...`, 59,99 €/an) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé **service_role** Supabase (Settings → API) — active l'abonnement après paiement |

**Parcours utilisateur (Phase 2)** : la progression du plan (`journey`, `scoreHistory`, `planProgress`) est synchronisée dans `user_metadata.app_state` via `/api/journey`.

**Scan cloud (Phase 3)** : les photos + l'analyse complète sont persistées dans Supabase Storage (bucket privé `user-scans`) via `/api/scan`. Au login sur un autre appareil, le dashboard hydrate automatiquement le scan distant. Les avancées client (journey, chat, previews, simulations) sont aussi poussées dans ce sync. Aucune table SQL supplémentaire n'est requise — `SUPABASE_SERVICE_ROLE_KEY` doit être configurée (le bucket est créé automatiquement au premier upload).

| `FACEGPT_DAILY_LIMIT` | Optionnel — limite de messages FaceGPT par jour et par utilisateur (défaut : `25`) |
| `FACEGPT_MAX_HISTORY` | Optionnel — nombre de messages renvoyés à Anthropic par requête (défaut : `6`) |

Redéploie le projet après avoir ajouté les variables.

#### Paiement Stripe (abonnement)

Sans Stripe configuré, le bouton **S'abonner** affiche une erreur — il n'est plus possible de débloquer les résultats sans payer.

1. Dans [Stripe Dashboard](https://dashboard.stripe.com) → **Products** : crée deux prix récurrents (mensuel 9,99 €, annuel 59,99 €) et copie les `price_...` dans `STRIPE_PRICE_MONTHLY` et `STRIPE_PRICE_YEARLY`.
2. **Developers → Webhooks** → endpoint `https://www.morphindex.com/api/stripe` avec les événements :
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
3. Copie le **Signing secret** dans `STRIPE_WEBHOOK_SECRET`.
4. Le flux : l'utilisateur clique **Débloquer mes résultats** → Stripe Checkout → retour sur `/onboarding/results` → vérification serveur → accès `/app`. Le webhook met à jour `subscription_active` dans les métadonnées Supabase.

#### Analyse IA (Anthropic + fal.ai)

- **Pendant l'onboarding** (`/onboarding/analyzing`) : les photos frontale + profil sont envoyées à `/api/analyze-face` (Claude vision). Sans clé Anthropic, l'app retombe sur des scores simulés.
- **Compression automatique** : les photos sont redimensionnées (max 1280 px) et exportées en JPEG (~85 % qualité) à l'upload et avant chaque appel API. Cela réduit fortement les tokens vision (~2–3× moins cher) sans changer de modèle — gardez `claude-sonnet-4-6` pour des résultats fiables.
- **Après abonnement** : `/api/generate-preview` appelle fal.ai (`face-enhancement`) pour générer un aperçu « dans 6 mois », affiché sur le dashboard `/app`.

Les clés API restent **côté serveur** (variables Vercel) — jamais exposées au navigateur.

#### Quels modèles utiliser ?

Vous n'avez **pas** à choisir un modèle dans l'interface Anthropic ou fal.ai. Seules les clés `ANTHROPIC_API_KEY` et `FAL_KEY` suffisent : le code choisit les modèles par défaut. Ajoutez les variables optionnelles ci-dessous seulement si vous voulez changer.

**Anthropic — analyse faciale (2 photos → scores + plan)**

| Variable `ANTHROPIC_MODEL` | Quand l'utiliser |
|------------------------------|------------------|
| `claude-sonnet-4-6` **(défaut)** | Meilleur compromis qualité / prix pour MorphIndex |
| `claude-haiku-4-5-20251001` | Plus rapide et moins cher, légèrement moins précis |
| `claude-opus-4-8` | Analyse la plus fine, plus lent et plus cher |

**fal.ai — aperçu « dans 6 mois » (1 photo → portrait amélioré)**

| Variable `FAL_MODEL` | Quand l'utiliser |
|----------------------|------------------|
| `fal-ai/image-editing/face-enhancement` **(défaut)** | Retouche naturelle, ~0,04 $/image, identité bien conservée |
| `fal-ai/flux-pro/kontext` | Transformation plus visible via prompt (6 mois d'amélioration), un peu plus cher |

Ne pas utiliser `fal-ai/image-apps-v2/portrait-enhance` en production (~0,40 $/image).

#### 5. Test local (optionnel)

Pour tester en local avec `serve.sh`, remplis temporairement `faceiq-clone/js/config.js` avec tes clés Supabase (ne commite pas les vraies clés).
