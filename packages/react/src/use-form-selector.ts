import { Primitives, Values } from '@formulier/core'
import { ReactFormulier, ReactFormulierState } from './store'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

export interface Selector<V extends Values, P extends Primitives, S extends ReactFormulierState<V, P>, Result> {
	(state: S): Result
}

export function useFormSelector<V extends Values, P extends Primitives, S extends ReactFormulierState<V, P>, Result>(
	store: ReactFormulier<V, P, S>,
	selector: Selector<V, P, S, Result>,
	equalityFn?: (a: Result, b: Result) => boolean,
) {
	return useSyncExternalStoreWithSelector(store.subscribe, store.getState, undefined, selector, equalityFn)
}
