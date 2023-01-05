import {FieldValidator, FormListener, FormulierState, Nullable, Primitives, Values} from './types'
import {getPath, isEqual, removeKey, setKey, setPath} from './state-utils'

export interface FormulierOptions<V extends Values, P extends Primitives> {
	initialValues: Nullable<V, P>
}

export class Formulier<
	V extends Values = Values,
	P extends Primitives = Primitives,
	S extends FormulierState<V, P> = FormulierState<V, P>,
> {
	notifyEnabled: boolean
	listeners: Set<FormListener>
	state: S

	constructor({initialValues}: FormulierOptions<V, P>) {
		this.notifyEnabled = true
		this.listeners = new Set()
		this.state = {
			values: initialValues,
			validators: {},
			errors: {},
			touched: {},
			submitCount: 0,
		} as S

		this.getState = this.getState.bind(this)
		this.subscribe = this.subscribe.bind(this)
	}

	getState(): S {
		return this.state
	}

	subscribe(listener: FormListener): () => void {
		this.listeners.add(listener)
		return () => {
			this.listeners.delete(listener)
		}
	}

	notify(): void {
		if (this.notifyEnabled === false) return
		this.listeners.forEach(listener => listener())
	}

	validateFields(): boolean {
		this.state = {...this.state, errors: {}}
		Object.entries(this.state.validators).forEach(([name, validate]) => {
			const value = getPath(this.state.values, name, null)
			const error = validate?.(value) || null
			this.state = {...this.state, errors: setKey(this.state.errors, name, error)}
		})
		this.notify()
		const noErrors = !Object.values(this.state.errors).some(value => value !== null)
		return noErrors
	}

	validateField(name: string): boolean {
		const validate = this.state.validators[name]
		const value = getPath(this.state.values, name, null)
		const error = validate?.(value) || null
		this.state = {...this.state, errors: setKey(this.state.errors, name, error)}
		this.notify()
		return !!validate && !error
	}

	registerField(name: string, validate: FieldValidator | undefined): void {
		const value = getPath(this.state.values, name, null)
		const errors = this.state.errors[name]
		const touched = this.state.touched[name]
		this.state = {
			...this.state,
			values: setPath(this.state.values, name, value),
			validators: setKey(this.state.validators, name, validate || null),
		}
		if (errors === undefined) {
			this.state = {...this.state, errors: setKey(this.state.errors, name, null)}
		}
		if (touched === undefined) {
			this.state = {...this.state, touched: setKey(this.state.touched, name, false)}
		}
		this.notify()
	}

	unregisterField(name: string): void {
		this.state = {
			...this.state,
			values: setPath(this.state.values, name, undefined),
			validators: removeKey(this.state.validators, name),
			errors: removeKey(this.state.errors, name),
			touched: removeKey(this.state.touched, name),
		}
		this.notify()
	}

	setFieldValue(name: string, value: unknown): void {
		if (isEqual(getPath(this.state.values, name), value)) return
		this.state = {
			...this.state,
			values: setPath(this.state.values, name, value),
		}
		this.notify()
	}

	touchField(name: string, touched = true): void {
		if (this.state.touched[name] === touched) return
		this.state = {
			...this.state,
			touched: setKey(this.state.touched, name, touched),
		}
		this.notify()
	}

	incrementSubmitCount(): void {
		this.state = {
			...this.state,
			submitCount: this.state.submitCount + 1,
		}
		this.notify()
	}

	withoutNotify(callback: CallableFunction): void {
		this.notifyEnabled = false
		callback()
		this.notifyEnabled = true
	}
}
