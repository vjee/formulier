import {defineConfig} from 'vite'

// This config is required for cypress component testing to work.
export default defineConfig({
	server: {
		fs: {
			allow: ['..'],
		},
	},
})
