import { Formulier, GetFieldType, Primitives, Values, stateUtils } from '@formulier/core'
import { useFormSelector } from './use-form-selector'

export interface FormFieldValueOptions<V extends Values, F extends string> {
	fallback?: GetFieldType<V, F> | null | undefined
	equalityFn?: (a: unknown, b: unknown) => boolean
}

export type UseFormFieldValueResult<V extends Values, F extends string> = GetFieldType<V, F> | null | undefined

export function useFormFieldValue<V extends Values, P extends Primitives, F extends string>(
	form: Formulier<V, P>,
	name: F,
	options?: FormFieldValueOptions<V, F>,
): UseFormFieldValueResult<V, F> {
	const { fallback, equalityFn = stateUtils.isEqual } = options || {}
	return useFormSelector(form, state => stateUtils.getPath(state.values, name, fallback), equalityFn)
}
