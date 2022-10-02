import { defineConfig } from 'vitepress'
import tokyoNightStorm from './tokyo-night-storm.json'

export default defineConfig({
	lang: 'en-GB',
	title: 'Formulier',
	description: 'Simple, performant form library for React',

	base: '/formulier/',

	themeConfig: {
		logo: '/formulier-logo.svg',

		socialLinks: [{ icon: 'github', link: 'https://github.com/vjee/formulier' }],

		sidebar: {
			'/react/': [
				{
					text: 'Guide',
					items: [
						{
							text: 'Getting Started',
							link: '/react/guide/getting-started',
						},
					],
				},
				{
					text: 'API',
					items: [
						{
							text: 'useForm()',
							link: '/react/api/use-form',
						},
					],
				},
			],
		},

		editLink: {
			pattern: 'https://github.com/vjee/formulier/edit/main/docs/:path',
			text: 'Edit this page on GitHub',
		},
	},

	markdown: {
		theme: tokyoNightStorm,
	},
})
