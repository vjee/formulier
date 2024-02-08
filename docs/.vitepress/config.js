import {defineConfig} from 'vitepress'

export default defineConfig({
	lang: 'en-GB',
	title: 'Formulier',
	description: 'Simple, performant form library for React',

	base: '/formulier/',

	themeConfig: {
		logo: '/formulier-logo.svg',

		socialLinks: [{icon: 'github', link: 'https://github.com/vjee/formulier'}],

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
						{
							text: 'useFormInstance()',
							link: '/react/api/use-form-instance',
						},
						{
							text: 'useFormField()',
							link: '/react/api/use-form-field',
						},
						{
							text: 'useFormFieldValue()',
							link: '/react/api/use-form-field-value',
						},
						{
							text: 'useFormFieldArray()',
							link: '/react/api/use-form-field-array',
						},
						{
							text: 'useFormSelector()',
							link: '/react/api/use-form-selector',
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
		theme: 'min-dark',
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
