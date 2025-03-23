import {describe, expect, it, vi} from 'vitest'

import {Formulier} from '../src/form.js'
import {getPath} from '../src/state-utils.js'

const INITIAL_VALUES = {a: {b: {c: 'c', d: 'd'}}}

describe('form', () => {
	it('copies initial values', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		expect(form.store.getState().values).toBe(INITIAL_VALUES)
	})

	it('calls listeners', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		const listener = vi.fn(() => undefined)
		form.store.subscribe(listener)
		form.setFieldValue('a.b.c', 'd')
		expect(listener).toHaveBeenCalledTimes(1)
	})

	it('removes listeners', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		const listener = vi.fn(() => undefined)
		const cancel = form.store.subscribe(listener)
		cancel()
		form.setFieldValue('a.b.c', 'd')
		expect(listener).toHaveBeenCalledTimes(0)
		expect(form.store['listeners'].size).toBe(0)
	})

	it('touches fields', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		expect(form.store.getState().touched['a.b.c']).toBe(undefined)
		form.touchField('a.b.c')
		expect(form.store.getState().touched['a.b.c']).toBe(true)
	})

	it('increments submit count', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		expect(form.store.getState().submitCount).toBe(0)
		form.incrementSubmitCount()
		form.incrementSubmitCount()
		expect(form.store.getState().submitCount).toBe(2)
	})

	it('should not call listeners if setFieldValue does nothing', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		const listener = vi.fn(() => undefined)
		form.store.subscribe(listener)
		expect(listener).toHaveBeenCalledTimes(0)
		form.setFieldValue('a.b.c', 'd')
		expect(listener).toHaveBeenCalledTimes(1)
		form.setFieldValue('a.b.c', 'd')
		expect(listener).toHaveBeenCalledTimes(1)
	})

	it('should not call listeners if touchField does nothing', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		const listener = vi.fn(() => undefined)
		form.store.subscribe(listener)
		expect(listener).toHaveBeenCalledTimes(0)
		form.touchField('a.b.c')
		expect(listener).toHaveBeenCalledTimes(1)
		form.touchField('a.b.c')
		expect(listener).toHaveBeenCalledTimes(1)
	})

	it('registers and unregisters fields', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		const validator = () => null
		expect((form.store.getState().values as any).b).toBe(undefined)
		expect(form.store.getState().touched['b']).toBe(undefined)
		expect(form.store.getState().errors['b']).toBe(undefined)
		expect(form.store.getState().validators['b']).toBe(undefined)
		const unregisterB = form.registerField('b', validator)
		const unregisterC = form.registerField('c', undefined)
		expect((form.store.getState().values as any).b).toBe(null)
		expect(form.store.getState().touched['b']).toBe(false)
		expect(form.store.getState().errors['b']).toBe(null)
		expect(form.store.getState().validators['b']).toBe(validator)
		expect(form.store.getState().validators['c']).toBe(null)
		form.setFieldValue('b', 'value')
		form.setFieldValue('c', 'value')
		expect(getPath(form.store.getState().values, 'b')).toBe('value')
		form.registerField('b', validator)
		form.registerField('c', undefined)
		expect(getPath(form.store.getState().values, 'b')).toBe('value')
		unregisterB()
		unregisterC()
		expect((form.store.getState().values as any).b).toBe(undefined)
		expect(form.store.getState().touched['b']).toBe(undefined)
		expect(form.store.getState().errors['b']).toBe(undefined)
		expect(form.store.getState().validators['b']).toBe(undefined)
		expect(form.store.getState().validators['c']).toBe(undefined)
	})

	it('validates field', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		const validator = (value: unknown) => (value === 1 ? null : 'Error!')
		form.registerField('a.b.c', validator)
		expect(form.validateField('a.b.c')).toBe(false)
		expect(form.store.getState().errors['a.b.c']).toBe('Error!')
		form.setFieldValue('a.b.c', 1)
		expect(form.validateField('a.b.c')).toBe(true)
		expect(form.store.getState().errors['a.b.c']).toBe(null)
	})

	it('validates fields', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		const validator = (value: unknown) => (value === 1 ? null : 'Error!')
		form.registerField('a.b.c', validator)
		form.registerField('a.b.d', validator)
		form.setFieldValue('a.b.c', 1)
		expect(form.validateFields()).toBe(false)
		expect(form.store.getState().errors['a.b.c']).toBe(null)
		expect(form.store.getState().errors['a.b.d']).toBe('Error!')
		form.setFieldValue('a.b.d', 1)
		expect(form.validateFields()).toBe(true)
		expect(form.store.getState().errors['a.b.c']).toBe(null)
		expect(form.store.getState().errors['a.b.d']).toBe(null)
	})

	it('skips calling listeners when batching', () => {
		const form = new Formulier({initialValues: INITIAL_VALUES})
		const listener = vi.fn(() => undefined)
		form.store.subscribe(listener)
		expect(listener).toHaveBeenCalledTimes(0)
		form.store.setState(state => ({...state, errors: {'a.b.c': 'Error 1'}}))
		form.store.setState(state => ({...state, errors: {'a.b.c': 'Error 2'}}))
		expect(listener).toHaveBeenCalledTimes(2)
		form.store.batch(() => {
			form.store.setState(state => ({...state, errors: {'a.b.c': 'Error 3'}}))
			form.store.setState(state => ({...state, errors: {'a.b.c': 'Error 4'}}))
		})
		expect(listener).toHaveBeenCalledTimes(3)
	})
})
