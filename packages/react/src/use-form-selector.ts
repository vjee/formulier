import {Formulier, FormulierState, Primitives, Values} from '@formulier/core'
import {useSyncExternalStoreWithSelector} from 'use-sync-external-store/with-selector.js'

export interface Selector<V extends Values, P extends Primitives, Result> {
	(state: FormulierState<V, P>): Result
}

export function useFormSelector<V extends Values, P extends Primitives, Result>(
	form: Formulier<V, P>,
	selector: Selector<V, P, Result>,
	equalityFn?: (a: Result, b: Result) => boolean,
) {
	return useSyncExternalStoreWithSelector(
		form.store.subscribe,
		form.store.getState,
		form.store.getState,
		selector,
		equalityFn,
	)
}
