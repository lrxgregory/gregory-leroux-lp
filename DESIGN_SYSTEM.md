# Design System - Border Radius & Shadows

Ce projet utilise un système de design personnalisable via CSS Variables pour permettre à chaque client d'avoir son propre style visuel tout en conservant une base de code unique.

## 🎨 Fonctionnement

### Architecture

```
clients-data.json          → Définit borderRadius et shadow par client
     ↓
set-client.js             → Génère client-design.css avec CSS variables
     ↓
client-design.css         → :root { --client-radius: ..., --client-shadow: ... }
     ↓
tailwind.config.mjs       → borderRadius.DEFAULT et boxShadow.lg utilisent les variables
     ↓
Composants (.astro)       → Classes .rounded et .shadow-lg s'adaptent automatiquement
```

## 📐 Border Radius

### Valeurs disponibles

| Clé       | Valeur CSS  | Pixels | Usage                          |
|-----------|-------------|--------|--------------------------------|
| `none`    | `0px`       | 0px    | Aucun arrondi (style minimal)  |
| `sm`      | `0.125rem`  | 2px    | Très léger arrondi             |
| `default` | `0.25rem`   | 4px    | Arrondi standard Tailwind      |
| `md`      | `0.375rem`  | 6px    | Arrondi moyen                  |
| `lg`      | `0.5rem`    | 8px    | Arrondi confortable (défaut)   |
| `xl`      | `0.75rem`   | 12px   | Arrondi prononcé               |
| `2xl`     | `1rem`      | 16px   | Très arrondi                   |
| `3xl`     | `1.5rem`    | 24px   | Extrêmement arrondi            |
| `full`    | `9999px`    | ∞      | Cercle parfait (éviter)        |

### Classes affectées

**✅ Affectées** (utilisent `var(--client-radius)`) :
- `.rounded` → S'adapte au design system du client

**⚡ Non affectées** (valeurs fixes intentionnelles) :
- `.rounded-sm`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`, `.rounded-2xl`, `.rounded-3xl` → Valeurs fixes pour variantes contextuelles
- `.rounded-full` → Toujours circulaire (boutons close, avatars, badges)
- `.rounded-t-*`, `.rounded-b-*`, etc. → Arrondis directionnels

## 🎭 Box Shadow

### Valeurs disponibles

| Clé       | Valeur CSS                                                           | Usage                          |
|-----------|----------------------------------------------------------------------|--------------------------------|
| `none`    | `none`                                                               | Pas d'ombre                    |
| `sm`      | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                     | Ombre subtile                  |
| `default` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`    | Ombre standard                 |
| `md`      | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Ombre moyenne                  |
| `lg`      | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Ombre large (défaut)         |
| `xl`      | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Ombre très prononcée        |
| `2xl`     | `0 25px 50px -12px rgb(0 0 0 / 0.25)`                               | Ombre dramatique               |

### Classes affectées

**✅ Affectées** (utilisent `var(--client-shadow)`) :
- `.shadow-lg` → S'adapte au design system du client

**⚡ Non affectées** (valeurs fixes intentionnelles) :
- `.shadow-sm`, `.shadow-md`, `.shadow-xl`, `.shadow-2xl` → États hover/focus, emphases spéciales
- `.shadow-none` → Disabled state
- `.shadow-inner` → Ombres intérieures

## 🚀 Utilisation

### 1. Définir le design system dans `clients-data.json`

```json
{
  "slug": "martin-plomberie",
  "businessName": "Martin Plomberie",
  // ... autres champs ...
  "designSystem": {
    "borderRadius": "2xl",
    "shadow": "xl"
  }
}
```

### 2. Générer le site

```bash
npm run set-client martin-plomberie
```

Le script va :
1. ✅ Valider les valeurs (erreur si invalide)
2. ✅ Générer `src/styles/client-design.css` avec les CSS variables
3. ✅ Mettre à jour `tailwind.config.mjs` avec les couleurs et fonts
4. ✅ Générer `client.ts` et `index.astro`

### 3. Résultat

Tous les composants utilisant `.rounded` et `.shadow-lg` s'adaptent automatiquement :

```astro
<!-- Ce bouton utilisera borderRadius: 2xl et shadow: xl -->
<button class="bg-primary-500 text-white px-6 py-3 rounded shadow-lg">
  Click me
</button>

<!-- Cette card aussi -->
<div class="bg-white p-6 rounded shadow-lg">
  <h3>Card title</h3>
  <p>Content</p>
</div>
```

## 🎯 Styles prédéfinis

### Style Minimal
```json
{
  "borderRadius": "none",
  "shadow": "sm"
}
```
**Effet** : Lignes droites, ombres discrètes (style corporate, minimaliste)

### Style Modern (défaut)
```json
{
  "borderRadius": "lg",
  "shadow": "lg"
}
```
**Effet** : Équilibré, contemporain, polyvalent

### Style Soft
```json
{
  "borderRadius": "2xl",
  "shadow": "xl"
}
```
**Effet** : Chaleureux, accueillant, friendly

### Style Elegant
```json
{
  "borderRadius": "3xl",
  "shadow": "2xl"
}
```
**Effet** : Luxueux, raffiné, premium

## 🔍 Validation automatique

### JSON Schema (VSCode)

Le fichier `clients-data.json` référence le schéma `clients-data.schema.json` :

```json
{
  "$schema": "./clients-data.schema.json",
  "clients": [...]
}
```

**Avantages** :
- ✅ Autocomplétion IntelliSense dans VSCode
- ✅ Détection d'erreurs en temps réel
- ✅ Documentation des champs au survol

### Script validation

Le script `set-client.js` valide les valeurs avant génération :

```bash
$ npm run set-client martin-plomberie

# Si borderRadius invalide :
❌ Erreur: borderRadius "invalid" invalide pour martin-plomberie
   Valeurs acceptées: none, sm, default, md, lg, xl, 2xl, 3xl, full
   📖 Référence:
      - none: 0px
      - sm: 0.125rem
      - default: 0.25rem
      ...
```

## 📝 Exemples de composants

### Avant (hardcodé)
```astro
<!-- Impossible à personnaliser sans modifier le code -->
<div class="bg-white p-6 rounded-xl shadow-lg">
  Content
</div>
```

### Après (avec design system)
```astro
<!-- S'adapte automatiquement au client -->
<div class="bg-white p-6 rounded shadow-lg">
  Content
</div>
```

## 🎨 Combinaisons recommandées

| Secteur       | borderRadius | shadow | Caractère               |
|---------------|--------------|--------|-------------------------|
| Plomberie     | `lg`         | `lg`   | Professionnel, accessible |
| Chauffage     | `xl`         | `lg`   | Chaleureux, confortable   |
| Électricité   | `md`         | `md`   | Précis, technique         |
| Rénovation    | `lg`         | `xl`   | Solide, imposant          |
| Paysagiste    | `2xl`        | `lg`   | Doux, naturel             |

## ⚠️ Important

### Classes à éviter dans les composants UI réutilisables

❌ **Ne pas utiliser** :
- `.rounded-lg`, `.rounded-xl`, etc. (sauf intention spécifique)
- `.shadow-md`, `.shadow-xl`, etc. (sauf intention spécifique)

✅ **Utiliser à la place** :
- `.rounded` pour les éléments standards
- `.shadow-lg` pour les ombres standards

### Exceptions autorisées

Certains éléments **doivent** garder leurs valeurs fixes :
- `.rounded-full` → Avatars, badges circulaires, boutons close
- `.shadow-2xl` → Featured pricing cards, modales importantes
- `.rounded-t-none` → Comportements contextuels (tabs, accordéons)

## 🔧 Debug

### Vérifier les CSS variables

```bash
# Page de démo
npm run dev
# Ouvrir http://localhost:4321/demo-design-system
```

### Inspecter dans le navigateur

```js
// Console du navigateur
getComputedStyle(document.documentElement).getPropertyValue('--client-radius')
// => "1rem" (pour 2xl)

getComputedStyle(document.documentElement).getPropertyValue('--client-shadow')
// => "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" (pour xl)
```

## 📚 Ressources

- [clients-data.schema.json](scripts/clients-data.schema.json) - Schéma JSON avec validation
- [set-client.js](scripts/set-client.js) - Script de génération avec validation
- [tailwind.config.mjs](tailwind.config.mjs) - Configuration Tailwind avec CSS variables
- [client-design.css](src/styles/client-design.css) - CSS variables générées (auto-généré)

## 🎓 Workflow complet

```bash
# 1. Ajouter un nouveau client dans clients-data.json
# 2. Définir son design system (optionnel, défaut = lg/lg)
{
  "slug": "nouveau-client",
  "designSystem": {
    "borderRadius": "xl",
    "shadow": "lg"
  }
}

# 3. Générer le site
npm run set-client nouveau-client

# 4. Tester
npm run dev

# 5. Vérifier la démo
# http://localhost:4321/demo-design-system

# 6. Build production
npm run build
```

---

**Note** : Si `designSystem` n'est pas défini dans `clients-data.json`, les valeurs par défaut sont utilisées (`borderRadius: "lg"`, `shadow: "lg"`).
