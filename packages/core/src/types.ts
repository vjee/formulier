interface FormulierOptions<V extends Values, P extends Primitives> {
	initialValues: Nullable<V, P>
}

type Primitives = string | number | boolean | Date | File

type Values = Record<string, any>

type Nullable<Values, P extends Primitives = Primitives> = {
	[Prop in keyof Values]: Values[Prop] extends P | null | undefined
		? Values[Prop] | null
		: Values[Prop] extends (infer A)[]
			? Nullable<A, P>[] | null
			: Nullable<Values[Prop], P>
}

type FieldValidator = (value: unknown) => string | null

interface FormulierState<V extends Values, P extends Primitives = Primitives> {
	values: Nullable<V, P>
	validators: Record<string, FieldValidator | null>
	errors: Record<string, string | null>
	touched: Record<string, boolean>
	submitCount: number
}

type GetFieldType<T, P extends string> = string extends P
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

export type {FormulierOptions, Primitives, Values, Nullable, FieldValidator, FormulierState, GetFieldType}
