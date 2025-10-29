# Landing Page Skeleton

Un skeleton optimisé pour créer des landing pages modernes et performantes avec Astro et Tailwind CSS.

## 🚀 Caractéristiques

- **Astro + Tailwind CSS** : Performance optimale et développement rapide
- **Mode sombre/clair** : Support automatique avec switcher
- **Composants modulaires** : Sections réutilisables pour vos landing pages
- **SEO optimisé** : Configuration SEO prête à l'emploi
- **Responsive design** : Adapté à tous les écrans
- **Animations fluides** : Transitions et animations CSS
- **Analytics intégré** : Google Analytics et Google Tag Manager
- **Formulaire de contact** : Prêt à configurer

## 📁 Structure du projet

```
/
├── public/                 # Assets statiques (images, favicon)
├── src/
│   ├── assets/            # Images et assets du projet
│   ├── components/        # Composants réutilisables
│   │   ├── blocks/        # Sections de landing page
│   │   └── ui/            # Composants UI individuels
│   ├── config/            # Configuration du site
│   ├── data/              # Données JSON (features, témoignages, etc.)
│   ├── icons/             # Icônes Heroicons
│   ├── layouts/           # Layouts de pages
│   └── pages/             # Pages du site
└── package.json
```

## 🛠️ Installation

1. **Cloner le projet**
   ```bash
   git clone [votre-repo]
   cd landing-page-skeleton
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:4321
   ```

## ⚙️ Configuration

### Configuration de base (`src/config/config.ts`)
- Titre et description du site
- Logo et image Open Graph
- Mode sombre/clair
- Animations de scroll

### Navigation (`src/config/navigationBar.ts`)
- Menu de navigation
- Actions (boutons CTA)

### Footer (`src/config/footerNavigation.ts`)
- Liens du footer
- Informations de contact

### Analytics (`src/config/analytics.ts`)
- Google Analytics
- Google Tag Manager
- Google Search Console

## 🎨 Personnalisation

### Couleurs
Modifiez les couleurs dans `tailwind.config.mjs` :
```javascript
colors: {
  primary: {
    // Vos couleurs primaires
  },
  neutral: {
    // Vos couleurs neutres
  }
}
```

### Fonts
1. Ajoutez vos fonts dans `tailwind.config.mjs`
2. Importez-les dans `src/layouts/Layout.astro`

### Contenu
- **Features** : `src/data/json-files/features.json`
- **Témoignages** : `src/data/json-files/testimonials.json`
- **Pricing** : `src/data/json-files/pricing.json`
- **FAQ** : `src/data/json-files/faq.json`

## 📄 Pages disponibles

- **Home** (`/`) : Page d'accueil avec hero, features, témoignages
- **Features** (`/features`) : Page détaillée des fonctionnalités
- **Pricing** (`/pricing`) : Page de tarification
- **FAQ** (`/faq`) : Questions fréquemment posées
- **Contact** (`/contact`) : Page de contact avec formulaire
- **Terms** (`/terms`) : Conditions d'utilisation
- **Privacy** (`/privacy`) : Politique de confidentialité (RGPD)
- **Cookies** (`/cookies`) : Politique des cookies

## 🧩 Composants disponibles

### Sections (blocks/)
- **Hero** : Sections d'accueil avec CTA
- **Features** : Cartes de fonctionnalités
- **Testimonials** : Témoignages clients
- **Pricing** : Tableaux de tarification
- **FAQ** : Questions fréquentes
- **CTA** : Call-to-action
- **Contact** : Formulaire de contact

### UI Components
- **Boutons** : Avec support des modales
- **Cartes, formulaires** : Composants de base
- **Navigation, footer** : Structure du site
- **Modal** : Fenêtres popup avec overlay
- **Feed** : Affichage chronologique de contenu
- **Toast** : Notifications temporaires
- **CookieBanner** : Bannière de consentement RGPD

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Prévisualisation
```bash
npm run preview
```

### Plateformes supportées
- Vercel (recommandé)
- Netlify
- GitHub Pages
- Tout hébergeur statique

## 📝 Utilisation pour vos clients

Ce skeleton est conçu pour être facilement personnalisable :

1. **Remplacez le contenu** dans les fichiers JSON
2. **Modifiez les couleurs** dans Tailwind
3. **Ajoutez vos images** dans `public/` et `src/assets/`
4. **Configurez les analytics** avec vos codes
5. **Personnalisez le logo** et les textes
6. **Adaptez les pages légales** (Terms, Privacy, Cookies) à votre entreprise
7. **Configurez la bannière de cookies** selon vos besoins RGPD

## 📄 Licence

MIT License - Libre d'utilisation pour vos projets commerciaux.

## 🤝 Support

Pour toute question ou personnalisation avancée, n'hésitez pas à me contacter.

---

**Prêt à créer des landing pages performantes !** 🎯