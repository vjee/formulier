import {defineConfig} from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	external: ['react', 'use-sync-external-store'],
	dts: true,
	minify: true,
	clean: true,
})
