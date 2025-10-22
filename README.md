# API Node.js + TypeScript — Users

Une petite API REST en **TypeScript** avec **Express**, **routes** et **contrôleurs** séparés, **stockage en mémoire**, gestion des **variables d’environnement** via `dotenv`, et **scripts** NPM. Conforme au barème fourni (voir détails ci‑dessous).

> Ce projet suit l’organisation et les étapes présentées dans votre support PDF sur la création d’API Node.js.  

## Structure du projet

```
api-node-ts/
├─ .env
├─ .gitignore
├─ nodemon.json
├─ package.json
├─ tsconfig.json
├─ README.md
└─ src/
   ├─ index.ts
   ├─ types/
   │  └─ user.ts
   ├─ controllers/
   │  └─ user.controller.ts
   └─ routes/
      └─ user.routes.ts
```

## Configuration & installation

```bash
# 1) Installer les dépendances
npm install

# 2) (optionnel) Ajuster le port
#   - fichier .env (inclus) : PORT=4000

# 3) Lancer en dev (TypeScript à la volée via ts-node + nodemon)
npm run dev

# 4) Compiler & exécuter en prod
npm run build
npm start
```

- **PORT** (via `.env`) : port d’écoute de l’API (par défaut `4000`, sinon `3000` fallback côté code).
- **Nodemon** est configuré pour surveiller `src/` et exécuter `ts-node -r dotenv/config` (voir `nodemon.json`).
- **TypeScript** est configuré avec `target: ES6`, `module: CommonJS`, `rootDir: src`, `outDir: dist`, `strict: true`, `esModuleInterop: true`, `resolveJsonModule: true` (voir `tsconfig.json`).

## Routes

### Exigées par le barème
- `GET /users` → retourne la liste complète des utilisateurs *(stockage en mémoire)*.
- `POST /users` → crée un utilisateur `{ name, email }` (validation simple d’email, doublons interdits).

### Bonus (CRUD complet)
- `GET /users/:id` → retourne un utilisateur par id.
- `PUT /users/:id` → met à jour `name` et/ou `email` (validation incluse).
- `DELETE /users/:id` → supprime un utilisateur par id.

## Tests rapides (cURL)

> Assurez‑vous que l’API tourne (`npm run dev`) et que `PORT` est bien exposé (ex. 4000).

```bash
# Liste des utilisateurs (attendu { users: [] } la 1ère fois)
curl -i http://localhost:${PORT:-4000}/users

# Ajout d’un utilisateur
curl -i -X POST http://localhost:${PORT:-4000}/users   -H "Content-Type: application/json"   -d '{"name":"Alice","email":"alice@example.com"}'

# Récupérer par id (bonus)
curl -i http://localhost:${PORT:-4000}/users/1

# Mettre à jour (bonus)
curl -i -X PUT http://localhost:${PORT:-4000}/users/1   -H "Content-Type: application/json"   -d '{"name":"Alice Cooper"}'

# Supprimer (bonus)
curl -i -X DELETE http://localhost:${PORT:-4000}/users/1
```

## Contrôleurs & gestion des données

- **`src/controllers/user.controller.ts`** isole la logique métier : `getUsers`, `addUser`, et (bonus) `getUserById`, `updateUser`, `deleteUser`.
- **Typage strict** via `src/types/user.ts`.
- **Stockage en mémoire** : simple tableau `User[]` (réinitialisé à chaque redémarrage).

> Pour une persistance réelle, remplacez ce stockage par une base (ex. **SQLite** via `better-sqlite3`, **MongoDB**, etc.).

## Variables d’environnement

- Fichier **`.env`** à la racine :
  ```
  PORT=4000
  ```
- Chargement effectué **avant** la création du serveur dans `src/index.ts` via `dotenv.config()`.

## Qualité du code

- Typage explicite (`User`, `Partial<User>`), contrôles d’email & doublons, statuts HTTP adaptés (`400`, `409`, `404`, `201`).
- Organisation claire : `src/` → `controllers/`, `routes/`, `types/`.
- Commentaires courts et utiles.

