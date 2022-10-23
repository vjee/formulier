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
export function toPath(path: string | string[]) {
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

export function isInteger(source: unknown): boolean {
	return String(Math.floor(Number(source))) === source
}

export function isObject(source: unknown): source is Record<string, unknown> {
	return source !== null && typeof source === 'object'
}
