import { GetFieldType, Values, arrayUtils } from '@formulier/core'
import { ReactFormulier } from './store'
import { createError } from './error'
import { useEvent } from './use-event'
import { useFormFieldValue } from './use-form-field-value'

type FieldArrayItem<V extends Values, F extends string> = GetFieldType<V, F> extends (infer T)[] ? T : never

export interface FieldArrayMethods<Item> {
	push: (item: Item) => void
	insert: (item: Item, index: number) => void
	remove: (index: number) => void
	move: (fromIndex: number, toIndex: number) => void
	swap: (fromIndex: number, toIndex: number) => void
}

export function useFormFieldArray<V extends Values, F extends string>(
	form: ReactFormulier<V>,
	name: F,
): [items: FieldArrayItem<V, F>[], arrayMethods: FieldArrayMethods<FieldArrayItem<V, F>>] {
	const items = useFormFieldValue(form, name) as FieldArrayItem<V, F>[]

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
