# Petit Dodo — version autonome

Application web installable (PWA) de suivi de bébé, synchronisée entre les téléphones des parents grâce à Firebase.
DevLabs - A. Giraud

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'application |
| `firebase-config.js` | La configuration de **ton** projet Firebase (à remplir, étape 2) |
| `firestore.rules` | Les règles de sécurité à coller dans Firebase (étape 4) |
| `sw.js` | Le service worker : fonctionnement hors connexion et mises à jour |
| `manifest.webmanifest`, `icons/` | Icône et nom sur l'écran d'accueil |

---

## Mise en place (environ 15 minutes, à faire une seule fois, depuis un ordinateur)

### 1. Créer le projet Firebase
1. Va sur **console.firebase.google.com** et connecte-toi avec ton compte Google.
2. **Créer un projet** → nom : `petit-dodo` → tu peux désactiver Google Analytics → **Créer**.
3. Le projet reste sur l'offre gratuite (Spark), largement suffisante pour deux personnes. Aucune carte bancaire n'est demandée.

### 2. Déclarer l'application web
1. Sur la page d'accueil du projet, clique sur l'icône **Web** `</>`.
2. Surnom : `Petit Dodo` → **ne coche pas** « Firebase Hosting » → **Enregistrer l'application**.
3. Firebase affiche un bloc `const firebaseConfig = { ... }`. Copie les valeurs (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`) dans **`firebase-config.js`**, à la place des valeurs d'exemple.

Ces valeurs ne sont pas secrètes : c'est normal qu'elles soient visibles dans le code. La protection des données vient des règles de l'étape 4.

### 3. Créer vos deux comptes
1. Menu **Authentication** → **Commencer**.
2. Onglet **Sign-in method** → **Adresse e-mail/Mot de passe** → **Activer** → Enregistrer.
3. Onglet **Users** → **Ajouter un utilisateur** : ton e-mail et un mot de passe.
4. Recommence pour l'e-mail de Marilyn. Elle pourra changer son mot de passe avec « Mot de passe oublié ? » dans l'app.

### 4. Créer la base de données et la protéger
1. Menu **Firestore Database** → **Créer une base de données**.
2. Emplacement : **europe-west9 (Paris)**, ou une autre région européenne → mode **production** → Créer.
3. Onglet **Règles** : remplace tout le contenu par celui de **`firestore.rules`**, en mettant **vos deux adresses e-mail** à la place de `amaury@exemple.fr` et `marilyn@exemple.fr` → **Publier**.

Seules ces deux adresses, connectées, pourront lire ou écrire les données.

### 5. Mettre l'app en ligne (GitHub Pages, gratuit)
1. Sur **github.com**, crée un dépôt nommé `petit-dodo`, **public** (GitHub Pages gratuit l'exige ; le code est visible, mais pas vos données).
2. Dans le dépôt : **Add file → Upload files** → glisse **tout le contenu du dossier** (avec le dossier `icons`) → **Commit changes**.
3. **Settings → Pages** → Source : **Deploy from a branch** → Branche **main**, dossier **/(root)** → Save.
4. Après une minute, l'app est en ligne à l'adresse `https://TON-PSEUDO.github.io/petit-dodo/`.
5. Dans Firebase : **Authentication → Settings → Domaines autorisés** → **Ajouter un domaine** → `TON-PSEUDO.github.io`.

Autre solution sans GitHub : **app.netlify.com/drop**, puis glisse le dossier dans la page. Ajoute ensuite le domaine Netlify obtenu dans les domaines autorisés de Firebase.

### 6. Installer l'app sur vos téléphones
- **iPhone** : ouvre l'adresse dans **Safari** → bouton **Partager** → **Sur l'écran d'accueil**.
- **Android** : ouvre l'adresse dans **Chrome** → menu ⋮ → **Installer l'application**.

Chacun se connecte avec son e-mail et son mot de passe. L'app s'ouvre ensuite en plein écran, comme une vraie application.

### 7. Transférer les données depuis la version Claude
1. Dans la version actuelle (dans Claude) : **Réglages → Sauvegarde → Télécharger la sauvegarde (.json) pour l'app autonome**.
2. Dans la nouvelle app, à la première connexion : **J'ai une sauvegarde à restaurer**, ou plus tard **Réglages → Sauvegarde → Restaurer**, puis choisis le fichier.
3. Les réglages (prénom, naissance, sexe, terme) et tous les événements sont repris. Les doublons sont ignorés : tu peux restaurer plusieurs fois sans risque.
4. Ensuite, n'utilisez plus que la nouvelle app.

---

## Mettre à jour l'app plus tard
1. Remplace `index.html` dans le dépôt GitHub (Upload files).
2. Dans `sw.js`, change le numéro de la ligne `const CACHE = 'petitdodo-v2.0.0';` (par exemple `v2.0.1`) et envoie aussi ce fichier.
3. Sur les téléphones, un bandeau **« Nouvelle version disponible — Mettre à jour »** apparaît à l'ouverture suivante.

## Bon à savoir
- **Hors connexion** : l'app fonctionne et garde les saisies. Elle les synchronise dès que le réseau revient.
- **Sauvegarde** : Réglages → Télécharger la sauvegarde, de temps en temps (fichier .json).
- **Import Napper** : Réglages → Importer un export Napper (CSV), toujours disponible.
- **Sons** : ils fonctionnent en mode silencieux. Selon le téléphone, ils peuvent s'arrêter quand l'écran est verrouillé longtemps.
- **Rapport pédiatre** : Stats → Rapport PDF. Sur iPhone, il s'ouvre dans le menu de partage (Enregistrer dans Fichiers, Mail, etc.).
