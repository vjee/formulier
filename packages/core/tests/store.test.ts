import { expect, it, vi } from 'vitest'
import { Formulier } from '../src/store'
import { getPath } from '../src/state-utils'

const INITIAL_VALUES = { a: { b: { c: 'c', d: 'd' } } }

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
