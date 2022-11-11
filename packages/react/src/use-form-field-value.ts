import { GetFieldType, Primitives, Values, stateUtils } from '@formulier/core'
import { ReactFormulier } from './form'
import { useFormSelector } from './use-form-selector'

export interface FormFieldValueOptions<V extends Values, F extends string> {
	fallback?: GetFieldType<V, F> | null | undefined
	equalityFn?: (a: unknown, b: unknown) => boolean
}

export function useFormFieldValue<V extends Values, P extends Primitives, F extends string>(
	form: ReactFormulier<V, P>,
	name: F,
	options?: FormFieldValueOptions<V, F>,
): GetFieldType<V, F> | null | undefined {
	const { fallback, equalityFn = stateUtils.isEqual } = options || {}
	return useFormSelector(form, state => stateUtils.getPath(state.values, name, fallback), equalityFn)
}
