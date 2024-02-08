import {expect, it} from 'vitest'
import {renderHook} from '@testing-library/react'
import {useCreateForm} from '../src/use-create-form'
import {useFormField} from '../src/use-form-field'

interface FormState {
	a: {b: {c: string; d: string}}
}

const microtask = () => new Promise<void>(resolve => queueMicrotask(resolve))

const {result: form} = renderHook(() => useCreateForm<FormState>({initialValues: {a: {b: {c: 'c', d: 'd'}}}}))

it('renders hook', () => {
	expect(form.current.store.getState).toBeDefined()
})

it('unregisters field values when unmounted', async () => {
	const {
		result: field,
		rerender: rerenderField,
		unmount: unmountField,
	} = renderHook(options => useFormField(form.current, options), {
		initialProps: {name: 'a.b.c'},
	})
	expect(field.current[0].value).toBe('c')
	rerenderField({name: 'a.b.d'})
	await microtask()
	expect(form.current.store.getState().values.a.b.c).toBe(undefined)
	expect(field.current[0].value).toBe('d')
	unmountField()
	await microtask()
	expect(form.current.store.getState().values.a.b.d).toBe(undefined)
})
