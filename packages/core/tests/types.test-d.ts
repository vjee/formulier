import {it, describe, expectTypeOf} from 'vitest'
import type {ValuesKeys} from '../src/types'

describe('ValuesKeys', () => {
	it('works with top level primitives', () => {
		expectTypeOf<ValuesKeys<{a: string; b: number; c: boolean}>>().toEqualTypeOf<'a' | 'b' | 'c'>()
	})

	it('works with objects', () => {
		expectTypeOf<ValuesKeys<{a: {b: number; c: boolean}}>>().toEqualTypeOf<'a' | 'a.b' | 'a.c'>()
	})

	it('works with arrays', () => {
		expectTypeOf<ValuesKeys<{a: {b: number; c: boolean}[]}>>().toEqualTypeOf<
			'a' | `a[${number}]` | `a[${number}].b` | `a[${number}].c`
		>()
	})

	it('works with tuples', () => {
		expectTypeOf<ValuesKeys<{a: [{b: number; c: boolean}, {b: number; c: boolean}]}>>().toEqualTypeOf<
			'a' | `a[0]` | `a[0].b` | `a[0].c` | `a[1]` | `a[1].b` | `a[1].c`
		>()

		expectTypeOf<ValuesKeys<{a: [{b: number; c: boolean}, {b: number; c: boolean}]}>>().toEqualTypeOf<
			// @ts-expect-error Tuple index out of range
			'a' | `a[0]` | `a[0].b` | `a[0].c` | `a[1]` | `a[1].b` | `a[1].c` | `a[2]` | `a[2].b` | `a[2].c`
		>()
	})

	it('works with non-primitives', () => {
		type Time = {hours: number; minutes: number}

		expectTypeOf<ValuesKeys<{a: Time}>>().toEqualTypeOf<'a' | 'a.hours' | 'a.minutes'>()

		expectTypeOf<ValuesKeys<{a: Time}, Time>>().toEqualTypeOf<'a'>()

		// @ts-expect-error Primitives are not be traversed
		expectTypeOf<ValuesKeys<{a: Time}, Time>>().toEqualTypeOf<'a' | 'a.hours' | 'b.hours'>()

		// @ts-expect-error Primitives are not be traversed
		expectTypeOf<ValuesKeys<{a: File}>>().toEqualTypeOf<'a' | 'a.name'>()
	})

	it('works with nesting', () => {
		type Time = {hours: number; minutes: number}

		expectTypeOf<ValuesKeys<{a: {b: {c: {d: string}}}}>>().toEqualTypeOf<'a' | 'a.b' | 'a.b.c' | 'a.b.c.d'>()

		expectTypeOf<ValuesKeys<{a: {b: {hours: number; minutes: number}}}, Time>>().toEqualTypeOf<'a' | 'a.b'>()

		expectTypeOf<ValuesKeys<{a: {b: number[]}}>>().toEqualTypeOf<'a' | 'a.b' | `a.b[${number}]`>()

		expectTypeOf<ValuesKeys<{a: {b: [number, number]}}>>().toEqualTypeOf<'a' | 'a.b' | 'a.b[0]' | 'a.b[1]'>()

		expectTypeOf<ValuesKeys<{a: {b: {c: {d: {e: {f: {g: {h: string}}}}}}}}>>().toEqualTypeOf<
			'a' | 'a.b' | 'a.b.c' | 'a.b.c.d' | 'a.b.c.d.e' | 'a.b.c.d.e.f' | 'a.b.c.d.e.f.g' | 'a.b.c.d.e.f.g.h'
		>()

		expectTypeOf<ValuesKeys<{a: {b: {c: {d: {e: number}[]}[]}[]}[]}>>().toEqualTypeOf<
			| 'a'
			| `a[${number}]`
			| `a[${number}].b`
			| `a[${number}].b[${number}]`
			| `a[${number}].b[${number}].c`
			| `a[${number}].b[${number}].c[${number}]`
			| `a[${number}].b[${number}].c[${number}].d`
			| `a[${number}].b[${number}].c[${number}].d[${number}]`
			| `a[${number}].b[${number}].c[${number}].d[${number}].e`
		>()
	})

	it('limits recursion', () => {
		expectTypeOf<ValuesKeys<{a: {b: string}[][][][][][][][][][]}>>().toEqualTypeOf<
			| 'a'
			| `a[${number}]`
			| `a[${number}][${number}]`
			| `a[${number}][${number}][${number}]`
			| `a[${number}][${number}][${number}][${number}]`
		>()
	})
})
