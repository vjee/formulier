import {describe, expect, it} from 'vitest'

import {insert, move, push, remove, swap} from '../src/array-utils.js'

const [A, B, C, D] = ['a', 'b', 'c', 'd']

describe('array utils', () => {
	describe('push', () => {
		it('works', () => {
			expect(push([A, B, C], D)).toStrictEqual([A, B, C, D])
		})
	})

	describe('insert', () => {
		it('works', () => {
			expect(insert([A, B, C], D, -1)).toStrictEqual([A, B, C])
			expect(insert([A, B, C], D, 0)).toStrictEqual([D, A, B, C])
			expect(insert([A, B, C], D, 1)).toStrictEqual([A, D, B, C])
			expect(insert([A, B, C], D, 2)).toStrictEqual([A, B, D, C])
			expect(insert([A, B, C], D, 3)).toStrictEqual([A, B, C, D])
			expect(insert([A, B, C], D, 4)).toStrictEqual([A, B, C])
		})
	})

	describe('remove', () => {
		it('works', () => {
			expect(remove([A, B, C], 0)).toStrictEqual([B, C])
			expect(remove([A, B, C], 1)).toStrictEqual([A, C])
			expect(remove([A, B, C], 2)).toStrictEqual([A, B])
		})
	})

	describe('move', () => {
		it('works', () => {
			expect(move([A, B, C], 0, 1)).toStrictEqual([B, A, C])
			expect(move([A, B, C], 1, 2)).toStrictEqual([A, C, B])
			expect(move([A, B, C], 0, 2)).toStrictEqual([B, C, A])
			expect(move([A, B, C], 2, 1)).toStrictEqual([A, C, B])
			expect(move([A, B, C], 2, 0)).toStrictEqual([C, A, B])
		})
	})

	describe('swap', () => {
		it('works', () => {
			expect(swap([A, B, C], 0, 1)).toStrictEqual([B, A, C])
			expect(swap([A, B, C], 1, 2)).toStrictEqual([A, C, B])
			expect(swap([A, B, C], 0, 2)).toStrictEqual([C, B, A])
			expect(swap([A, B, C], 2, 1)).toStrictEqual([A, C, B])
			expect(swap([A, B, C], 2, 0)).toStrictEqual([C, B, A])
		})
	})
})
