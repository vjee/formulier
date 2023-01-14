import {FormFieldValueOptions, useFormFieldValue} from './use-form-field-value'
import {Formulier, GetFieldType, Nullable, Primitives, Values, arrayUtils} from '@formulier/core'
import {ShallowRef} from 'vue'
import {createError} from './error'

type FieldArrayItem<V extends Values, F extends string> = GetFieldType<V, F> extends (infer T)[] ? T : never
type IsNever<T> = [T] extends [never] ? true : false

export interface FieldArrayMethods<Item> {
	push: (item: Item) => void
	insert: (item: Item, index: number) => void
	remove: (index: number) => void
	move: (fromIndex: number, toIndex: number) => void
	swap: (fromIndex: number, toIndex: number) => void
}

export interface FormFieldArrayOptions<V extends Values, F extends string> {
	valueOptions?: FormFieldValueOptions<V, F>
}

export type UseFormFieldArrayResult<Item, P extends Primitives = Primitives> = IsNever<Item> extends true
	? [Items: ShallowRef<never>, arrayMethods: FieldArrayMethods<never>]
	: Item extends P
	? [Items: ShallowRef<Item[]>, arrayMethods: FieldArrayMethods<Item>]
	: Item extends Record<string, any>
	? [Items: ShallowRef<Item[]>, arrayMethods: FieldArrayMethods<Nullable<Item, P>>]
	: [items: ShallowRef<Item[]>, arrayMethods: FieldArrayMethods<Item>]

export function useFormFieldArray<V extends Values, F extends string, P extends Primitives>(
	form: Formulier<V>,
	name: F,
	options?: FormFieldArrayOptions<V, F>,
): UseFormFieldArrayResult<FieldArrayItem<V, F>, P> {
	const {valueOptions} = options || {}
	const items = useFormFieldValue(form, name, valueOptions) as ShallowRef<unknown[]>

	if (!Array.isArray(items.value)) {
		throw createError('useFormFieldArray()', 'The provided field is not an array.')
	}

	const push = (item: unknown) => {
		form.setFieldValue(name, arrayUtils.push(items.value, item))
	}

	const insert = (item: unknown, index: number) => {
		form.setFieldValue(name, arrayUtils.insert(items.value, item, index))
	}

	const remove = (index: number) => {
		form.setFieldValue(name, arrayUtils.remove(items.value, index))
	}

	const move = (fromIndex: number, toIndex: number) => {
		form.setFieldValue(name, arrayUtils.move(items.value, fromIndex, toIndex))
	}

	const swap = (fromIndex: number, toIndex: number) => {
		form.setFieldValue(name, arrayUtils.swap(items.value, fromIndex, toIndex))
	}

	const arrayMethods: FieldArrayMethods<unknown> = {
		push,
		insert,
		remove,
		move,
		swap,
	}

	return [items, arrayMethods] as any
}
