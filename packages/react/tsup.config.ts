import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	external: ['react'],
	dts: true,
	minify: true,
	clean: true,
	define: {
		'import.meta.vitest': 'undefined',
	},
})
