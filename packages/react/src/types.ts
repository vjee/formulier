import type {
	FieldValidator,
	Formulier,
	FormulierState,
	GetFieldType,
	Nullable,
	Primitives,
	Values,
} from '@formulier/core'

interface FieldOptions<V extends Values, F extends string> {
	name: F
	validate?: FieldValidator
	valueOptions?: FormFieldValueOptions<V, F>
	flushSyncOnChange?: boolean
	flushSyncOnBlur?: boolean
}

type UseFormFieldResult<V extends Values, F extends string> = [FieldInputProps<V, F>, FieldMeta]

interface FieldInputProps<V extends Values, F extends string> {
	id: string
	name: string
	value: GetFieldType<V, F> | null | undefined
	onChange: (value: GetFieldType<V, F> | null | undefined) => void
	onBlur: () => void
}

interface FieldMeta {
	error: string | null
	touched: boolean
}

type FieldArrayItem<V extends Values, F extends string> = GetFieldType<V, F> extends (infer T)[] ? T : never
type IsNever<T> = [T] extends [never] ? true : false

interface FieldArrayMethods<Item> {
	push: (item: Item) => void
	insert: (item: Item, index: number) => void
	remove: (index: number) => void
	move: (fromIndex: number, toIndex: number) => void
	swap: (fromIndex: number, toIndex: number) => void
}

interface FormFieldArrayOptions<V extends Values, F extends string> {
	valueOptions?: FormFieldValueOptions<V, F>
}

type UseFormFieldArrayResult<Item, P extends Primitives = Primitives> =
	IsNever<Item> extends true
		? [Items: never, arrayMethods: FieldArrayMethods<never>]
		: Item extends P
			? [Items: Item[], arrayMethods: FieldArrayMethods<Item>]
			: Item extends Record<string, any>
				? [Items: Item[], arrayMethods: FieldArrayMethods<Nullable<Item, P>>]
				: [items: Item[], arrayMethods: FieldArrayMethods<Item>]

interface FormFieldValueOptions<V extends Values, F extends string> {
	fallback?: GetFieldType<V, F> | null | undefined
	equalityFn?: (a: unknown, b: unknown) => boolean
}

type UseFormFieldValueResult<V extends Values, F extends string> = GetFieldType<V, F> | null | undefined

interface FormContext<V extends Values, P extends Primitives> {
	form: Formulier<V, P>
}

interface FormProviderProps<V extends Values, P extends Primitives> {
	form: Formulier<V, P>
	children: React.ReactNode
}

interface Selector<V extends Values, P extends Primitives, Result> {
	(state: FormulierState<V, P>): Result
}

export type {
	FieldOptions,
	UseFormFieldResult,
	FieldInputProps,
	FieldMeta,
	FieldArrayItem,
	FieldArrayMethods,
	FormFieldArrayOptions,
	UseFormFieldArrayResult,
	FormFieldValueOptions,
	UseFormFieldValueResult,
	FormContext,
	FormProviderProps,
	Selector,
}
