import {defineConfig} from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	external: ['vue'],
	dts: true,
	minify: true,
	clean: true,
})
