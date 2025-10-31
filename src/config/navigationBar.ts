// Navigation Bar
// ------------
// Description: The navigation bar data for the website.
export interface Logo {
	src?: string
	alt?: string
	text?: string
}

export interface NavSubItem {
	name: string
	link: string
}

export interface NavItem {
	name: string
	link: string
	submenu?: NavSubItem[]
}

export interface NavAction {
	name: string
	link: string
	style: string
	size: string
}

export interface NavData {
	logo?: Logo
	navItems: NavItem[]
	navActions: NavAction[]
}

export const navigationBarData: NavData = {
	logo: {
		alt: 'Grégory Leroux',
		text: 'Grégory Leroux'
	},
	navItems: [
		{ name: 'Accueil', link: '/' },
		{ name: 'Prix', link: '/#pricing' },
		{ name: 'Méthode', link: '/#steps' },
		{ name: 'FAQ', link: '/#faq' }
	],
	navActions: [{ name: 'Réserver un appel ', link: '/#', style: 'primary', size: 'lg' }]
}
