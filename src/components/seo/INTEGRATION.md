# Intégration automatique des Schemas SEO

Ce guide explique comment les schemas SEO sont automatiquement générés et intégrés pour les clients **Pro** et **Premium**.

## 🎯 Fonctionnement automatique

Quand tu génères un site avec `npm run set-client <slug>`, les schemas SEO sont automatiquement configurés selon le plan tarifaire du client :

### Vitrine (490€)
- ❌ Pas de schemas avancés
- ✅ Meta tags SEO de base uniquement

### Pro (690€) & Premium
- ✅ **LocalBusinessSchema** automatiquement rempli
- ✅ **OrganizationSchema** automatiquement rempli
- ✅ **BreadcrumbSchema** disponible
- ✅ Données extraites de `clients-data.json`

## 📝 Configuration dans clients-data.json

### Données obligatoires (déjà utilisées)
Ces données sont déjà dans le JSON et seront utilisées automatiquement :

```json
{
  "slug": "dupont-chauffage",
  "businessName": "Dupont Chauffage",
  "description": "...",
  "sector": "heating",
  "phone": "09 52 45 89 33",
  "email": "contact@dupont-chauffage.fr",
  "street": "15 Rue de la République",
  "city": "Valenciennes",
  "postalCode": "59300",
  "coordinates": { "lat": 50.3584, "lng": 3.5252 },
  "hours": ["Lundi - Vendredi : 8h - 18h"],
  "serviceAreas": ["Valenciennes", "Cambrai"],
  "googleReviews": { "rating": 4.8, "count": 52 }
}
```

### Données SEO avancées (nouvelles - optionnelles)

Ajoute cette section pour enrichir les schemas :

```json
{
  "seoAdvanced": {
    "businessType": "Plumber",  // Type Schema.org précis
    "priceRange": "€€",         // Fourchette de prix
    "foundingDate": "2010-03-15", // Date de création (ISO 8601)
    "founder": "Jean Dupont",    // Fondateur
    "logo": "https://example.com/logo.png" // URL du logo (optionnel)
  },
  "socialMedia": {
    "facebook": "https://www.facebook.com/dupontchauffage",
    "instagram": "https://www.instagram.com/dupontchauffage",
    "linkedin": "https://www.linkedin.com/company/dupontchauffage",
    "twitter": "https://twitter.com/dupontchauffage"
  }
}
```

## 🔧 Intégration dans le Layout

Pour les clients **Pro/Premium**, ajoute les schemas dans `src/layouts/Layout.astro` :

```astro
---
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema.astro'
import OrganizationSchema from '@/components/seo/OrganizationSchema.astro'
import { clientData, getClientFeatures } from '@/config/client'

const features = getClientFeatures()
const isPro = features.advancedSEO // true pour Pro & Premium
---

<html>
  <head>
    <title>{title}</title>
    <!-- ... autres meta tags ... -->

    {isPro && clientData.seo.advanced && (
      <>
        <!-- LocalBusiness Schema pour référencement local -->
        <LocalBusinessSchema
          businessName={clientData.business.name}
          businessType={clientData.seo.advanced.businessType}
          description={clientData.business.description}
          telephone={clientData.contact.phone.main}
          email={clientData.contact.email.main}
          priceRange={clientData.seo.advanced.priceRange}
          address={{
            streetAddress: clientData.contact.address.street,
            addressLocality: clientData.contact.address.city,
            postalCode: clientData.contact.address.postalCode,
            addressCountry: 'FR'
          }}
          geo={{
            latitude: clientData.location.coordinates.lat,
            longitude: clientData.location.coordinates.lng
          }}
          openingHours={clientData.contact.hours.schedule}
          serviceArea={clientData.location.serviceAreas.cities}
          aggregateRating={{
            ratingValue: clientData.reviews.rating,
            reviewCount: clientData.reviews.count
          }}
          url={Astro.url.origin}
          sameAs={clientData.socialMedia ? Object.values(clientData.socialMedia).filter(Boolean) : []}
        />

        <!-- Organization Schema pour identité de marque -->
        <OrganizationSchema
          name={clientData.business.name}
          url={Astro.url.origin}
          logo={clientData.seo.advanced.logo}
          description={clientData.business.description}
          email={clientData.contact.email.main}
          telephone={clientData.contact.phone.main}
          address={{
            streetAddress: clientData.contact.address.street,
            addressLocality: clientData.contact.address.city,
            postalCode: clientData.contact.address.postalCode,
            addressCountry: 'FR'
          }}
          sameAs={clientData.socialMedia ? Object.values(clientData.socialMedia).filter(Boolean) : []}
          foundingDate={clientData.seo.advanced.foundingDate}
          founder={clientData.seo.advanced.founder}
        />
      </>
    )}
  </head>
  <body>
    <slot />
  </body>
</html>
```

## 📊 Types de business Schema.org

Utilise le type le plus précis possible dans `businessType` :

### Services à domicile
- `Plumber` - Plombier
- `Electrician` - Électricien
- `HVACBusiness` - Chauffagiste / Climatisation
- `GeneralContractor` - Entrepreneur général
- `Locksmith` - Serrurier
- `MovingCompany` - Déménageur
- `ProfessionalService` - Service professionnel générique

### Commerce
- `Restaurant` - Restaurant
- `Store` - Boutique
- `AutoRepair` - Garage automobile
- `BeautySalon` - Salon de beauté
- `HealthAndBeautyBusiness` - Bien-être

### Santé
- `Dentist` - Dentiste
- `Physician` - Médecin
- `MedicalClinic` - Clinique

### Immobilier
- `RealEstateAgent` - Agent immobilier

Liste complète : https://schema.org/LocalBusiness

## ✅ Checklist de déploiement

Avant de livrer un site Pro/Premium :

1. ✅ Remplis `seoAdvanced` dans `clients-data.json`
2. ✅ Ajoute au moins Facebook ou Instagram dans `socialMedia`
3. ✅ Vérifie que `businessType` est précis (pas juste "LocalBusiness")
4. ✅ Génère le site : `npm run set-client <slug>`
5. ✅ Vérifie le Layout contient les schemas
6. ✅ Teste avec Google Rich Results Test : https://search.google.com/test/rich-results
7. ✅ Vérifie le JSON-LD dans le code source

## 🧪 Tester les schemas

### En développement
```bash
npm run dev
# Ouvre http://localhost:4321
# Clique droit > Afficher le code source
# Cherche <script type="application/ld+json">
```

### En production
1. Va sur https://search.google.com/test/rich-results
2. Entre l'URL du site client
3. Vérifie que Google détecte :
   - LocalBusiness ✅
   - Organization ✅
   - AggregateRating ✅

## 💡 Exemples de résultats

Avec ces schemas, Google affichera :

```
🔍 Dupont Chauffage - Valenciennes
★★★★★ 4.8 (52 avis Google)
Plombier • €€ • Ouvert aujourd'hui jusqu'à 18h
📍 15 Rue de la République, 59300 Valenciennes
📞 09 52 45 89 33
```

Au lieu de juste :

```
🔍 Dupont Chauffage - Valenciennes
```

C'est ça la différence entre Vitrine et Pro ! 🚀
