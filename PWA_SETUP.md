# Configuration PWA - Automatic

L'application Automatic a été configurée comme Progressive Web App (PWA) pour permettre une installation sur mobile et desktop, ainsi qu'un fonctionnement hors ligne.

## Fonctionnalités PWA

✅ **Installation sur appareil** : L'application peut être installée sur iOS, Android et desktop  
✅ **Mode hors ligne** : Fonctionnement sans connexion internet grâce au service worker  
✅ **Mise en cache intelligente** : Les ressources sont mises en cache pour un chargement rapide  
✅ **Prompt d'installation** : Affichage automatique d'un prompt pour installer l'application  
✅ **Icônes et thème** : Configuration complète pour l'affichage sur l'écran d'accueil  

## Fichiers configurés

### 1. `next.config.mjs`
- Configuration de `next-pwa` avec service worker
- Cache runtime pour les requêtes réseau
- Désactivation en mode développement

### 2. `public/manifest.json`
- Métadonnées de l'application PWA
- Configuration des icônes (192x192 et 512x512)
- Raccourcis vers les pages principales
- Thème et couleurs de l'application

### 3. `app/layout.tsx`
- Métadonnées PWA dans les metadata Next.js
- Configuration pour iOS (Apple Web App)
- Viewport optimisé pour mobile

### 4. `components/pwa-head.tsx`
- Ajout dynamique des balises meta nécessaires
- Lien vers le manifest.json

### 5. `components/pwa-install-prompt.tsx`
- Composant pour afficher le prompt d'installation
- Gestion de l'événement `beforeinstallprompt`
- Interface utilisateur pour installer l'application

## Utilisation

### En développement
La PWA est désactivée en mode développement pour faciliter le développement. Les fichiers de service worker ne sont pas générés.

### En production
1. Construire l'application :
   ```bash
   npm run build
   ```

2. Démarrer le serveur de production :
   ```bash
   npm run start
   ```

3. Les fichiers suivants seront générés dans `public/` :
   - `sw.js` - Service worker principal
   - `workbox-*.js` - Fichiers Workbox pour la mise en cache
   - `fallback-*.js` - Pages de fallback hors ligne

### Installation sur mobile

**Android (Chrome) :**
1. Ouvrir l'application dans Chrome
2. Un prompt d'installation apparaîtra automatiquement
3. Cliquer sur "Installer" ou utiliser le menu Chrome > "Ajouter à l'écran d'accueil"

**iOS (Safari) :**
1. Ouvrir l'application dans Safari
2. Cliquer sur le bouton de partage
3. Sélectionner "Sur l'écran d'accueil"
4. L'application sera ajoutée comme une icône

### Installation sur desktop

**Chrome/Edge :**
1. Un bouton d'installation apparaîtra dans la barre d'adresse
2. Cliquer sur l'icône d'installation
3. L'application s'ouvrira dans une fenêtre dédiée

## Fonctionnalités hors ligne

L'application utilise une stratégie de cache "NetworkFirst" :
- Les requêtes réseau sont tentées en premier
- Si la connexion échoue, les données en cache sont utilisées
- Jusqu'à 200 entrées sont mises en cache

## Personnalisation

### Modifier les icônes
Remplacer les fichiers dans `public/` :
- `automatic-favicon-no-bg.png` (192x192 et 512x512 recommandés)

### Modifier le thème
Éditer `public/manifest.json` :
- `theme_color` : Couleur de la barre d'état
- `background_color` : Couleur de fond au démarrage

### Modifier la stratégie de cache
Éditer `next.config.mjs` dans la section `runtimeCaching` :
- `NetworkFirst` : Réseau en priorité, cache en fallback
- `CacheFirst` : Cache en priorité
- `StaleWhileRevalidate` : Cache immédiat, mise à jour en arrière-plan

## Dépannage

### Le service worker ne se charge pas
- Vérifier que vous êtes en mode production (`npm run build && npm run start`)
- Vérifier la console du navigateur pour les erreurs
- Vérifier que les fichiers sont générés dans `public/`

### Le prompt d'installation n'apparaît pas
- Vérifier que l'application répond aux critères PWA (HTTPS, manifest, service worker)
- Vérifier que vous n'avez pas déjà installé l'application
- Tester dans un navigateur compatible (Chrome, Edge, Safari)

### L'application ne fonctionne pas hors ligne
- Vérifier que le service worker est actif (DevTools > Application > Service Workers)
- Vérifier que les ressources sont mises en cache
- Vérifier la stratégie de cache dans `next.config.mjs`

## Notes

- Les fichiers générés par next-pwa sont automatiquement ignorés par Git (voir `.gitignore`)
- Le service worker est désactivé en mode développement pour faciliter le développement
- L'application fonctionne mieux en HTTPS (requis pour certaines fonctionnalités PWA)

