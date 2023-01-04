import { Formulier, FormulierState, Primitives, Values } from '@formulier/core'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

export interface Selector<V extends Values, P extends Primitives, S extends FormulierState<V, P>, Result> {
	(state: S): Result
}

export function useFormSelector<V extends Values, P extends Primitives, S extends FormulierState<V, P>, Result>(
	form: Formulier<V, P, S>,
	selector: Selector<V, P, S, Result>,
	equalityFn?: (a: Result, b: Result) => boolean,
) {
	return useSyncExternalStoreWithSelector(form.subscribe, form.getState, undefined, selector, equalityFn)
}
