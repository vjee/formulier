import { expect, it, vi } from 'vitest'
import { ReactFormulier } from '../src/form'

const INITIAL_VALUES = { a: { b: { c: 'c', d: 'd' } } }

it('adds to unregister list', () => {
	const form = new ReactFormulier(INITIAL_VALUES)
	const listener = vi.fn(() => undefined)
	form.subscribe(listener)
	form.queueForUnregistration('a.b.c')
	expect(listener).toHaveBeenCalledTimes(1)
	expect(form.getState().unregisterQueue).toContain('a.b.c')
})

it('clears unregister list', () => {
	const form = new ReactFormulier(INITIAL_VALUES)
	form.queueForUnregistration('a.b.c')
	form.clearUnregisterQueue()
	expect(form.getState().unregisterQueue).toHaveLength(0)
})

it('registers elements', () => {
	const form = new ReactFormulier(INITIAL_VALUES)
	const element = document.createElement('input')
	form.registerElement('a.b.c', element)
	expect(form.getState().fieldElementRegistry['a.b.c']).toBeDefined()
	expect(form.getState().fieldElementRegistry['a.b.c']).toBe(element)
})

it('unregisters elements', () => {
	const form = new ReactFormulier(INITIAL_VALUES)
	const element = document.createElement('input')
	form.registerElement('a.b.c', element)
	form.unregisterElement('a.b.c')
	expect(form.getState().fieldElementRegistry['a.b.c']).toBeUndefined()
})
