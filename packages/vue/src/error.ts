export function createError(source: string, errorMessage: string) {
	return new Error(`[@formulier/vue] ${source}: ${errorMessage}`)
}
