import {defineConfig} from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'jsdom',
		includeSource: ['src/**/*.{ts,tsx}'],
		setupFiles: ['./tests/test-setup.ts'],
		coverage: {
			provider: 'istanbul',
		},
	},
})
