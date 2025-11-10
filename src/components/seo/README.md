# SEO Schema Components

Composants JSON-LD (Schema.org) pour améliorer le référencement et l'affichage dans les résultats de recherche Google.

> 🚀 **Intégration automatique** : Ces schemas sont automatiquement configurés pour les clients Pro/Premium via `npm run set-client`. Voir [INTEGRATION.md](./INTEGRATION.md) pour les détails.

## 📦 Composants disponibles

### 1. LocalBusinessSchema
**Pour:** Entreprises locales (plombiers, électriciens, restaurants, boutiques, etc.)

**Bénéfices:**
- Affichage dans Google Maps et recherche locale
- Rich snippets avec note, horaires, téléphone
- Meilleur positionnement dans "près de chez moi"

**Utilisation:**
```astro
---
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema.astro'
---

<LocalBusinessSchema
  businessName="Plomberie Martin"
  businessType="Plumber"
  description="Plombier professionnel à Paris depuis 2010"
  image="https://example.com/logo.png"
  telephone="+33612345678"
  email="contact@plomberie-martin.fr"
  priceRange="€€"
  address={{
    streetAddress: "15 rue de la République",
    addressLocality: "Paris",
    postalCode: "75001",
    addressCountry: "FR"
  }}
  geo={{
    latitude: 48.8566,
    longitude: 2.3522
  }}
  openingHours={[
    "Mo-Fr 08:00-18:00",
    "Sa 09:00-12:00"
  ]}
  serviceArea={["Paris", "Boulogne-Billancourt", "Neuilly-sur-Seine"]}
  aggregateRating={{
    ratingValue: 4.8,
    reviewCount: 127
  }}
  url="https://plomberie-martin.fr"
  sameAs={[
    "https://www.facebook.com/plomberiemartin",
    "https://www.instagram.com/plomberiemartin"
  ]}
/>
```

**Types de business courants:**
- `Plumber` - Plombier
- `Electrician` - Électricien
- `Restaurant` - Restaurant
- `Store` - Boutique
- `AutoRepair` - Garage
- `BeautySalon` - Salon de beauté
- `Dentist` - Dentiste
- `RealEstateAgent` - Agent immobilier
- Liste complète: https://schema.org/LocalBusiness

---

### 2. OrganizationSchema
**Pour:** Identité de marque globale

**Bénéfices:**
- Logo affiché dans Google
- Knowledge Panel Google
- Réseaux sociaux associés

**Utilisation:**
```astro
---
import OrganizationSchema from '@/components/seo/OrganizationSchema.astro'
---

<OrganizationSchema
  name="Plomberie Martin"
  url="https://plomberie-martin.fr"
  logo="https://plomberie-martin.fr/logo.png"
  description="Expert en plomberie depuis 2010"
  email="contact@plomberie-martin.fr"
  telephone="+33612345678"
  address={{
    streetAddress: "15 rue de la République",
    addressLocality: "Paris",
    postalCode: "75001",
    addressCountry: "FR"
  }}
  sameAs={[
    "https://www.facebook.com/plomberiemartin",
    "https://www.linkedin.com/company/plomberiemartin"
  ]}
  foundingDate="2010-03-15"
  founder="Jean Martin"
/>
```

---

### 3. BreadcrumbSchema
**Pour:** Navigation fil d'Ariane

**Bénéfices:**
- Fil d'Ariane visible dans Google
- Meilleure compréhension de la structure du site

**Utilisation:**
```astro
---
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema.astro'
---

<BreadcrumbSchema
  items={[
    { name: "Accueil", url: "https://example.com/" },
    { name: "Services", url: "https://example.com/services" },
    { name: "Plomberie", url: "https://example.com/services/plomberie" }
  ]}
/>
```

---

### 4. FAQ Schema (déjà existant)
**Voir:** `src/components/blocks/FAQ/FAQ.astro`

Le composant FAQ inclut déjà le schema JSON-LD quand `includeStructuredData={true}`.

---

## 🎯 Où placer ces composants ?

### Dans le Layout principal (`src/layouts/Layout.astro`)
Pour les données globales (Organization, LocalBusiness) :

```astro
---
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema.astro'
import OrganizationSchema from '@/components/seo/OrganizationSchema.astro'
---

<html>
  <head>
    <!-- Autres meta tags -->

    <!-- SEO Schemas -->
    <LocalBusinessSchema {...businessData} />
    <OrganizationSchema {...orgData} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Dans les pages spécifiques
Pour les breadcrumbs ou données page-spécifiques :

```astro
---
import Layout from '@/layouts/Layout.astro'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema.astro'
---

<Layout>
  <BreadcrumbSchema items={breadcrumbItems} />

  <!-- Contenu de la page -->
</Layout>
```

---

## 🧪 Tester vos schemas

1. **Rich Results Test (Google)**
   - https://search.google.com/test/rich-results
   - Testez votre URL en production

2. **Schema Markup Validator**
   - https://validator.schema.org/
   - Collez votre code HTML complet

3. **Dans le code source**
   - Affichez le code source de votre page
   - Cherchez `<script type="application/ld+json">`
   - Vérifiez que le JSON est valide

---

## 💡 Bonnes pratiques

1. **Données réelles uniquement**
   - N'inventez pas de fausses notes ou avis
   - Google pénalise les données trompeuses

2. **Cohérence**
   - Les données schema doivent correspondre au contenu visible
   - Même nom, adresse, téléphone partout

3. **Un schema par type et par page**
   - Ne dupliquez pas LocalBusiness sur chaque page
   - Mettez-le dans le Layout global

4. **Mise à jour**
   - Mettez à jour les horaires, notes, etc. régulièrement
   - Données obsolètes = mauvaise expérience utilisateur

---

## 🎁 Offre Pro vs Vitrine

### Vitrine (490€)
- FAQ Schema (basique)
- Meta tags SEO standards

### Pro (690€) - SEO Avancé
- ✅ LocalBusiness Schema complet
- ✅ Organization Schema
- ✅ Breadcrumb Schema
- ✅ FAQ Schema
- ✅ AggregateRating integration
- ✅ Configuration personnalisée par client

Ces schemas sont la raison pour laquelle l'offre Pro inclut "Optimisation SEO avancée".
