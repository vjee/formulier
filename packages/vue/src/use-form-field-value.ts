import {Formulier, GetFieldType, Primitives, Values, stateUtils} from '@formulier/core'
import {ShallowRef} from 'vue'
import {useFormSelector} from './use-form-selector'

export interface FormFieldValueOptions<V extends Values, F extends string> {
	fallback?: GetFieldType<V, F> | null | unknown
}

export type UseFormFieldValueResult<V extends Values, F extends string> = ShallowRef<
	GetFieldType<V, F> | null | undefined
>

export function useFormFieldValue<V extends Values, P extends Primitives, F extends string>(
	form: Formulier<V, P>,
	name: F,
	options?: FormFieldValueOptions<V, F>,
): UseFormFieldValueResult<V, F> {
	const {fallback} = options || {}
	const value = useFormSelector(
		form,
		state => stateUtils.getPath(state.values, name, fallback) as GetFieldType<V, F> | null | undefined,
	)
	return value
}
