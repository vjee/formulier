import {Formulier, FormulierState, Primitives, Values, stateUtils} from '@formulier/core'
import {onBeforeUnmount, shallowRef} from 'vue'

export interface Selector<V extends Values, P extends Primitives, Result> {
	(state: FormulierState<V, P>): Result
}

export function useFormSelector<V extends Values, P extends Primitives, Result>(
	form: Formulier<V, P>,
	selector: Selector<V, P, Result>,
	equalityFn: (a: Result, b: Result) => boolean = stateUtils.isEqual,
) {
	const localState = shallowRef(selector(form.getState()))
	const unsubscribe = form.subscribe(state => {
		const selected = selector(state)
		if (!equalityFn(selected, localState.value)) localState.value = selected
	})

	onBeforeUnmount(unsubscribe)

	return localState
}
