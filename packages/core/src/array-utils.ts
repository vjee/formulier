export function push<T>(array: T[], item: T) {
	return [...array, item]
}

export function insert<T>(array: T[], item: T, index: number) {
	if (index < 0 || index > array.length) return array
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

if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest
	const [A, B, C, D] = ['a', 'b', 'c', 'd']

	it('push', () => {
		expect(push([A, B, C], D)).toStrictEqual([A, B, C, D])
	})

	it('insert', () => {
		expect(insert([A, B, C], D, -1)).toStrictEqual([A, B, C])
		expect(insert([A, B, C], D, 0)).toStrictEqual([D, A, B, C])
		expect(insert([A, B, C], D, 1)).toStrictEqual([A, D, B, C])
		expect(insert([A, B, C], D, 2)).toStrictEqual([A, B, D, C])
		expect(insert([A, B, C], D, 3)).toStrictEqual([A, B, C, D])
		expect(insert([A, B, C], D, 4)).toStrictEqual([A, B, C])
	})

	it('remove', () => {
		expect(remove([A, B, C], 0)).toStrictEqual([B, C])
		expect(remove([A, B, C], 1)).toStrictEqual([A, C])
		expect(remove([A, B, C], 2)).toStrictEqual([A, B])
	})

	it('move', () => {
		expect(move([A, B, C], 0, 1)).toStrictEqual([B, A, C])
		expect(move([A, B, C], 1, 2)).toStrictEqual([A, C, B])
		expect(move([A, B, C], 0, 2)).toStrictEqual([B, C, A])
		expect(move([A, B, C], 2, 1)).toStrictEqual([A, C, B])
		expect(move([A, B, C], 2, 0)).toStrictEqual([C, A, B])
	})

	it('swap', () => {
		expect(swap([A, B, C], 0, 1)).toStrictEqual([B, A, C])
		expect(swap([A, B, C], 1, 2)).toStrictEqual([A, C, B])
		expect(swap([A, B, C], 0, 2)).toStrictEqual([C, B, A])
		expect(swap([A, B, C], 2, 1)).toStrictEqual([A, C, B])
		expect(swap([A, B, C], 2, 0)).toStrictEqual([C, B, A])
	})
}
