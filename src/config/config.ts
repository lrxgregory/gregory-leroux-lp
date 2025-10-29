// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

export const configData: Config = {
	siteTitle: 'Landing Page Skeleton - Astro & Tailwind CSS',
	siteDescription:
		'Un skeleton optimisé pour créer des landing pages modernes et performantes avec Astro et Tailwind CSS.',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo.svg',
		alt: 'Landing Page Skeleton'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}
