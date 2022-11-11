import { Formulier, FormulierState, Nullable, Primitives, Values, stateUtils } from '@formulier/core'

export interface ReactFormulierState<V extends Values, P extends Primitives = Primitives> extends FormulierState<V, P> {
	fieldElementRegistry: Record<string, Element | null>
	unregisterQueue: string[]
}

export class ReactFormulier<
	V extends Values = Values,
	P extends Primitives = Primitives,
	S extends ReactFormulierState<V, P> = ReactFormulierState<V, P>,
> extends Formulier<V, P, S> {
	constructor(initialValues: Nullable<V, P>) {
		super(initialValues)
		this.state.fieldElementRegistry = {}
		this.state.unregisterQueue = []
	}

	queueForUnregistration(name: string): void {
		this.state = {
			...this.state,
			unregisterQueue: [...this.state.unregisterQueue, name],
		}
		this.notify()
	}

	clearUnregisterQueue(): void {
		this.state = {
			...this.state,
			unregisterQueue: [],
		}
		this.notify()
	}

	registerElement(name: string, element: Element): void {
		this.state = {
			...this.state,
			fieldElementRegistry: stateUtils.setKey(this.state.fieldElementRegistry, name, element),
		}
		this.notify()
	}

	unregisterElement(name: string): void {
		this.state = {
			...this.state,
			fieldElementRegistry: stateUtils.removeKey(this.state.fieldElementRegistry, name),
		}
		this.notify()
	}
}
