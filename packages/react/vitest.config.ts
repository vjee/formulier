import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'jsdom',
		includeSource: ['src/**/*.{ts,tsx}'],
		coverage: {
			provider: 'istanbul',
		},
	},
})
