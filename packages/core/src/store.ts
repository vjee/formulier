import { FieldValidator, FormulierState, Nullable, Primitives, StoreListener, Values } from './types'
import { getPath, isEqual, removeKey, setKey, setPath } from './state-utils'

export class Formulier<
	V extends Values = Values,
	P extends Primitives = Primitives,
	S extends FormulierState<V, P> = FormulierState<V, P>,
> {
	notifyEnabled: boolean
	listeners: Set<StoreListener>
	state: S

	constructor(initialValues: Nullable<V, P>) {
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

	subscribe(listener: StoreListener): () => void {
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
		this.state = { ...this.state, errors: {} }
		Object.entries(this.state.validators).forEach(([name, validate]) => {
			const value = getPath(this.state.values, name, null)
			const error = validate?.(value) || null
			this.state = { ...this.state, errors: setKey(this.state.errors, name, error) }
		})
		this.notify()
		const noErrors = !Object.values(this.state.errors).some(value => value !== null)
		return noErrors
	}

	validateField(name: string): boolean {
		const validate = this.state.validators[name]
		const value = getPath(this.state.values, name, null)
		const error = validate?.(value) || null
		this.state = { ...this.state, errors: setKey(this.state.errors, name, error) }
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
			this.state = { ...this.state, errors: setKey(this.state.errors, name, null) }
		}
		if (touched === undefined) {
			this.state = { ...this.state, touched: setKey(this.state.touched, name, false) }
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

if (import.meta.vitest) {
	const { vi, describe, it, expect } = import.meta.vitest
	const INITIAL_VALUES = { a: { b: { c: 'c', d: 'd' } } }

	describe('Formulier', () => {
		it('copies initial values', () => {
			const instance = new Formulier(INITIAL_VALUES)
			expect(instance.getState().values).toBe(INITIAL_VALUES)
		})

		it('calls listeners', () => {
			const instance = new Formulier(INITIAL_VALUES)
			const listener = vi.fn(() => undefined)
			instance.subscribe(listener)
			instance.setFieldValue('a.b.c', 'd')
			expect(listener).toHaveBeenCalledTimes(1)
		})

		it('removes listeners', () => {
			const instance = new Formulier(INITIAL_VALUES)
			const listener = vi.fn(() => undefined)
			const cancel = instance.subscribe(listener)
			cancel()
			instance.setFieldValue('a.b.c', 'd')
			expect(listener).toHaveBeenCalledTimes(0)
			expect(instance.listeners.size).toBe(0)
		})

		it('touches fields', () => {
			const instance = new Formulier(INITIAL_VALUES)
			expect(instance.getState().touched['a.b.c']).toBe(undefined)
			instance.touchField('a.b.c')
			expect(instance.getState().touched['a.b.c']).toBe(true)
		})

		it('increments submit count', () => {
			const instance = new Formulier(INITIAL_VALUES)
			expect(instance.getState().submitCount).toBe(0)
			instance.incrementSubmitCount()
			instance.incrementSubmitCount()
			expect(instance.getState().submitCount).toBe(2)
		})

		it('should not call listeners if setFieldValue does nothing', () => {
			const instance = new Formulier(INITIAL_VALUES)
			const listener = vi.fn(() => undefined)
			instance.subscribe(listener)
			expect(listener).toHaveBeenCalledTimes(0)
			instance.setFieldValue('a.b.c', 'd')
			expect(listener).toHaveBeenCalledTimes(1)
			instance.setFieldValue('a.b.c', 'd')
			expect(listener).toHaveBeenCalledTimes(1)
		})

		it('should not call listeners if touchField does nothing', () => {
			const instance = new Formulier(INITIAL_VALUES)
			const listener = vi.fn(() => undefined)
			instance.subscribe(listener)
			expect(listener).toHaveBeenCalledTimes(0)
			instance.touchField('a.b.c')
			expect(listener).toHaveBeenCalledTimes(1)
			instance.touchField('a.b.c')
			expect(listener).toHaveBeenCalledTimes(1)
		})

		it('registers and unregisters fields', () => {
			const instance = new Formulier(INITIAL_VALUES)
			const validator = () => null
			expect((instance.getState().values as any).b).toBe(undefined)
			expect(instance.getState().touched['b']).toBe(undefined)
			expect(instance.getState().errors['b']).toBe(undefined)
			expect(instance.getState().validators['b']).toBe(undefined)
			instance.registerField('b', validator)
			instance.registerField('c', undefined)
			expect((instance.getState().values as any).b).toBe(null)
			expect(instance.getState().touched['b']).toBe(false)
			expect(instance.getState().errors['b']).toBe(null)
			expect(instance.getState().validators['b']).toBe(validator)
			expect(instance.getState().validators['c']).toBe(null)
			instance.setFieldValue('b', 'value')
			instance.setFieldValue('c', 'value')
			expect(getPath(instance.getState().values, 'b')).toBe('value')
			instance.registerField('b', validator)
			instance.registerField('c', undefined)
			expect(getPath(instance.getState().values, 'b')).toBe('value')
			instance.unregisterField('b')
			instance.unregisterField('c')
			expect((instance.getState().values as any).b).toBe(undefined)
			expect(instance.getState().touched['b']).toBe(undefined)
			expect(instance.getState().errors['b']).toBe(undefined)
			expect(instance.getState().validators['b']).toBe(undefined)
			expect(instance.getState().validators['c']).toBe(undefined)
		})

		it('validates field', () => {
			const instance = new Formulier(INITIAL_VALUES)
			const validator = (value: unknown) => (value === 1 ? null : 'Error!')
			instance.registerField('a.b.c', validator)
			expect(instance.validateField('a.b.c')).toBe(false)
			expect(instance.getState().errors['a.b.c']).toBe('Error!')
			instance.setFieldValue('a.b.c', 1)
			expect(instance.validateField('a.b.c')).toBe(true)
			expect(instance.getState().errors['a.b.c']).toBe(null)
		})

		it('validates fields', () => {
			const instance = new Formulier(INITIAL_VALUES)
			const validator = (value: unknown) => (value === 1 ? null : 'Error!')
			instance.registerField('a.b.c', validator)
			instance.registerField('a.b.d', validator)
			instance.setFieldValue('a.b.c', 1)
			expect(instance.validateFields()).toBe(false)
			expect(instance.getState().errors['a.b.c']).toBe(null)
			expect(instance.getState().errors['a.b.d']).toBe('Error!')
			instance.setFieldValue('a.b.d', 1)
			expect(instance.validateFields()).toBe(true)
			expect(instance.getState().errors['a.b.c']).toBe(null)
			expect(instance.getState().errors['a.b.d']).toBe(null)
		})

		it('skips calling listeners', () => {
			const instance = new Formulier(INITIAL_VALUES)
			const listener = vi.fn(() => undefined)
			instance.subscribe(listener)
			instance.notify()
			expect(listener).toHaveBeenCalledTimes(1)
			instance.withoutNotify(() => {
				instance.notify()
			})
			expect(listener).toHaveBeenCalledTimes(1)
		})
	})
}
