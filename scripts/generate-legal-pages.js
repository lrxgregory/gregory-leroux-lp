import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Génère automatiquement les pages légales (CGU, Mentions légales, Politique de confidentialité)
 * Usage: npm run generate-legal
 */

// ============================================================================
// Templates des pages légales
// ============================================================================

function generateCGU(data) {
	return `---
title: "Conditions générales d'utilisation"
layout: "../layouts/MarkdownLayout.astro"
robots: "noindex, nofollow"
---

En vigueur au ${data.legal.effectiveDate}

Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du site et des services par ${data.owner.businessName} et de définir les conditions d'accès et d'utilisation des services par « l'Utilisateur ».

Les présentes CGU sont accessibles sur le site à la rubrique «CGU».

**ARTICLE 1 : Les mentions légales**

L'édition et la direction de la publication du site ${data.owner.website.url} est assurée par ${data.owner.fullName}, domicilié ${data.owner.address.street} à ${data.owner.address.city}.\\
Adresse e-mail ${data.owner.email}.

L'hébergeur du site ${data.owner.website.url} est la société ${data.hosting.provider}, dont le siège social est situé au ${data.hosting.address}, ${data.hosting.country}.${data.hosting.contact ? `\\nContact : ${data.hosting.contact}` : ''}

**ARTICLE 2 : Accès au site**

Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.

**ARTICLE 3 : Collecte des données**

Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.

En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit :

- par mail à l'adresse email ${data.owner.email}

**ARTICLE 4 : Propriété intellectuelle**

Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son...) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.

L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.

Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l'autorisation expresse de l'exploitant du site Internet constituerait une contrefaçon sanctionnée par l'article L 335-2 et suivants du Code de la propriété intellectuelle.

Il est rappelé conformément à l'article L122-5 du Code de propriété intellectuelle que l'Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l'auteur et sa source.

**ARTICLE 5 : Responsabilité**

Les sources des informations diffusées sur le site ${data.owner.website.url} sont réputées fiables mais le site ne garantit pas qu'il soit exempt de défauts, d'erreurs ou d'omissions.

Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle. Malgré des mises à jour régulières, le site ${data.owner.website.url} ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication. De même, le site ne peut être tenue responsable de l'utilisation et de l'interprétation de l'information contenue dans ce site.

Le site ${data.owner.website.url} ne peut être tenu pour responsable d'éventuels virus qui pourraient infecter l'ordinateur ou tout matériel informatique de l'Internaute, suite à une utilisation, à l'accès, ou au téléchargement provenant de ce site.

La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.

**ARTICLE 6 : Liens hypertextes**

Des liens hypertextes peuvent être présents sur le site. L'Utilisateur est informé qu'en cliquant sur ces liens, il sortira du site ${data.owner.website.url}. Ce dernier n'a pas de contrôle sur les pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.

**ARTICLE 7 : Cookies**

L'Utilisateur est informé que lors de ses visites sur le site, un cookie peut s'installer automatiquement sur son logiciel de navigation.

Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l'ordinateur de l'Utilisateur par votre navigateur et qui sont nécessaires à l'utilisation du site ${data.owner.website.url}. Les cookies ne contiennent pas d'information personnelle et ne peuvent pas être utilisés pour identifier quelqu'un. Un cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains cookies expirent à la fin de la visite de l'Utilisateur, d'autres restent.

L'information contenue dans les cookies est utilisée pour améliorer le site ${data.owner.website.url}.

En naviguant sur le site, l'utilisateur les accepte.\\
L'Utilisateur doit toutefois donner son consentement quant à l'utilisation de certains cookies.\\
A défaut d'acceptation, l'Utilisateur est informé que certaines fonctionnalités ou pages risquent de lui être refusées.\\
L'Utilisateur pourra désactiver ces cookies par l'intermédiaire des paramètres figurant au sein de son logiciel de navigation.

**ARTICLE 8 : Droit applicable et juridiction compétente**

La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.\\
Pour toute question relative à l'application des présentes CGU, vous pouvez joindre l'éditeur aux coordonnées inscrites à l'ARTICLE 1.
`
}

function generateMentionsLegales(data) {
	return `---
title: "Mentions légales"
layout: "../layouts/MarkdownLayout.astro"
robots: "noindex, nofollow"
---

En vigueur au ${data.legal.effectiveDate}

Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l'économie numérique, il est porté à la connaissance des utilisateurs et visiteurs, ci-après l' "**Utilisateur**", du site [${data.owner.website.name}](${data.owner.website.url}), ci-après le "**Site**", les présentes mentions légales.

La connexion et la navigation sur le Site par l'Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.

Ces dernières sont accessibles sur le Site à la rubrique "**Mentions légales**".

EDITION DU SITE

L'édition et la direction de la publication du Site est assurée par ${data.owner.fullName}, domicilié ${data.owner.address.street} ${data.owner.address.city}, dont l'adresse e-mail <${data.owner.email}>.

ci-après l'"**Editeur**".

HEBERGEUR

L'hébergeur du Site est la société ${data.hosting.provider}, dont le siège social est situé au ${data.hosting.address}, ${data.hosting.country}.

ACCES AU SITE

Le Site est normalement accessible, à tout moment, à l'Utilisateur. Toutefois, l'Editeur pourra, à tout moment, suspendre, limiter ou interrompre le Site afin de procéder, notamment, à des mises à jour ou des modifications de son contenu. L'Editeur ne pourra en aucun cas être tenu responsable des conséquences éventuelles de cette indisponibilité sur les activités de l'Utilisateur.

COLLECTE DES DONNEES

Le Site assure à l'Utilisateur une collecte et un traitement des données personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers aux libertés et dans le respect de la règlementation applicable en matière de traitement des données à caractère personnel conformément au règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (ci-après, ensemble, la "**Règlementation applicable en matière de protection des Données à caractère personnel**").

En vertu de la Règlementation applicable en matière de protection des Données à caractère personnel, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur peut exercer ce droit :

- par mail à l'adresse email <${data.owner.email}>

Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site﻿, sans autorisation expresse de l'Editeur est prohibée et pourra entraîner des actions et poursuites judiciaires telles que prévues par la règlementation en vigueur.
`
}

function generatePolitiqueConfidentialite(data) {
	const thirdPartySection = data.legal.thirdPartyServices
		.map(service => {
			const privacyLink = service.privacyPolicy
				? ` [Politique de confidentialité](${service.privacyPolicy}).`
				: ' (traitement interne, aucune transmission à des tiers).'
			return `- **${service.name}** : ${service.purpose}. Données collectées : ${service.dataShared}.${privacyLink}`
		})
		.join('\n')

	return `---
title: "Politique de confidentialité"
layout: "../layouts/MarkdownLayout.astro"
---

**ARTICLE 1 : PRÉAMBULE**

La présente politique de confidentialité a pour but d'informer les utilisateurs du site :

- Sur la manière dont sont collectées leurs données personnelles. Sont considérées comme des données personnelles, toute information permettant d'identifier un utilisateur. À ce titre, il peut s'agir : de ses noms et prénoms, de son âge, de son adresse postale ou email, de sa localisation ou encore de son adresse IP (liste non exhaustive).
- Sur les droits dont ils disposent concernant ces données.
- Sur la personne responsable du traitement des données à caractère personnel collectées et traitées.
- Sur les destinataires de ces données personnelles.
- Sur la politique du site en matière de cookies.

Cette politique complète les [mentions légales](/mentions-legales) et les [Conditions Générales d'Utilisation](/cgu) consultables par les utilisateurs.

**ARTICLE 2 : PRINCIPES RELATIFS À LA COLLECTE ET AU TRAITEMENT DES DONNÉES PERSONNELLES**

Conformément à l'article 5 du Règlement européen 2016/679, les données à caractère personnel sont :

- Traitées de manière licite, loyale et transparente au regard de la personne concernée ;
- Collectées pour des finalités déterminées (cf. Article 3.1 des présentes), explicites et légitimes, et ne pas être traitées ultérieurement d'une manière incompatible avec ces finalités ;
- Adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités pour lesquelles elles sont traitées ;
- Exactes et, si nécessaire, tenues à jour. Toutes les mesures raisonnables doivent être prises pour que les données à caractère personnel qui sont inexactes, eu égard aux finalités pour lesquelles elles sont traitées, soient effacées ou rectifiées sans tarder ;
- Conservées sous une forme permettant l'identification des personnes concernées pendant une durée n'excédant pas celle nécessaire au regard des finalités pour lesquelles elles sont traitées ;
- Traitées de manière à garantir une sécurité appropriée des données collectées, y compris la protection contre le traitement non autorisé ou illicite et contre la perte, la destruction ou les dégâts d'origine accidentelle, à l'aide de mesures techniques ou organisationnelles appropriées.

**ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES DANS LE CADRE DE LA NAVIGATION SUR LE SITE**

**Article 3.1 : Données collectées**

Les données personnelles collectées dans le cadre de notre activité sont les suivantes :

- **Nom et prénom** (via le formulaire de contact ${data.features.booking ? 'et la prise de rendez-vous' : ''}) ;
- **Adresse email** (via le formulaire de contact ${data.features.booking ? 'et la prise de rendez-vous' : ''}) ;
- **Numéro de téléphone** (optionnel, via le formulaire de contact ${data.features.booking ? 'et la prise de rendez-vous' : ''}) ;
- **Message ou demande** (via le formulaire de contact) ;${data.features.booking ? '\n- **Détails des rendez-vous** (date, heure, type de service souhaité) ;' : ''}
- **Adresse IP et données de navigation** (via les cookies et outils d'analyse).

Ces données sont collectées pour :

${data.features.booking ? '- Gérer les réservations et envoyer des confirmations de rendez-vous ;\n' : ''}- Répondre aux demandes de contact et aux demandes de devis ;${data.features.newsletter ? '\n- Gérer l\'inscription à notre newsletter et envoyer des informations ;' : ''}
- Réaliser des statistiques anonymes sur l'utilisation du site ;
- Améliorer l'expérience utilisateur et la qualité de nos services.

**Article 3.2 : Mode de collecte des données**

Lorsque vous utilisez notre site, les données sont collectées de deux façons :

1. **Données fournies directement par l'utilisateur** via les formulaires (inscription ou contact).
2. **Données collectées automatiquement** via les cookies :
   - Adresse IP ;
   - Données de navigation (pages visitées, durée des sessions, etc.).

**Article 3.3 : Hébergement des données**

Le site **${data.owner.website.name}** est hébergé par :
**${data.hosting.provider}**
Adresse : ${data.hosting.address}, ${data.hosting.country}${data.hosting.contact ? `\nContact : ${data.hosting.contact}` : ''}

Les données collectées sont stockées dans des centres de données sécurisés.

**Article 3.4 : Transmission des données à des tiers**

${data.legal.thirdPartyServices.length > 0 ? `Les données personnelles peuvent être partagées avec les services tiers suivants :\n\n${thirdPartySection}` : 'Aucune donnée personnelle n\'est partagée avec des tiers.'}

**Article 3.5 : Politique en matière de cookies**

Les cookies utilisés sur le site servent à :

- Améliorer votre expérience utilisateur ;
- Réaliser des analyses statistiques anonymes.

Lors de votre première visite, une bannière de consentement s'affiche pour vous permettre d'accepter ou de refuser les cookies non essentiels.

**ARTICLE 4 : RESPONSABLE DU TRAITEMENT DES DONNÉES ET DÉLÉGUÉ À LA PROTECTION DES DONNÉES**

**Article 4.1 : Le responsable du traitement des données**

Les données personnelles sont collectées et traitées par :
**${data.owner.businessName}**
**Adresse** : ${data.owner.address.street}, ${data.owner.address.postalCode} ${data.owner.address.city}
**Email** : ${data.owner.email}

**Article 4.2 : Le délégué à la protection des données**

Le délégué à la protection des données est :
**${data.owner.fullName}**
**Email** : ${data.owner.email}

Si vous estimez que vos droits ne sont pas respectés, vous pouvez contacter la CNIL : [https://www.cnil.fr](https://www.cnil.fr).

**ARTICLE 5 : LES DROITS DE L'UTILISATEUR EN MATIÈRE DE COLLECTE ET DE TRAITEMENT DES DONNÉES**

Conformément au RGPD, tout utilisateur dispose des droits suivants :

- **Droit d'accès** : connaître les données collectées ;
- **Droit de rectification** : corriger ou mettre à jour les données ;
- **Droit à l'effacement** : demander la suppression des données ;
- **Droit de limitation** : restreindre le traitement des données ;
- **Droit d'opposition** : refuser l'utilisation des données pour certaines finalités ;
- **Droit à la portabilité** : récupérer ses données dans un format lisible.

Pour exercer ces droits, contactez-nous à l'adresse suivante :
**Email** : ${data.owner.email}

**ARTICLE 6 : DURÉE DE CONSERVATION DES DONNÉES**

Les données personnelles sont conservées pour les durées suivantes :

- Adresse email : ${data.legal.dataRetention.emails} ;
- Données analytiques : ${data.legal.dataRetention.analytics}.

**ARTICLE 7 : CONDITIONS DE MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ**

La présente politique peut être modifiée pour s'adapter aux évolutions légales ou techniques.

**Dernière mise à jour : ${data.legal.lastUpdate}.**
`
}

// ============================================================================
// Fonction principale
// ============================================================================

function generateLegalPages() {
	// Lit le fichier de configuration
	const configPath = path.join(__dirname, 'legal-info.json')

	if (!fs.existsSync(configPath)) {
		console.error('❌ Fichier legal-info.json introuvable dans scripts/')
		console.error('   Créez d\'abord ce fichier avec vos informations légales')
		process.exit(1)
	}

	const legalData = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

	console.log(`📄 Génération des pages légales pour: ${legalData.owner.businessName}\n`)

	// Génère les 3 pages
	const pages = [
		{ name: 'CGU', filename: 'cgu.md', content: generateCGU(legalData) },
		{ name: 'Mentions légales', filename: 'mentions-legales.md', content: generateMentionsLegales(legalData) },
		{ name: 'Politique de confidentialité', filename: 'politiques-de-confidentialite.md', content: generatePolitiqueConfidentialite(legalData) }
	]

	const pagesDir = path.join(__dirname, '../src/pages')

	pages.forEach(page => {
		const filePath = path.join(pagesDir, page.filename)
		fs.writeFileSync(filePath, page.content, 'utf-8')
		console.log(`   ✅ ${page.name} → ${page.filename}`)
	})

	console.log(`\n✅ Pages légales générées avec succès!`)
	console.log(`   📂 Emplacement: src/pages/`)
	console.log(`   🌐 URLs:`)
	console.log(`      - ${legalData.owner.website.url}/cgu`)
	console.log(`      - ${legalData.owner.website.url}/mentions-legales`)
	console.log(`      - ${legalData.owner.website.url}/politiques-de-confidentialite`)
	console.log(`\n💡 Pour modifier: Éditez scripts/legal-info.json puis relancez npm run generate-legal`)
}

// Exécution
generateLegalPages()
