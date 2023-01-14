import {expect, it} from 'vitest'
import {renderHook} from '@testing-library/react'
import {useCreateForm} from '../src/use-create-form'
import {useFormField} from '../src/use-form-field'

interface FormState {
	a: {b: {c: string; d: string}}
}

const {result} = renderHook(() => useCreateForm<FormState>({initialValues: {a: {b: {c: 'c', d: 'd'}}}}))

it('renders hook', () => {
	expect(result.current.getState).toBeDefined()
})

it('unregisters field values when unmounted', () => {
	const {rerender: fieldRerender, unmount: fieldUnmount} = renderHook(
		options => useFormField(result.current, options),
		{initialProps: {name: 'a.b.c'}},
	)
	expect(result.current.getState().values.a.b.c).toBe('c')
	fieldRerender({name: 'a.b.d'})
	expect(result.current.getState().values.a.b.c).toBe(undefined)
	expect(result.current.getState().values.a.b.d).toBe('d')
	fieldUnmount()
	expect(result.current.getState().values.a.b.d).toBe(undefined)
})
