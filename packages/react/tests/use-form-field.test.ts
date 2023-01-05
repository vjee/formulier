import {FieldOptions, useFormField} from '../src/use-form-field'
import {expect, it} from 'vitest'
import {Values} from '@formulier/core'
import {renderHook} from '@testing-library/react'
import {useForm} from '../src/use-form'

const INITIAL_VALUES = {a: {b: {c: 'c', d: 'd'}}}
const FORM = renderHook(() => useForm({initialValues: INITIAL_VALUES})).result.current
const INITIAL_PROPS = {
	name: 'a.b.c',
	validate: value => (value !== 'c' ? 'Value should be "c"' : null),
} as FieldOptions<Values, string>

const {result, rerender} = renderHook((options: FieldOptions<Values, string>) => useFormField(FORM, options), {
	initialProps: INITIAL_PROPS,
})

it('renders hook', () => {
	expect(result.current[0].id).toBe('a.b.c')
	expect(result.current[0].value).toBe('c')
	expect(result.current[1].error).toBe(null)
	expect(result.current[1].touched).toBe(false)
})

it('runs onChange correctly', () => {
	result.current[0].onChange('d')
	rerender(INITIAL_PROPS)
	expect(result.current[0].value).toBe('d')
	expect(result.current[1].error).toBe(null)
	expect(result.current[1].touched).toBe(false)
})

it('runs onBlur correctly', () => {
	result.current[0].onBlur()
	rerender(INITIAL_PROPS)
	expect(result.current[1].error).toBe('Value should be "c"')
	expect(result.current[1].touched).toBe(true)
})

it('runs validation during onChange if touched', () => {
	result.current[0].onChange('c')
	rerender(INITIAL_PROPS)
	expect(result.current[1].error).toBe(null)
})

it('can change field name', () => {
	rerender({name: 'a.b.d'})
	expect(result.current[0].id).toBe('a.b.d')
	expect(result.current[0].value).toBe('d')
	expect(result.current[1].error).toBe(null)
})
