import {FieldValidator, FormulierState, Nullable, Primitives, Values} from './types'
import {getPath, isEqual, removeKey, setKey, setPath} from './state-utils'

export interface FormulierOptions<V extends Values, P extends Primitives> {
	initialValues: Nullable<V, P>
}

export class Formulier<V extends Values = Values, P extends Primitives = Primitives> {
	store: Store<FormulierState<V, P>>
	instances: Record<string, Set<string>> = {}

	constructor({initialValues}: FormulierOptions<V, P>) {
		this.store = new Store({
			values: initialValues,
			validators: {},
			errors: {},
			touched: {},
			submitCount: 0,
		})
	}

	setFieldErrors = (fieldErrors: FormulierState<V, P>['errors']): void => {
		this.store.batch(() => {
			this.store.setState(state => ({...state, errors: {}}))
			for (const [name, error] of Object.entries(fieldErrors)) {
				this.store.setState(state => ({...state, errors: setKey(state.errors, name, error)}))
			}
		})
	}

	validateFields = (): boolean => {
		const {validators, values} = this.store.getState()
		const fieldErrors = Object.fromEntries(
			Object.entries(validators).map(([name, validate]) => {
				const value = getPath(values, name, null)
				const error = validate?.(value) || null
				return [name, error]
			}),
		)
		this.setFieldErrors(fieldErrors)
		const noErrors = Object.values(this.store.getState().errors).every(value => value == null)
		return noErrors
	}

	validateField = (name: string): boolean => {
		const {validators, values} = this.store.getState()
		const validate = validators[name]
		const value = getPath(values, name, null)
		const error = validate?.(value) || null
		this.store.setState(state => ({...state, errors: setKey(state.errors, name, error)}))
		return !!validate && !error
	}

	registerField = (name: string, validate: FieldValidator | undefined): (() => void) => {
		this.store.setState(state => ({
			...state,
			values: setPath(state.values, name, getPath(state.values, name, null)),
			validators: setKey(state.validators, name, validate || null),
			errors: state.errors[name] === undefined ? setKey(state.errors, name, null) : state.errors,
			touched: state.touched[name] === undefined ? setKey(state.touched, name, false) : state.touched,
		}))
		return () => {
			this.store.setState(state => ({
				...state,
				values: setPath(state.values, name, undefined),
				validators: removeKey(state.validators, name),
				errors: removeKey(state.errors, name),
				touched: removeKey(state.touched, name),
			}))
		}
	}

	addInstance = (name: string, instanceId: string): (() => void) => {
		this.instances[name] ||= new Set()
		this.instances[name].add(instanceId)
		return () => {
			this.instances[name]?.delete(instanceId)
		}
	}

	hasInstance = (name: string): boolean => {
		return !!this.instances[name]?.size
	}

	setFieldValue = (name: string, value: unknown): void => {
		const {values} = this.store.getState()
		if (isEqual(getPath(values, name), value)) return
		this.store.setState(state => ({...state, values: setPath(state.values, name, value)}))
	}

	touchField = (name: string, value = true): void => {
		const {touched} = this.store.getState()
		if (touched[name] === value) return
		this.store.setState(state => ({...state, touched: setKey(state.touched, name, value)}))
	}

	incrementSubmitCount = (): void => {
		this.store.setState(state => ({...state, submitCount: state.submitCount + 1}))
	}
}

class Store<S> {
	private batching = false
	private flushing = 0
	private listeners = new Set<(state: S) => void>()
	private state: S

	constructor(state: S) {
		this.state = state
	}

	getState = (): S => {
		return this.state
	}

	setState = (updater: (previous: S) => S): void => {
		this.state = updater(this.state)
		this.flush()
	}

	subscribe = (listener: (state: S) => void): (() => void) => {
		this.listeners.add(listener)
		return () => {
			this.listeners.delete(listener)
		}
	}

	batch = (callback: () => void): void => {
		if (this.batching === true) return void callback()
		this.batching = true
		callback()
		this.batching = false
		this.flush()
	}

	private flush = (): void => {
		if (this.batching === true) return
		const state = this.getState()
		const flushId = ++this.flushing
		for (const listener of this.listeners) {
			if (this.flushing !== flushId) continue
			listener(state)
		}
	}
}
