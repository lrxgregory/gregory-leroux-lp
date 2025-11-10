import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Génère un site A&D unique pour cold emailing
 * - Client.ts (Premium)
 * - Index.astro avec variants randomisés
 * - Tailwind avec fonts et couleurs personnalisées
 * - Design system élégant randomisé
 */

// ============================================================================
// Configuration des randomisations
// ============================================================================

// Paires de polices cohérentes (body + headings toujours différents)
const FONT_PAIRS = [
	{
		name: 'Inter + Outfit',
		body: { import: '@fontsource-variable/inter', family: 'Inter Variable' },
		heading: { import: '@fontsource-variable/outfit', family: 'Outfit Variable' }
	},
	{
		name: 'Plus Jakarta Sans + Outfit',
		body: { import: '@fontsource-variable/plus-jakarta-sans', family: 'Plus Jakarta Sans Variable' },
		heading: { import: '@fontsource-variable/outfit', family: 'Outfit Variable' }
	},
	{
		name: 'Sora + Work Sans',
		body: { import: '@fontsource-variable/sora', family: 'Sora Variable' },
		heading: { import: '@fontsource-variable/work-sans', family: 'Work Sans Variable' }
	},
	{
		name: 'Manrope + Outfit',
		body: { import: '@fontsource-variable/manrope', family: 'Manrope Variable' },
		heading: { import: '@fontsource-variable/outfit', family: 'Outfit Variable' }
	},
	{
		name: 'DM Sans + Plus Jakarta Sans',
		body: { import: '@fontsource-variable/dm-sans', family: 'DM Sans Variable' },
		heading: { import: '@fontsource-variable/plus-jakarta-sans', family: 'Plus Jakarta Sans Variable' }
	},
	{
		name: 'Nunito Sans + Sora',
		body: { import: '@fontsource-variable/nunito-sans', family: 'Nunito Sans Variable' },
		heading: { import: '@fontsource-variable/sora', family: 'Sora Variable' }
	},
	{
		name: 'Work Sans + Manrope',
		body: { import: '@fontsource-variable/work-sans', family: 'Work Sans Variable' },
		heading: { import: '@fontsource-variable/manrope', family: 'Manrope Variable' }
	},
	{
		name: 'Inter + Work Sans',
		body: { import: '@fontsource-variable/inter', family: 'Inter Variable' },
		heading: { import: '@fontsource-variable/work-sans', family: 'Work Sans Variable' }
	}
]

const DESIGN_SYSTEMS = [
	{
		name: 'modern',
		description: 'Coins arrondis moyens, ombres douces',
		characteristics: ['Équilibré', 'Polyvalent', 'Contemporain']
	},
	{
		name: 'soft',
		description: 'Coins très arrondis, ombres prononcées',
		characteristics: ['Chaleureux', 'Accueillant', 'Friendly']
	},
	{
		name: 'sharp',
		description: 'Coins peu arrondis, bordures visibles',
		characteristics: ['Professionnel', 'Structuré', 'Corporate']
	},
	{
		name: 'minimal',
		description: 'Coins droits, bordures fines, style épuré',
		characteristics: ['Épuré', 'Minimaliste', 'Moderne']
	},
	{
		name: 'elegant',
		description: 'Coins très arrondis, ombres XXL, animations',
		characteristics: ['Luxueux', 'Raffiné', 'Premium']
	}
]

// Valeurs Tailwind exactes pour border-radius
const BORDER_RADIUS_VALUES = {
	none: '0px',
	sm: '0.125rem',      // 2px
	default: '0.25rem',  // 4px
	md: '0.375rem',      // 6px
	lg: '0.5rem',        // 8px
	xl: '0.75rem',       // 12px
	'2xl': '1rem',       // 16px
	'3xl': '1.5rem',     // 24px
	full: '9999px'
}

// Valeurs Tailwind exactes pour box-shadow
const SHADOW_VALUES = {
	none: 'none',
	sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
	default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
	md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
	lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
	xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
	'2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
}

const HERO_VARIANTS = ['home', 'split']
const FEATURES_VARIANTS = ['image', 'cards', 'list']
const FAQ_VARIANTS = ['default', 'grid', 'basic']
const REVIEWS_VARIANTS = ['cards', 'featured']
const GALLERY_COMPONENTS = [
	{
		name: 'ProjectGallery',
		dataPath: 'clientData.projects?.featured',
		prop: 'projects={clientData.projects.featured}'
	},
	{
		name: 'MarqueeGallery',
		dataPath: 'clientData.projects?.marquee',
		prop: 'projects={clientData.projects.marquee}'
	},
	{
		name: 'BeforeAfter',
		dataPath: 'clientData.projects?.beforeAfter',
		prop: 'projects={clientData.projects.beforeAfter}'
	}
]

// ============================================================================
// Fonctions utilitaires
// ============================================================================

function random(array) {
	return array[Math.floor(Math.random() * array.length)]
}

function randomBool() {
	return Math.random() > 0.5
}

/**
 * Échappe les caractères spéciaux pour les chaînes JavaScript/TypeScript
 * @param {string} str - La chaîne à échapper
 * @returns {string} - La chaîne échappée
 */
function escapeString(str) {
	if (typeof str !== 'string') return str
	return str
		.replace(/\\/g, '\\\\')  // Échapper les backslashes
		.replace(/'/g, "\\'")    // Échapper les apostrophes
		.replace(/"/g, '\\"')    // Échapper les guillemets doubles
		.replace(/\n/g, '\\n')   // Échapper les retours à la ligne
		.replace(/\r/g, '\\r')   // Échapper les retours chariot
		.replace(/\t/g, '\\t')   // Échapper les tabulations
}

function hexToHsl(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	if (!result) return null

	let r = parseInt(result[1], 16) / 255
	let g = parseInt(result[2], 16) / 255
	let b = parseInt(result[3], 16) / 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h,
		s,
		l = (max + min) / 2

	if (max === min) {
		h = s = 0
	} else {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6
				break
			case g:
				h = ((b - r) / d + 2) / 6
				break
			case b:
				h = ((r - g) / d + 4) / 6
				break
		}
	}

	return { h: h * 360, s: s * 100, l: l * 100 }
}

function generateColorShades(hex) {
	const hsl = hexToHsl(hex)
	if (!hsl) return null

	return {
		50: `hsl(${hsl.h.toFixed(0)}, ${(hsl.s * 0.8).toFixed(0)}%, 97%)`,
		100: `hsl(${hsl.h.toFixed(0)}, ${(hsl.s * 0.9).toFixed(0)}%, 93%)`,
		200: `hsl(${hsl.h.toFixed(0)}, ${(hsl.s * 0.95).toFixed(0)}%, 83%)`,
		300: `hsl(${hsl.h.toFixed(0)}, ${hsl.s.toFixed(0)}%, 68%)`,
		400: `hsl(${hsl.h.toFixed(0)}, ${hsl.s.toFixed(0)}%, 56%)`,
		500: hex,
		600: `hsl(${hsl.h.toFixed(0)}, ${hsl.s.toFixed(0)}%, ${(hsl.l * 0.8).toFixed(0)}%)`,
		700: `hsl(${hsl.h.toFixed(0)}, ${hsl.s.toFixed(0)}%, ${(hsl.l * 0.65).toFixed(0)}%)`,
		800: `hsl(${hsl.h.toFixed(0)}, ${hsl.s.toFixed(0)}%, ${(hsl.l * 0.5).toFixed(0)}%)`,
		900: `hsl(${hsl.h.toFixed(0)}, ${(hsl.s * 0.8).toFixed(0)}%, ${(hsl.l * 0.35).toFixed(0)}%)`,
		950: `hsl(${hsl.h.toFixed(0)}, ${(hsl.s * 0.7).toFixed(0)}%, ${(hsl.l * 0.25).toFixed(0)}%)`
	}
}

// ============================================================================
// Images faker par secteur (Picsum avec seeds spécifiques)
// ============================================================================

const SECTOR_IMAGES = {
	plumber: {
		seeds: ['plumbing', 'bathroom', 'pipes', 'faucet', 'shower', 'sink', 'toilet', 'water', 'repair', 'tools'],
		keywords: ['plumbing', 'bathroom', 'water', 'pipes', 'repair']
	},
	heating: {
		seeds: ['heating', 'boiler', 'radiator', 'furnace', 'hvac', 'thermostat', 'warmth', 'energy', 'comfort', 'home'],
		keywords: ['heating', 'boiler', 'hvac', 'energy', 'comfort']
	},
	electrician: {
		seeds: ['electrical', 'wiring', 'lights', 'power', 'circuit', 'switch', 'outlet', 'panel', 'voltage', 'energy'],
		keywords: ['electrical', 'wiring', 'lights', 'power', 'energy']
	},
	contractor: {
		seeds: ['construction', 'building', 'renovation', 'tools', 'house', 'work', 'project', 'structure', 'concrete', 'wood'],
		keywords: ['construction', 'building', 'renovation', 'house', 'work']
	},
	landscaper: {
		seeds: ['garden', 'landscape', 'plants', 'grass', 'trees', 'outdoor', 'nature', 'green', 'yard', 'flowers'],
		keywords: ['garden', 'landscape', 'plants', 'nature', 'outdoor']
	},
	other: {
		seeds: ['professional', 'service', 'work', 'business', 'quality', 'expert', 'tools', 'craft', 'skill', 'trade'],
		keywords: ['professional', 'service', 'work', 'business', 'quality']
	}
}

function generateSectorImage(sector, type, index, width = 800, height = 600) {
	const sectorImages = SECTOR_IMAGES[sector] || SECTOR_IMAGES.other
	const seed = sectorImages.seeds[index % sectorImages.seeds.length]
	return `https://picsum.photos/seed/${seed}-${type}-${index}/${width}/${height}`
}

// ============================================================================
// Textes faker par secteur
// ============================================================================

const SECTOR_CONTENT = {
	plumber: {
		services: {
			primary: 'Plomberie générale',
			secondary: 'Dépannage urgence',
			list: ['Réparation fuites', 'Installation sanitaires', 'Débouchage canalisations', 'Remplacement robinetterie']
		},
		hero: {
			title: 'Plombier professionnel',
			description: 'Intervention rapide pour tous vos problèmes de plomberie. Devis gratuit, travail garanti.'
		},
		features: {
			title: 'Nos services de <strong>plomberie</strong>',
			subtitle: 'Réparation, installation et entretien de vos équipements sanitaires. <strong>Artisan qualifié</strong> pour des interventions rapides et durables.'
		},
		faq: {
			question: 'Intervenez-vous en urgence ?',
			answer: 'Oui, nous intervenons 24h/24 pour les fuites importantes et les pannes de plomberie. Délai d\'intervention : 1h en urgence.'
		},
		projects: {
			title1: 'Rénovation salle de bain',
			category1: 'Sanitaires',
			description1: 'Installation complète douche italienne',
			title2: 'Réparation fuite',
			category2: 'Dépannage',
			description2: 'Intervention urgence canalisation'
		}
	},
	heating: {
		services: {
			primary: 'Chauffage et climatisation',
			secondary: 'Pompes à chaleur',
			list: ['Installation chaudières', 'Pompes à chaleur', 'Entretien annuel', 'Dépannage chauffage']
		},
		hero: {
			title: 'Chauffagiste certifié RGE',
			description: 'Installation et entretien de systèmes de chauffage. Éligible aux aides de l\'État.'
		},
		features: {
			title: 'Nos services <strong>certifiés RGE</strong>',
			subtitle: 'Installation, dépannage et entretien de vos systèmes de chauffage et d\'eau chaude. <strong>Artisan certifié RGE</strong> pour des solutions durables et éligibles aux aides.'
		},
		faq: {
			question: 'Quels sont vos délais d\'intervention ?',
			answer: 'Nous intervenons en urgence dans les 2 heures pour les pannes de chauffage. Pour les installations, rendez-vous sous 48h maximum.'
		},
		projects: {
			title1: 'Installation pompe à chaleur',
			category1: 'Chauffage',
			description1: 'PAC air/eau 12kW haute performance',
			title2: 'Entretien chaudière',
			category2: 'Maintenance',
			description2: 'Révision complète chaudière gaz'
		}
	},
	electrician: {
		services: {
			primary: 'Électricité générale',
			secondary: 'Domotique et sécurité',
			list: ['Installation électrique', 'Mise aux normes', 'Domotique', 'Éclairage LED']
		},
		hero: {
			title: 'Électricien qualifié',
			description: 'Installation électrique et mise aux normes. Intervention rapide, travail certifié.'
		},
		features: {
			title: 'Nos services <strong>électriques</strong>',
			subtitle: 'Installation, rénovation et dépannage électrique. <strong>Artisan qualifié</strong> pour des installations sécurisées et aux normes.'
		},
		faq: {
			question: 'Faites-vous les mises aux normes ?',
			answer: 'Oui, nous réalisons toutes les mises aux normes électriques. Diagnostic gratuit et devis détaillé pour la remise en conformité.'
		},
		projects: {
			title1: 'Tableau électrique',
			category1: 'Installation',
			description1: 'Remplacement tableau aux normes',
			title2: 'Éclairage LED',
			category2: 'Rénovation',
			description2: 'Installation spots LED dimmables'
		}
	},
	contractor: {
		services: {
			primary: 'Rénovation générale',
			secondary: 'Gros œuvre',
			list: ['Rénovation complète', 'Extension maison', 'Isolation thermique', 'Aménagement intérieur']
		},
		hero: {
			title: 'Entreprise de rénovation',
			description: 'Rénovation complète et travaux de gros œuvre. Devis gratuit, garantie décennale.'
		},
		features: {
			title: 'Nos services de <strong>rénovation</strong>',
			subtitle: 'Rénovation complète, extension et aménagement. <strong>Entreprise certifiée</strong> pour tous vos projets de construction et rénovation.'
		},
		faq: {
			question: 'Gérez-vous les démarches administratives ?',
			answer: 'Oui, nous vous accompagnons dans toutes les démarches : permis de construire, déclarations préalables, coordination des corps de métier.'
		},
		projects: {
			title1: 'Extension maison',
			category1: 'Gros œuvre',
			description1: 'Extension 30m² avec terrasse',
			title2: 'Rénovation cuisine',
			category2: 'Aménagement',
			description2: 'Cuisine ouverte sur salon'
		}
	},
	landscaper: {
		services: {
			primary: 'Aménagement paysager',
			secondary: 'Entretien espaces verts',
			list: ['Création jardins', 'Élagage arbres', 'Terrasses bois', 'Arrosage automatique']
		},
		hero: {
			title: 'Paysagiste professionnel',
			description: 'Création et entretien d\'espaces verts. Devis gratuit, garantie végétaux.'
		},
		features: {
			title: 'Nos services <strong>paysagers</strong>',
			subtitle: 'Création, aménagement et entretien de vos espaces verts. <strong>Paysagiste qualifié</strong> pour des jardins durables et esthétiques.'
		},
		faq: {
			question: 'Proposez-vous un contrat d\'entretien ?',
			answer: 'Oui, nous proposons des contrats d\'entretien annuels adaptés à vos besoins : tonte, taille, traitement des végétaux.'
		},
		projects: {
			title1: 'Création jardin',
			category1: 'Aménagement',
			description1: 'Jardin paysager avec bassin',
			title2: 'Terrasse bois',
			category2: 'Terrasse',
			description2: 'Terrasse composite 40m²'
		}
	},
	other: {
		services: {
			primary: 'Services professionnels',
			secondary: 'Intervention rapide',
			list: ['Service principal', 'Service secondaire', 'Service complémentaire', 'Service spécialisé']
		},
		hero: {
			title: 'Professionnel qualifié',
			description: 'Services professionnels de qualité. Intervention rapide, devis gratuit.'
		},
		features: {
			title: 'Nos services <strong>professionnels</strong>',
			subtitle: 'Services de qualité adaptés à vos besoins. <strong>Professionnel qualifié</strong> pour des prestations durables et fiables.'
		},
		faq: {
			question: 'Quels sont vos délais d\'intervention ?',
			answer: 'Nous intervenons rapidement selon vos besoins. Devis gratuit et intervention dans les meilleurs délais.'
		},
		projects: {
			title1: 'Réalisation 1',
			category1: 'Service',
			description1: 'Prestation professionnelle complète',
			title2: 'Réalisation 2',
			category2: 'Service',
			description2: 'Intervention spécialisée'
		}
	}
}

// ============================================================================
// Palettes de couleurs par secteur
// ============================================================================

const COLOR_PALETTES = {
	plumber: [
		{ primary: '#2563EB', secondary: '#06B6D4' }, // Bleu + Cyan
		{ primary: '#0EA5E9', secondary: '#3B82F6' }, // Sky + Blue
		{ primary: '#06B6D4', secondary: '#8B5CF6' }, // Cyan + Violet
		{ primary: '#1E40AF', secondary: '#10B981' }  // Blue + Emerald
	],
	heating: [
		{ primary: '#DC2626', secondary: '#F59E0B' }, // Red + Amber
		{ primary: '#EA580C', secondary: '#EF4444' }, // Orange + Red
		{ primary: '#D97706', secondary: '#F97316' }, // Amber + Orange
		{ primary: '#B91C1C', secondary: '#DC2626' }  // Red + Red variant
	],
	electrician: [
		{ primary: '#F59E0B', secondary: '#EAB308' }, // Amber + Yellow
		{ primary: '#EAB308', secondary: '#84CC16' }, // Yellow + Lime
		{ primary: '#84CC16', secondary: '#22C55E' }, // Lime + Green
		{ primary: '#FBBF24', secondary: '#F59E0B' }  // Yellow + Amber
	],
	contractor: [
		{ primary: '#6B7280', secondary: '#374151' }, // Gray + Gray dark
		{ primary: '#4B5563', secondary: '#6366F1' }, // Gray + Indigo
		{ primary: '#374151', secondary: '#059669' }, // Gray dark + Emerald
		{ primary: '#1F2937', secondary: '#7C3AED' }  // Gray darker + Violet
	],
	landscaper: [
		{ primary: '#059669', secondary: '#84CC16' }, // Emerald + Lime
		{ primary: '#10B981', secondary: '#22C55E' }, // Emerald + Green
		{ primary: '#22C55E', secondary: '#65A30D' }, // Green + Green dark
		{ primary: '#16A34A', secondary: '#15803D' }  // Green + Green darker
	],
	other: [
		{ primary: '#8B5CF6', secondary: '#A855F7' }, // Violet + Purple
		{ primary: '#A855F7', secondary: '#C084FC' }, // Purple + Purple light
		{ primary: '#EC4899', secondary: '#F472B6' }, // Pink + Pink light
		{ primary: '#EF4444', secondary: '#F87171' }  // Red + Red light
	]
}

function getRandomColorPalette(sector) {
	const palettes = COLOR_PALETTES[sector] || COLOR_PALETTES.other
	return random(palettes)
}

// ============================================================================
// Génération du client.ts
// ============================================================================

function generateClientConfig(client, slug) {
	// Récupère le contenu spécifique au secteur
	const sectorContent = SECTOR_CONTENT[client.sector] || SECTOR_CONTENT.other

	// Logique hybride : utilise les données client si disponibles, sinon les fake data
	const getClientOrFake = (clientData, fakeData) => clientData || fakeData
	const content = `// Client Configuration - ${client.businessName}
// Auto-generated by: npm run set-client ${slug}

import type { PricingPlan, PlanFeatures } from './pricing'
import { getPlanFeatures } from './pricing'

export interface ClientConfig {
	pricingPlan: PricingPlan
	featureOverrides?: Partial<PlanFeatures>
	business: {
		name: string
		legalName?: string
		tagline: string
		description: string
		industry: 'plumber' | 'electrician' | 'heating' | 'contractor' | 'landscaper' | 'other'
	}
	contact: {
		phone: {
			main: string
			mainLink: string
			secondary?: string
			secondaryLink?: string
			whatsapp?: string
			whatsappMessage?: string
		}
		email: {
			main: string
			display: string
		}
		address: {
			street: string
			city: string
			postalCode: string
			fullAddress: string
			googleMapsLink?: string
		}
		hours: {
			schedule: string[]
			emergency?: boolean
		}
	}
	location: {
		coordinates: {
			lat: number
			lng: number
		}
		mapEmbedUrl: string
		serviceAreas: {
			title: string
			description: string
			cities: string[]
		}
	}
	reviews: {
		platform: 'google' | 'yelp' | 'trustpilot'
		rating: number
		count: number
		link: string
	}
	socialMedia?: {
		facebook?: string
		instagram?: string
		linkedin?: string
		twitter?: string
		messengerUrl?: string
		instagramDmUrl?: string
	}
	whatsapp?: {
		enabled?: boolean
		number?: string
		message?: string
		floatingButton?: {
			enabled?: boolean
			position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
		}
	}
	trustBadges: { badge: string; icon?: string }[]
	services: {
		title: string
		subtitle: string
		description: string
		image?: string
		icon?: string
	}[]
	pageServices?: {
		title: string
		description: string
		image?: string
		imageAlt?: string
		video?: string
		videoType?: 'youtube' | 'local'
		videoPoster?: string
		cta?: {
			text: string
			href: string
			variant: 'primary' | 'secondary'
		}
	}[]
	projects?: {
		featured?: {
			id: string
			image: string
			alt: string
			title: string
			category: string
			description: string
		}[]
		marquee?: {
			id: string
			image: string
			alt: string
		}[]
		beforeAfter?: {
			id: string
			before: string
			after: string
			alt: string
			title: string
			description: string
		}[]
	}
	faq: {
		question: string
		answer: string
		open?: boolean
	}[]
	seo: {
		keywords: string[]
		structuredData: {
			businessType: string
			priceRange?: string
		}
		advanced?: {
			businessType?: string
			priceRange?: string
			foundingDate?: string
			founder?: string
			logo?: string
		}
	}
	contactForm: {
		serviceOptions: string[]
		responseTime: string
	}
	footerBranding?: {
		enabled: boolean
		text?: string
		link?: string
		name?: string
	}
	hero?: {
		image?: string
		imageAlt?: string
	}
}

export const clientData: ClientConfig = {
	pricingPlan: 'premium',
	featureOverrides: undefined,

	business: {
		name: '${escapeString(client.businessName)}',
		legalName: '${escapeString(client.legalName)}',
		tagline: '${escapeString(client.tagline)}',
		description: '${escapeString(client.description)}',
		industry: '${client.sector}'
	},

	contact: {
		phone: {
			main: '${escapeString(client.phone)}',
			mainLink: '${client.phoneLink}',
			whatsapp: '${client.whatsapp}',
			whatsappMessage: '${escapeString(client.whatsappMessage)}'
		},
		email: {
			main: '${client.email}',
			display: '${client.email}'
		},
		address: {
			street: '${escapeString(client.street)}',
			city: '${escapeString(client.city)}',
			postalCode: '${client.postalCode}',
			fullAddress: '${escapeString(client.street)}, ${client.postalCode} ${escapeString(client.city)}, France',
			googleMapsLink: '${client.googleMapsUrl}'
		},
		hours: {
			schedule: ${JSON.stringify(client.hours)},
			emergency: ${client.emergency}
		}
	},

	location: {
		coordinates: {
			lat: ${client.coordinates.lat},
			lng: ${client.coordinates.lng}
		},
		mapEmbedUrl: '${client.mapEmbedUrl}',
		serviceAreas: {
			title: "Notre zone d'intervention",
			description: 'Nous intervenons dans toute la région de ${escapeString(client.city)}.',
			cities: ${JSON.stringify(client.serviceAreas)}
		}
	},

	reviews: {
		platform: 'google',
		rating: ${client.googleReviews.rating},
		count: ${client.googleReviews.count},
		link: '${client.googleReviews.link}'
	},

	${client.socialMedia ? `socialMedia: {
		${client.socialMedia.facebook ? `facebook: '${client.socialMedia.facebook}',` : ''}
		${client.socialMedia.instagram ? `instagram: '${client.socialMedia.instagram}',` : ''}
		${client.socialMedia.linkedin ? `linkedin: '${client.socialMedia.linkedin}',` : ''}
		${client.socialMedia.twitter ? `twitter: '${client.socialMedia.twitter}'` : ''}
	},
	` : ''}
	whatsapp: {
		enabled: true,
		number: '${client.whatsapp}',
		message: '${client.whatsappMessage}',
		floatingButton: {
			enabled: true,
			position: 'bottom-right'
		}
	},

	trustBadges: [
		{ badge: "Garantie décennale" },
		{ badge: "Artisan certifié" },
		{ badge: "Dépannage 7j/7" },
		{ badge: "Qualifié RGE" }
	],

	services: [
${client.services.map((service, i) => `		{
			title: "${escapeString(service)}",
			subtitle: "Service professionnel",
			description: "Nous vous accompagnons pour tous vos besoins en ${escapeString(service.toLowerCase())}. Intervention rapide, travail soigné et prix compétitifs.",
			image: "${generateSectorImage(client.sector, 'service', i)}"
		}`).join(',\n')}
	],

	pageServices: [
		{
			title: "${escapeString(client.services?.[0] || sectorContent.services.primary)}",
			description: "Expert en ${escapeString((client.services?.[0] || sectorContent.services.primary).toLowerCase())}, nous vous garantissons un travail de qualité avec des matériaux professionnels. Devis gratuit et intervention rapide sur ${escapeString(client.city)} et alentours.",
			image: "${generateSectorImage(client.sector, 'page', 1, 1200, 800)}",
			imageAlt: "${escapeString(client.services?.[0] || sectorContent.services.primary)}",
			cta: {
				text: "Demander un devis",
				href: "#contact",
				variant: "primary"
			}
		},
		{
			title: "${escapeString(client.services?.[1] || sectorContent.services.secondary)}",
			description: "${escapeString(sectorContent.hero.description)} Nous intervenons rapidement pour tous vos besoins. Satisfaction garantie.",
			image: "${generateSectorImage(client.sector, 'page', 2, 1200, 800)}",
			imageAlt: "${escapeString(client.services?.[1] || sectorContent.services.secondary)}",
			cta: {
				text: "En savoir plus",
				href: "#contact",
				variant: "primary"
			}
		}
	],

	projects: {
		featured: [
			{
				id: "projet-1",
				image: "${generateSectorImage(client.sector, 'project', 1)}",
				alt: "${escapeString(sectorContent.projects.title1)}",
				title: "${escapeString(sectorContent.projects.title1)}",
				category: "${escapeString(client.services?.[0] || sectorContent.projects.category1)}",
				description: "${escapeString(sectorContent.projects.description1)}"
			},
			{
				id: "projet-2",
				image: "${generateSectorImage(client.sector, 'project', 2)}",
				alt: "${escapeString(sectorContent.projects.title2)}",
				title: "${escapeString(sectorContent.projects.title2)}",
				category: "${escapeString(client.services?.[1] || sectorContent.projects.category2)}",
				description: "${escapeString(sectorContent.projects.description2)}"
			},
${Array.from({ length: 4 }, (_, i) => `			{
				id: "projet-${i + 3}",
				image: "${generateSectorImage(client.sector, 'project', i + 3)}",
				alt: "${escapeString(client.services?.[i % client.services.length] || sectorContent.services.list[i % sectorContent.services.list.length])}",
				title: "Projet ${i + 3}",
				category: "${escapeString(client.services?.[i % client.services.length] || sectorContent.services.list[i % sectorContent.services.list.length])}",
				description: "Réalisation complète à ${escapeString(client.city)}"
			}`).join(',\n')}
		],
		marquee: [
${Array.from({ length: 9 }, (_, i) => `			{
				id: "marquee-${i + 1}",
				image: "${generateSectorImage(client.sector, 'marquee', i + 1, 600, 400)}",
				alt: "Réalisation ${i + 1}"
			}`).join(',\n')}
		],
		beforeAfter: [
${Array.from({ length: 3 }, (_, i) => `			{
				id: "ba-${i + 1}",
				before: "${generateSectorImage(client.sector, 'before', i + 1)}",
				after: "${generateSectorImage(client.sector, 'after', i + 1)}",
				alt: "Avant/Après ${i + 1}",
				title: "Rénovation ${i + 1}",
				description: "Transformation complète"
			}`).join(',\n')}
		]
	},

	faq: [
		{
			question: "${escapeString(client.faq?.[0]?.question || sectorContent.faq.question)}",
			answer: "${escapeString(client.faq?.[0]?.answer || sectorContent.faq.answer)}",
			open: false
		},
		{
			question: "Êtes-vous certifié RGE ?",
			answer: "Oui, nous sommes certifiés RGE ce qui vous permet de bénéficier des aides de l'État (MaPrimeRénov', primes CEE).",
			open: false
		},
		{
			question: "Quelles sont vos zones d'intervention ?",
			answer: "Nous intervenons dans un rayon de 50 km autour de ${escapeString(client.city)} : ${client.serviceAreas.slice(0, 3).join(', ')} et communes environnantes.",
			open: false
		},
		{
			question: "Proposez-vous des devis gratuits ?",
			answer: "Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons gratuitement pour évaluer vos besoins.",
			open: false
		},
		{
			question: "Quels moyens de paiement acceptez-vous ?",
			answer: "Nous acceptons les paiements par CB, chèque, virement ou espèces. Possibilité de paiement en plusieurs fois pour les montants importants.",
			open: false
		}
	],

	seo: {
		keywords: ${JSON.stringify(client.seoKeywords)},
		structuredData: {
			businessType: 'LocalBusiness',
			priceRange: '€€'
		}${client.seoAdvanced ? `,
		advanced: {
			businessType: '${client.seoAdvanced.businessType || 'LocalBusiness'}',
			priceRange: '${client.seoAdvanced.priceRange || '€€'}',
			${client.seoAdvanced.foundingDate ? `foundingDate: '${client.seoAdvanced.foundingDate}',` : ''}
			${client.seoAdvanced.founder ? `founder: '${escapeString(client.seoAdvanced.founder)}',` : ''}
			${client.seoAdvanced.logo ? `logo: '${client.seoAdvanced.logo}'` : ''}
		}` : ''}
	},

	contactForm: {
		serviceOptions: ${JSON.stringify(client.services)},
		responseTime: '24h'
	},

	footerBranding: {
		enabled: true,
		text: 'Site créé par',
		link: 'https://gregoryleroux.com',
		name: 'Grégory Leroux'
	},

	hero: {
		image: "${generateSectorImage(client.sector, 'hero', 0, 1200, 800)}",
		imageAlt: "${escapeString(client.businessName)} - ${escapeString(client.tagline)}"
	}
}

export function getClientFeatures(): PlanFeatures {
	const planFeatures = getPlanFeatures(clientData.pricingPlan)
	if (!clientData.featureOverrides) {
		return planFeatures
	}
	return {
		...planFeatures,
		...clientData.featureOverrides
	}
}
`

	const targetPath = path.join(__dirname, '../src/config/client.ts')
	fs.writeFileSync(targetPath, content, 'utf-8')
}

// ============================================================================
// Mise à jour du Tailwind config
// ============================================================================

function updateTailwindConfig(colors, selectedFont, borderRadius = 'default', shadow = 'lg') {
	const tailwindPath = path.join(__dirname, '../tailwind.config.mjs')
	let tailwindConfig = fs.readFileSync(tailwindPath, 'utf-8')

	// Mise à jour de la couleur primaire
	const primaryShades = generateColorShades(colors.primary)
	const primaryRegex = /primary:\s*\{[^}]+\}/s
	const primaryReplacement = `primary: {
          '50': '${primaryShades[50]}',
          '100': '${primaryShades[100]}',
          '200': '${primaryShades[200]}',
          '300': '${primaryShades[300]}',
          '400': '${primaryShades[400]}',
          '500': '${primaryShades[500]}',
          '600': '${primaryShades[600]}',
          '700': '${primaryShades[700]}',
          '800': '${primaryShades[800]}',
          '900': '${primaryShades[900]}',
          '950': '${primaryShades[950]}',
        }`

	tailwindConfig = tailwindConfig.replace(primaryRegex, primaryReplacement)

	// Ajouter la couleur secondaire seulement si elle est définie
	if (colors.secondary) {
		const secondaryShades = generateColorShades(colors.secondary)
		const secondaryRegex = /secondary:\s*\{[^}]+\}/s
		const secondaryReplacement = `secondary: {
          '50': '${secondaryShades[50]}',
          '100': '${secondaryShades[100]}',
          '200': '${secondaryShades[200]}',
          '300': '${secondaryShades[300]}',
          '400': '${secondaryShades[400]}',
          '500': '${secondaryShades[500]}',
          '600': '${secondaryShades[600]}',
          '700': '${secondaryShades[700]}',
          '800': '${secondaryShades[800]}',
          '900': '${secondaryShades[900]}',
          '950': '${secondaryShades[950]}',
        }`

		// Ajouter secondary après primary si elle n'existe pas
		if (secondaryRegex.test(tailwindConfig)) {
			tailwindConfig = tailwindConfig.replace(secondaryRegex, secondaryReplacement)
		} else {
			// Insérer secondary après primary
			tailwindConfig = tailwindConfig.replace(
				primaryReplacement + ',',
				primaryReplacement + ',\n        ' + secondaryReplacement + ','
			)
		}
	}

	// Mise à jour des fonts (body + headings)
	const fontFamilyRegex = /fontFamily:\s*\{[^}]+\}/s
	const fontFamilyReplacement = `fontFamily: {
        sans: ["${selectedFont.body.family}", ...defaultTheme.fontFamily.sans],
        headings: ["${selectedFont.heading.family}", ...defaultTheme.fontFamily.sans],
      }`

	tailwindConfig = tailwindConfig.replace(fontFamilyRegex, fontFamilyReplacement)

	fs.writeFileSync(tailwindPath, tailwindConfig, 'utf-8')

	// Générer le fichier client-design.css avec les CSS variables
	const radiusValue = BORDER_RADIUS_VALUES[borderRadius] || BORDER_RADIUS_VALUES.default
	const shadowValue = SHADOW_VALUES[shadow] || SHADOW_VALUES.lg

	const clientDesignCSS = `/* Auto-generated by set-client.js - DO NOT EDIT MANUALLY */
/* Design System Variables */

:root {
  /* Border Radius - Selected: ${borderRadius} */
  --client-radius: ${radiusValue};

  /* Box Shadow - Selected: ${shadow} */
  --client-shadow: ${shadowValue};
}
`

	const cssPath = path.join(__dirname, '../src/styles/client-design.css')
	fs.writeFileSync(cssPath, clientDesignCSS, 'utf-8')
}

// ============================================================================
// Mise à jour des composants avec contenu dynamique
// ============================================================================

function updateComponentsWithSectorContent(client, slug) {
	const sectorContent = SECTOR_CONTENT[client.sector] || SECTOR_CONTENT.other

	// Met à jour Features.astro avec le contenu du secteur
	const featuresPath = path.join(__dirname, '../src/components/blocks/features/Features.astro')
	let featuresContent = fs.readFileSync(featuresPath, 'utf-8')

	// Utilise le contenu client s'il existe, sinon le contenu du secteur
	const featuresTitle = client.featuresTitle || sectorContent.features.title
	const featuresSubtitle = client.featuresSubtitle || sectorContent.features.subtitle

	// Remplace le titre et sous-titre par défaut
	featuresContent = featuresContent.replace(
		/title = '[^']*'/,
		`title = '${featuresTitle}'`
	)
	featuresContent = featuresContent.replace(
		/subtitle = '[^']*',/,
		`subtitle = '${featuresSubtitle}',`
	)

	fs.writeFileSync(featuresPath, featuresContent, 'utf-8')

	console.log(`   🎯 Features: ${client.featuresTitle ? '(client)' : '(auto)'} ${featuresTitle.substring(0, 30)}...`)
}

// ============================================================================
// Génération de l'index.astro randomisé
// ============================================================================

function generateIndexAstro(designSystem) {
	// Randomisation
	const heroVariant = random(HERO_VARIANTS)
	const featuresVariant = random(FEATURES_VARIANTS)
	const faqVariant = random(FAQ_VARIANTS)
	const reviewsVariant = random(REVIEWS_VARIANTS)
	const gallery = random(GALLERY_COMPONENTS)
	const media1Position = randomBool() ? 'left' : 'right'
	const media2Position = media1Position === 'left' ? 'right' : 'left' // Toujours alterner

	const indexContent = `---
// Landing Page - Structure optimale pour conversion
// Généré automatiquement par: npm run set-client
// ============================================================================
// Design system: ${designSystem.name} (${designSystem.description})
// Randomizations: Hero=${heroVariant}, Features=${featuresVariant}, Reviews=${reviewsVariant}, FAQ=${faqVariant}, Gallery=${gallery.name}

import Layout from '../layouts/Layout.astro'
import Hero from '../components/blocks/hero/Hero.astro'
import Brands from '../components/blocks/socialproof/Brands.astro'
import Features from '../components/blocks/features/Features.astro'
import MediaTextSection from '../components/blocks/media/MediaTextSection.astro'
import Reviews from '../components/blocks/reviews/Reviews.astro'
import ${gallery.name} from '../components/blocks/gallery/${gallery.name}.astro'
import ServiceArea from '../components/blocks/coverage/ServiceArea.astro'
import FAQ from '../components/blocks/FAQ/FAQ.astro'
import ContactForm from '../components/blocks/contact/ContactForm.astro'
import { clientData } from '../config/client'
---

<Layout
	title={\`\${clientData.business.name} - \${clientData.business.tagline}\`}
	description={clientData.business.description}
	classes="ds-${designSystem.name}"
>
	<!-- 1. Hero Section -->
	<Hero
		variant="${heroVariant}"
		${heroVariant === 'split' ? 'heroImage={clientData.hero?.image}\n\t\theroImageAlt={clientData.hero?.imageAlt}' : ''}
	/>

	<!-- 2. Logos Partenaires / Clients -->
	<Brands />

	<!-- 3. Bénéfices / Services -->
	<Features variant="${featuresVariant}" />

	<!-- 4. Détail service 1 -->
	{
		clientData.pageServices?.[0] && (
			<MediaTextSection
				image={clientData.pageServices[0].image}
				imageAlt={clientData.pageServices[0].imageAlt}
				mediaPosition="${media1Position}"
				title={clientData.pageServices[0].title}
				description={clientData.pageServices[0].description}
				cta={clientData.pageServices[0].cta}
			/>
		)
	}

	<!-- 5. Détail service 2 -->
	{
		clientData.pageServices?.[1] && (
			<MediaTextSection
				image={clientData.pageServices[1].image}
				imageAlt={clientData.pageServices[1].imageAlt}
				mediaPosition="${media2Position}"
				title={clientData.pageServices[1].title}
				description={clientData.pageServices[1].description}
				cta={clientData.pageServices[1].cta}
			/>
		)
	}

	<!-- 6. Témoignages -->
	<Reviews variant="${reviewsVariant}" />

	<!-- 7. Galerie projets -->
	{${gallery.dataPath} && <${gallery.name} ${gallery.prop} />}

	<!-- 8. Zone d'intervention -->
	<ServiceArea />

	<!-- 9. FAQ -->
	<FAQ variant="${faqVariant}" />

	<!-- 10. Contact / CTA final -->
	<ContactForm />
</Layout>
`

	const indexPath = path.join(__dirname, '../src/pages/index.astro')
	fs.writeFileSync(indexPath, indexContent, 'utf-8')

	return {
		heroVariant,
		featuresVariant,
		reviewsVariant,
		faqVariant,
		galleryType: gallery.name,
		media1Position,
		media2Position
	}
}

// ============================================================================
// Validation
// ============================================================================

/**
 * Valide les paramètres du design system
 * @param {object} client - Client data
 */
function validateDesignSystem(client) {
	if (!client.designSystem) {
		return // Optional, pas d'erreur
	}

	const { borderRadius, shadow } = client.designSystem

	// Valide borderRadius
	if (borderRadius && !BORDER_RADIUS_VALUES.hasOwnProperty(borderRadius)) {
		console.error(`❌ Erreur: borderRadius "${borderRadius}" invalide pour ${client.slug}`)
		console.error(`   Valeurs acceptées: ${Object.keys(BORDER_RADIUS_VALUES).join(', ')}`)
		console.error(`   📖 Référence:`)
		Object.entries(BORDER_RADIUS_VALUES).forEach(([key, value]) => {
			console.error(`      - ${key}: ${value}`)
		})
		process.exit(1)
	}

	// Valide shadow
	if (shadow && !SHADOW_VALUES.hasOwnProperty(shadow)) {
		console.error(`❌ Erreur: shadow "${shadow}" invalide pour ${client.slug}`)
		console.error(`   Valeurs acceptées: ${Object.keys(SHADOW_VALUES).join(', ')}`)
		console.error(`   📖 Référence:`)
		Object.entries(SHADOW_VALUES).forEach(([key, value]) => {
			console.error(`      - ${key}: ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`)
		})
		process.exit(1)
	}
}

// ============================================================================
// Fonction principale
// ============================================================================

function setClient(slug) {
	// Lit le fichier JSON
	const jsonPath = path.join(__dirname, 'clients-data.json')
	const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

	// Trouve le client
	const client = jsonData.clients.find(c => c.slug === slug)
	if (!client) {
		console.error(`❌ Client "${slug}" introuvable dans clients-data.json`)
		console.error(`   Clients disponibles: ${jsonData.clients.map(c => c.slug).join(', ')}`)
		process.exit(1)
	}

	// Valide le design system
	validateDesignSystem(client)

	console.log(`🎨 Génération du site A&D pour: ${client.businessName}\n`)

	// Randomisation
	const selectedFontPair = random(FONT_PAIRS)
	const designSystem = random(DESIGN_SYSTEMS)

	// Couleurs : utiliser celles du client si définies, sinon palette automatique
	const colorPalette = client.colors
		? client.colors
		: getRandomColorPalette(client.sector)

	// Design system : utiliser les valeurs du client si définies, sinon valeurs par défaut
	const borderRadius = client.designSystem?.borderRadius || 'lg'
	const shadow = client.designSystem?.shadow || 'lg'

	console.log(`   🔤 Font: ${selectedFontPair.name}`)
	console.log(`   🎨 Design: ${designSystem.name}`)
	console.log(`   🌈 Couleurs: ${colorPalette.primary}${colorPalette.secondary ? ' + ' + colorPalette.secondary : ''} ${client.colors ? '(définies)' : '(auto)'}`)
	console.log(`   📐 Border radius: ${borderRadius} (${BORDER_RADIUS_VALUES[borderRadius]})`)
	console.log(`   🎭 Shadow: ${shadow}`)
	console.log(`   📝 Services: ${client.services ? client.services.slice(0, 2).join(', ') + ' (client)' : 'Auto par secteur'}`)
	console.log(`   📸 Images: Picsum avec seeds ${client.sector} (${SECTOR_IMAGES[client.sector]?.seeds.slice(0, 3).join(', ') || 'generic'})`)

	// 1. Génère client.ts (Premium)
	generateClientConfig(client, slug)

	// 2. Met à jour Tailwind avec les couleurs choisies + design system
	updateTailwindConfig(colorPalette, selectedFontPair, borderRadius, shadow)

	// 3. Met à jour les composants avec le contenu du secteur
	updateComponentsWithSectorContent(client, slug)

	// 4. Génère index.astro randomisé
	const randomizations = generateIndexAstro(designSystem)

	console.log(`\n✅ Site généré avec succès!`)
	console.log(`   📄 client.ts → Premium (toutes features)`)
	console.log(`   🎨 tailwind.config.mjs → ${selectedFontPair.name} + ${colorPalette.primary}${colorPalette.secondary ? ' + ' + colorPalette.secondary : ''}`)
	console.log(`   🎲 index.astro → ${randomizations.featuresVariant} / ${randomizations.reviewsVariant} / ${randomizations.faqVariant} / ${randomizations.galleryType}`)
	console.log(`   🎯 Design System → ${designSystem.name} (${designSystem.description})`)
	console.log(`\n💡 Randomisations:`)
	console.log(`   - Design System: ${designSystem.name}`)
	console.log(`   - Hero: ${randomizations.heroVariant}`)
	console.log(`   - Features: ${randomizations.featuresVariant}`)
	console.log(`   - Reviews: ${randomizations.reviewsVariant}`)
	console.log(`   - FAQ: ${randomizations.faqVariant}`)
	console.log(`   - Galerie: ${randomizations.galleryType}`)
	console.log(`   - MediaText 1: ${randomizations.media1Position}`)
	console.log(`   - MediaText 2: ${randomizations.media2Position}`)
	console.log(`\n📸 Prochaine étape:`)
	console.log(`   npm run screenshots`)
	console.log(`\n💰 Pour changer de plan:`)
	console.log(`   Édite src/config/client.ts → pricingPlan: 'vitrine' | 'pro' | 'premium'`)
}

// Script principal
const slug = process.argv[2]

if (!slug) {
	console.error('❌ Usage: npm run set-client <slug>')
	console.error('   Exemple: npm run set-client martin-plomberie')
	process.exit(1)
}

setClient(slug)
