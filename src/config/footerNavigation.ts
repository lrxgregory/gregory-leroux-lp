// Footer Navigation
// ------------
// Description: The footer navigation data for the website.
export interface Logo {
	src?: string
	alt?: string
	text?: string
}

export interface FooterAbout {
	title: string
	aboutText: string
	logo?: Logo
}

export interface SubCategory {
	subCategory: string
	subCategoryLink: string
}

export interface FooterColumn {
	category: string
	subCategories: SubCategory[]
}

export interface SubFooter {
	copywriteText: string
}

export interface FooterData {
	footerAbout: FooterAbout
	footerColumns: FooterColumn[]
	subFooter: SubFooter
}

export const footerNavigationData: FooterData = {
	footerAbout: {
		title: 'Grégory Leroux',
		aboutText: 'Sites vitrine professionnels livrés en 7 jours. Design moderne, optimisé pour convertir vos visiteurs en clients.',
		logo: {
			text: 'Grégory Leroux'
		}
	},
	footerColumns: [
		{
			category: 'Navigation',
			subCategories: [
				{
					subCategory: 'Accueil',
					subCategoryLink: '/'
				},
				{
					subCategory: 'Prix',
					subCategoryLink: '/#pricing'
				},
				{
					subCategory: 'Méthode',
					subCategoryLink: '/#steps'
				},
				{
					subCategory: 'FAQ',
					subCategoryLink: '/#faq'
				}
			]
		},
		{
			category: 'Légal',
			subCategories: [
				{
					subCategory: 'Mentions légales',
					subCategoryLink: '/mentions-legales'
				},
				{
					subCategory: 'Politique de confidentialité',
					subCategoryLink: '/confidentialite'
				},
				{
					subCategory: 'CGV',
					subCategoryLink: '/cgv'
				}
			]
		},
		{
			category: 'Contact',
			subCategories: [
				{
					subCategory: 'Réserver un appel',
					subCategoryLink: '/#booking'
				},
				{
					subCategory: 'Email',
					subCategoryLink: 'mailto:contact@gregoryleroux.com'
				}
			]
		}
	],
	subFooter: {
		copywriteText: '© 2024 Grégory Leroux. Tous droits réservés.'
	}
}
