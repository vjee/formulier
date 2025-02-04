import {defineConfig} from 'cypress'

export default defineConfig({
	video: false,
	component: {
		specPattern: 'cypress/**/*.cy.tsx',
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
	},
})
