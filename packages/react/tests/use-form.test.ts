import {expect, it} from 'vitest'
import {renderHook} from '@testing-library/react'
import {useForm} from '../src/use-form'
import {useFormField} from '../src/use-form-field'

const INITIAL_VALUES = {a: {b: {c: 'c', d: 'd'}}}

const {result} = renderHook(() => useForm({initialValues: INITIAL_VALUES}))

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
