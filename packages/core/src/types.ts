export interface FormulierOptions<V extends Values, P> {
	initialValues: Nullable<V, P>
}

export type Primitives = string | number | bigint | boolean | Date | File

export type Values = Record<string, any>

export type Nullable<Values, P = Primitives> = {
	[Prop in keyof Values]: Values[Prop] extends P | null | undefined
		? Values[Prop] | null
		: Values[Prop] extends (infer A)[]
			? Nullable<A, P>[] | null
			: Nullable<Values[Prop], P>
}

export type FieldValidator = (value: unknown) => string | null

export interface FormulierState<V extends Values, P = Primitives> {
	values: Nullable<V, P>
	validators: Record<string, FieldValidator | null>
	errors: Record<string, string | null>
	touched: Record<string, boolean>
	submitCount: number
}

export type GetFieldType<T, P extends string> = string extends P
	? any
	: P extends `${infer Left}.${infer Right}`
		? Left extends keyof T
			? FieldWithPossiblyUndefined<T[Left], Right>
			: Left extends `${infer FieldKey}[${infer IndexKey}]`
				? FieldKey extends keyof T
					? FieldWithPossiblyUndefined<IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>, Right>
					: undefined
				: undefined
		: P extends keyof T
			? T[P]
			: P extends `${infer FieldKey}[${infer IndexKey}]`
				? FieldKey extends keyof T
					? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
					: undefined
				: undefined

export type ValuesKeys<V, P = Primitives, TDepth extends any[] = []> = TDepth['length'] extends 5
	? never
	: unknown extends V
		? PrefixFromDepth<string, TDepth>
		: V extends P
			? never
			: V extends readonly any[] & IsTuple<V>
				? TupleValuesKeys<V, P, AllowedIndexes<V>, TDepth>
				: V extends any[]
					? ArrayValuesKeys<V, P, [...TDepth, any]>
					: V extends Date
						? never
						: V extends object
							? ObjectValuesKeys<V, P, TDepth>
							: never

export type FieldName = string & {readonly __brand: unique symbol}

////////////////////////////////////////////////////////////////////////////////
// Util types that aren't exported
////////////////////////////////////////////////////////////////////////////////

type IndexedFieldWithPossiblyUndefined<T, Key> = GetIndexedField<Exclude<T, undefined>, Key> | Extract<T, undefined>

type GetIndexedField<T, K> = K extends keyof T
	? T[K]
	: K extends `${number}`
		? '0' extends keyof T
			? undefined
			: number extends keyof T
				? T[number]
				: undefined
		: undefined

type FieldWithPossiblyUndefined<T, Key extends string> =
	| GetFieldType<Exclude<T, undefined>, Key>
	| Extract<T, undefined>

type TupleValuesKeys<T extends any[], P, TIndex extends number, TDepth extends any[]> = {
	[K in TIndex]: `[${K}]` | `[${K}]${ValuesKeys<T[K], P, TDepth>}`
}[TIndex]

type ArrayValuesKeys<T extends any[], P, TDepth extends any[]> = {
	[K in keyof T]: `[${number}]` | `[${number}]${ValuesKeys<T[K], P, TDepth>}`
}[number]

type ObjectValuesKeys<T extends object, P, TDepth extends any[]> = {
	[K in keyof T]-?: K extends string | number
		? PrefixFromDepth<K, TDepth> | `${PrefixFromDepth<K, TDepth>}${ValuesKeys<T[K], P, [TDepth]>}`
		: never
}[keyof T]

type PrefixFromDepth<T extends string | number, TDepth extends any[]> = TDepth['length'] extends 0 ? T : `.${T}`

type AllowedIndexes<Tuple extends ReadonlyArray<any>, Keys extends number = never> = Tuple extends readonly []
	? Keys
	: // eslint-disable-next-line @typescript-eslint/no-unused-vars
		Tuple extends readonly [infer _, ...infer Tail]
		? AllowedIndexes<Tail, Keys | Tail['length']>
		: Keys

type IsTuple<T> = T extends readonly any[] & {length: infer Length} ? (Length extends Index40 ? T : never) : never

type ComputeRange<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N
	? Result
	: ComputeRange<N, [...Result, Result['length']]>

type Index40 = ComputeRange<40>[number]
