import {describe, expect, it} from 'vitest'

import {getPath, isInteger, isObject, removeKey, setKey, setPath, toPath} from '../src/state-utils.js'

const SOURCE = {
	a: {b: {c: 'c'}},
	y: 'test',
	z: 1,
}

describe('state utils', () => {
	describe('getPath', () => {
		it('gets stuff', () => {
			expect(getPath(SOURCE, 'a.b')).toBe(SOURCE.a.b)
			expect(getPath(SOURCE, 'a.b.c')).toBe(SOURCE.a.b.c)
		})

		it('returns undefined if path is invalid', () => {
			expect(getPath(SOURCE, 'a.b.f')).toStrictEqual(undefined)
		})

		it('returns the provided fallback if path is invalid', () => {
			expect(getPath(SOURCE, 'a.b.f', 'fallback')).toStrictEqual('fallback')
			expect(getPath(SOURCE, 'y[1][2]', 'fallback')).toStrictEqual('fallback')
		})
	})

	describe('setPath', () => {
		it('sets stuff', () => {
			expect(setPath(SOURCE, 'a.b.c', 'f').a.b.c).toBe('f')
		})

		it('skips if value is indifferent', () => {
			expect(setPath(SOURCE, 'a.b.c', 'c')).toBe(SOURCE)
		})

		it('skips if value is indifferent', () => {
			expect(setPath(SOURCE, 'a.b.c', 'c')).toBe(SOURCE)
		})

		it('unsets if value is undefined', () => {
			expect(setPath(SOURCE, 'a.b.c', undefined).a.b).toStrictEqual({})
			expect(setPath(SOURCE, 'a', undefined)).toStrictEqual({y: 'test', z: 1})
		})

		it('creates objects and arrays', () => {
			expect(setPath(SOURCE, 'z[0].a', 1).z).toStrictEqual([{a: 1}])
		})
	})

	describe('setKey', () => {
		it('works', () => {
			expect(setKey(SOURCE, 'z', 1)).toBe(SOURCE)
			expect(setKey(SOURCE, 'z', 2)).toStrictEqual({a: {b: {c: 'c'}}, y: 'test', z: 2})
		})
	})

	describe('removeKey', () => {
		it('works', () => {
			expect(removeKey(SOURCE, 'x')).toBe(SOURCE)
			expect(removeKey(SOURCE, 'a')).toStrictEqual({y: 'test', z: 1})
		})
	})

	describe('toPath', () => {
		it('works', () => {
			expect(toPath('a.b')).toStrictEqual(['a', 'b'])
			expect(toPath('a["b"]')).toStrictEqual(['a', 'b'])
			expect(toPath("a['b']")).toStrictEqual(['a', 'b'])
			expect(toPath('a[2]')).toStrictEqual(['a', '2'])
			expect(toPath('a.[2]')).toStrictEqual(['a', '2'])
			expect(toPath('a.[2][1].b')).toStrictEqual(['a', '2', '1', 'b'])
			expect(toPath('a.[2].b')).toStrictEqual(['a', '2', 'b'])
			expect(toPath('.[2]')).toStrictEqual(['', '2'])
		})
	})

	describe('isInteger', () => {
		it('works', () => {
			expect(isInteger('2')).toBe(true)
			expect(isInteger('2.26')).toBe(false)
			expect(isInteger(2)).toBe(false)
		})
	})

	describe('isObject', () => {
		it('works', () => {
			expect(isObject({})).toBe(true)
			expect(isObject([])).toBe(true)
			expect(isObject(new Date())).toBe(true)
			expect(isObject(null)).toBe(false)
			expect(isObject(undefined)).toBe(false)
			expect(isObject(1)).toBe(false)
			expect(isObject('test')).toBe(false)
		})
	})
})
