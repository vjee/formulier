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

		nav: [
			{
				text: 'Core',
				link: '/core/guide/getting-started',
			},
			{
				text: 'React',
				link: '/react/guide/getting-started',
				activeMatch: '/react/',
			},
		],

		sidebar: {
			'/core/': [
				{
					text: 'Guide',
					items: [
						{
							text: 'Getting Started',
							link: '/core/guide/getting-started',
						},
					],
				},
			],

			'/react/': [
				{
					text: 'Guide',
					items: [
						{
							text: 'Getting Started',
							link: '/react/guide/getting-started',
						},
						{
							text: 'Validation',
							link: '/react/guide/validation',
						},
					],
				},
				{
					text: 'API',
					items: [
						{
							text: 'useCreateForm()',
							link: '/react/api/use-create-form',
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

	srcDir: 'docs',

	vite: {
		server: {
			fs: {
				allow: ['../..'],
			},
		},
	},
})
