import { expect, it, vi } from 'vitest'
import { ReactFormulier } from '../src/store'

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
