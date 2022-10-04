import * as React from 'react'
import { Formulier, FormulierState, Nullable, Primitives, Values, stateUtils } from '@formulier/core'
import { useFormSelector } from './use-form-selector'

export function useForm<V extends Values, P extends Primitives = Primitives>(
	initialValues: Nullable<V, P>,
): ReactFormulier<V, P> {
	const [form] = React.useState(() => new ReactFormulier(initialValues))

	const unregisterList = useFormSelector(form, state => state.unregisterList, stateUtils.isEqual)

	React.useEffect(() => {
		if (unregisterList.length) {
			unregisterList.forEach(fieldName => {
				const element = form.getState().fieldElements[fieldName]
				const isMounted = !!element && element.isConnected

				if (!isMounted) {
					form.withoutNotify(() => form.unregisterField(fieldName))
				}
			})

			form.clearUnregisterList()
		}
	}, [form, unregisterList])

	return form
}

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

	withoutNotify(callback: CallableFunction): void {
		this.notifyEnabled = false
		callback()
		this.notifyEnabled = true
	}
}
