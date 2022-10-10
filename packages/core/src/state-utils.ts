import clone from 'shallow-clone'
import isEqual from 'fast-deep-equal'

export { clone, isEqual }

// Originally taken from https://github.com/jaredpalmer/formik/blob/master/packages/formik/src/utils.ts
export function getPath(source: any, path: string | string[], fallback?: any) {
	let p = 0
	const pathArray = toPath(path)

	while (source && p < pathArray.length) {
		source = source[pathArray[p++]]
		if (typeof source === 'string' && p < pathArray.length - 1) return fallback
	}

	return source === undefined ? fallback : source
}

// Originally taken from https://github.com/jaredpalmer/formik/blob/master/packages/formik/src/utils.ts
export function setPath(obj: any, path: string, value: any): any {
	const res = clone(obj)
	let resVal: any = res
	let i = 0
	const pathArray = toPath(path)

	for (; i < pathArray.length - 1; i++) {
		const currentPath: string = pathArray[i]
		const currentObj = getPath(obj, pathArray.slice(0, i + 1))

		if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
			resVal = resVal[currentPath] = clone(currentObj)
		} else {
			const nextPath: string = pathArray[i + 1]
			resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {}
		}
	}

	if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
		return obj
	}

	if (value === undefined) {
		delete resVal[pathArray[i]]
	} else {
		resVal[pathArray[i]] = value
	}

	if (i === 0 && value === undefined) {
		delete res[pathArray[i]]
	}

	return res
}

export function setKey<T extends Record<string, unknown>>(source: T, key: string, value: unknown): T {
	if (isEqual(source[key], value)) {
		return source
	}

	return { ...source, [key]: value }
}

export function removeKey<T extends Record<string, unknown>>(source: T, key: string): T {
	if (!Object.prototype.hasOwnProperty.call(source, key)) {
		return source
	}

	return Object.fromEntries(Object.entries(source).filter(entry => entry[0] !== key)) as T
}

// Originally taken from https://github.com/lodash/lodash/blob/master/toPath.js
function toPath(path: string | string[]) {
	if (Array.isArray(path)) return path

	const result: string[] = []
	const rePropName = /[^.[\]]+|\[(?:([^"'][^[]*)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
	const reEscapeChar = /\\(\\)?/g

	if (path.charCodeAt(0) === '.'.charCodeAt(0)) {
		result.push('')
	}

	path.replace(rePropName, (match, expression, quote, subString) => {
		let key = match
		if (quote) {
			key = subString.replace(reEscapeChar, '$1')
		} else if (expression) {
			key = expression.trim()
		}

		result.push(key)

		return ''
	})

	return result
}

function isInteger(source: unknown): boolean {
	return String(Math.floor(Number(source))) === source
}

function isObject(source: unknown): source is Record<string, unknown> {
	return source !== null && typeof source === 'object'
}

if (import.meta.vitest) {
	const { describe, it, expect } = import.meta.vitest
	const SOURCE = {
		a: { b: { c: 'c' } },
		y: 'test',
		z: 1,
	}

	it('getPath', () => {
		expect(getPath(SOURCE, 'a.b')).toBe(SOURCE.a.b)
		expect(getPath(SOURCE, 'a.b.c')).toBe(SOURCE.a.b.c)
		expect(getPath(SOURCE, 'a.b.f')).toStrictEqual(undefined)
		expect(getPath(SOURCE, 'a.b.f', 'fallback')).toStrictEqual('fallback')
		expect(getPath(SOURCE, 'y[1][2]', 'fallback')).toStrictEqual('fallback')
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
			expect(setPath(SOURCE, 'a', undefined)).toStrictEqual({ y: 'test', z: 1 })
		})

		it('creates objects and arrays', () => {
			expect(setPath(SOURCE, 'z[0].a', 1).z).toStrictEqual([{ a: 1 }])
		})
	})

	it('setKey', () => {
		expect(setKey(SOURCE, 'z', 1)).toBe(SOURCE)
		expect(setKey(SOURCE, 'z', 2)).toStrictEqual({ a: { b: { c: 'c' } }, y: 'test', z: 2 })
	})

	it('removeKey', () => {
		expect(removeKey(SOURCE, 'x')).toBe(SOURCE)
		expect(removeKey(SOURCE, 'a')).toStrictEqual({ y: 'test', z: 1 })
	})

	it('toPath', () => {
		expect(toPath('a.b')).toStrictEqual(['a', 'b'])
		expect(toPath('a["b"]')).toStrictEqual(['a', 'b'])
		expect(toPath("a['b']")).toStrictEqual(['a', 'b'])
		expect(toPath('a[2]')).toStrictEqual(['a', '2'])
		expect(toPath('a.[2]')).toStrictEqual(['a', '2'])
		expect(toPath('a.[2][1].b')).toStrictEqual(['a', '2', '1', 'b'])
		expect(toPath('a.[2].b')).toStrictEqual(['a', '2', 'b'])
		expect(toPath('.[2]')).toStrictEqual(['', '2'])
	})

	it('isInteger', () => {
		expect(isInteger('2')).toBe(true)
		expect(isInteger('2.26')).toBe(false)
		expect(isInteger(2)).toBe(false)
	})

	it('isObject', () => {
		expect(isObject({})).toBe(true)
		expect(isObject([])).toBe(true)
		expect(isObject(new Date())).toBe(true)
		expect(isObject(null)).toBe(false)
		expect(isObject(undefined)).toBe(false)
		expect(isObject(1)).toBe(false)
		expect(isObject('test')).toBe(false)
	})
}
