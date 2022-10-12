import { GetFieldType, Primitives, Values, stateUtils } from '@formulier/core'
import { ReactFormulier } from './store'
import { useFormSelector } from './use-form-selector'

export function useFormFieldValue<V extends Values, P extends Primitives, F extends string>(
	store: ReactFormulier<V, P>,
	name: F,
	equalityFn: (a: unknown, b: unknown) => boolean = stateUtils.isEqual,
): GetFieldType<V, F> | null | undefined {
	return useFormSelector(store, state => stateUtils.getPath(state.values, name), equalityFn)
}
