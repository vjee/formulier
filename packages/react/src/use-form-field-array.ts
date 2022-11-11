import { FormFieldValueOptions, useFormFieldValue } from './use-form-field-value'
import { GetFieldType, Values, arrayUtils } from '@formulier/core'
import { ReactFormulier } from './form'
import { createError } from './error'
import { useEvent } from './use-event'

type FieldArrayItem<V extends Values, F extends string> = GetFieldType<V, F> extends (infer T)[] ? T : never

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

export function useFormFieldArray<V extends Values, F extends string>(
	form: ReactFormulier<V>,
	name: F,
	options?: FormFieldArrayOptions<V, F>,
): [items: FieldArrayItem<V, F>[], arrayMethods: FieldArrayMethods<FieldArrayItem<V, F>>] {
	const { valueOptions } = options || {}
	const items = useFormFieldValue(form, name, valueOptions) as FieldArrayItem<V, F>[]

	if (!Array.isArray(items)) {
		throw createError('useFormFieldArray()', 'The provided field is not an array.')
	}

	const push = useEvent((item: FieldArrayItem<V, F>) => {
		form.setFieldValue(name, arrayUtils.push(items, item))
	})

	const insert = useEvent((item: FieldArrayItem<V, F>, index: number) => {
		form.setFieldValue(name, arrayUtils.insert(items, item, index))
	})

	const remove = useEvent((index: number) => {
		form.setFieldValue(name, arrayUtils.remove(items, index))
	})

	const move = useEvent((fromIndex: number, toIndex: number) => {
		form.setFieldValue(name, arrayUtils.move(items, fromIndex, toIndex))
	})

	const swap = useEvent((fromIndex: number, toIndex: number) => {
		form.setFieldValue(name, arrayUtils.swap(items, fromIndex, toIndex))
	})

	const arrayMethods: FieldArrayMethods<FieldArrayItem<V, F>> = {
		push,
		insert,
		remove,
		move,
		swap,
	}

	return [items, arrayMethods]
}
