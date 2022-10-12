import { Formulier, FormulierState, Nullable, Primitives, Values, stateUtils } from '@formulier/core'

export interface ReactFormulierState<V extends Values, P extends Primitives = Primitives> extends FormulierState<V, P> {
	fieldElements: Record<string, Element | null>
	unregisterList: string[]
}

export class ReactFormulier<
	V extends Values = Values,
	P extends Primitives = Primitives,
	S extends ReactFormulierState<V, P> = ReactFormulierState<V, P>,
> extends Formulier<V, P, S> {
	constructor(initialValues: Nullable<V, P>) {
		super(initialValues)
		this.state.fieldElements = {}
		this.state.unregisterList = []
	}

	addToUnregisterList(name: string): void {
		this.state = {
			...this.state,
			unregisterList: [...this.state.unregisterList, name],
		}
		this.notify()
	}

	clearUnregisterList(): void {
		this.state = {
			...this.state,
			unregisterList: [],
		}
		this.notify()
	}

	registerElement(name: string, element: Element): void {
		this.state = {
			...this.state,
			fieldElements: stateUtils.setKey(this.state.fieldElements, name, element),
		}
		this.notify()
	}

	unregisterElement(name: string): void {
		this.state = {
			...this.state,
			fieldElements: stateUtils.removeKey(this.state.fieldElements, name),
		}
		this.notify()
	}
}

if (import.meta.vitest) {
	const { vi, it, expect } = import.meta.vitest
	const INITIAL_VALUES = { a: { b: { c: 'c', d: 'd' } } }

	it('adds to unregister list', () => {
		const instance = new ReactFormulier(INITIAL_VALUES)
		const listener = vi.fn(() => undefined)
		instance.subscribe(listener)
		instance.addToUnregisterList('a.b.c')
		expect(listener).toHaveBeenCalledTimes(1)
		expect(instance.getState().unregisterList).toContain('a.b.c')
	})

	it('clears unregister list', () => {
		const instance = new ReactFormulier(INITIAL_VALUES)
		instance.addToUnregisterList('a.b.c')
		instance.clearUnregisterList()
		expect(instance.getState().unregisterList).toHaveLength(0)
	})

	it('registers elements', () => {
		const instance = new ReactFormulier(INITIAL_VALUES)
		const element = document.createElement('input')
		instance.registerElement('a.b.c', element)
		expect(instance.getState().fieldElements['a.b.c']).toBeDefined()
		expect(instance.getState().fieldElements['a.b.c']).toBe(element)
	})

	it('unregisters elements', () => {
		const instance = new ReactFormulier(INITIAL_VALUES)
		const element = document.createElement('input')
		instance.registerElement('a.b.c', element)
		instance.unregisterElement('a.b.c')
		expect(instance.getState().fieldElements['a.b.c']).toBeUndefined()
	})
}
