export function push<T>(array: T[], item: T) {
	return [...array, item]
}

export function insert<T>(array: T[], item: T, index: number) {
	if (index >= array.length) return array
	return [...array.slice(0, index), item, ...array.slice(index)]
}

export function remove<T>(array: T[], index: number) {
	return [...array.slice(0, index), ...array.slice(index + 1)]
}

export function move<T>(array: T[], fromIndex: number, toIndex: number) {
	const copy = [...array]
	const value = copy[fromIndex]
	copy.splice(fromIndex, 1)
	copy.splice(toIndex, 0, value)
	return copy
}

export function swap<T>(array: T[], fromIndex: number, toIndex: number) {
	const copy = [...array]
	;[copy[fromIndex], copy[toIndex]] = [copy[toIndex], copy[fromIndex]]
	return copy
}
