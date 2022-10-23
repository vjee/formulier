import * as React from 'react'
import { FieldValidator, GetFieldType, Primitives, Values } from '@formulier/core'
import { ReactFormulier } from './store'
import { useEvent } from './use-event'
import { useFormFieldValue } from './use-form-field-value'
import { useFormSelector } from './use-form-selector'

export interface FieldInputProps<V extends Values, F extends string> {
	ref: React.RefCallback<Element>
	id: string
	value: GetFieldType<V, F> | null | undefined
	onChange: (event: { target: { value: any } }) => void
	onBlur: () => void
}

export interface FieldMeta {
	error: string | null
	touched: boolean
}

export interface FieldOptions<F extends string> {
	name: F
	validate?: FieldValidator
}

export function useFormField<V extends Values, P extends Primitives, F extends string>(
	form: ReactFormulier<V, P>,
	{ name, validate }: FieldOptions<F>,
): [FieldInputProps<V, F>, FieldMeta] {
	const id = name

	const value = useFormFieldValue(form, name)
	const error = useFormSelector(form, state => state.errors[name]) || null
	const touched = useFormSelector(form, state => state.touched[name]) ?? false
	const hasSubmitted = useFormSelector(form, state => state.submitCount > 0)

	const ref: React.RefCallback<Element> = React.useCallback(
		element => {
			form.withoutNotify(() => {
				element ? form.registerElement(name, element) : form.unregisterElement(name)
			})
		},
		[form, name],
	)

	React.useEffect(() => {
		form.registerField(name, validate)

		return () => {
			form.addToUnregisterList(name)
		}
	}, [form, name, validate])

	const onChange = useEvent((event: { target: { value: any } }) => {
		form.setFieldValue(name, event.target.value)
		if (touched || hasSubmitted) form.validateField(name)
	})

	const onBlur = useEvent(() => {
		form.validateField(name)
		form.touchField(name)
	})

	const field: FieldInputProps<V, F> = { ref, id, value, onChange, onBlur }
	const meta: FieldMeta = { error, touched }

	return [field, meta]
}

if (import.meta.vitest) {
	const { describe, it, expect } = import.meta.vitest

	;(async () => {
		const { useForm } = await import('.')
		const { renderHook } = await import('@testing-library/react')

		const INITIAL_VALUES = { a: { b: { c: 'c', d: 'd' } } }
		const FORM = renderHook(() => useForm(INITIAL_VALUES)).result.current
		const INITIAL_PROPS = {
			name: 'a.b.c',
			validate: value => (value !== 'c' ? 'Value should be "c"' : null),
		} as FieldOptions<string>

		describe('useFormField', () => {
			const { result, rerender } = renderHook((options: FieldOptions<string>) => useFormField(FORM, options), {
				initialProps: INITIAL_PROPS,
			})

			it('renders hook', () => {
				expect(result.current[0].id).toBe('a.b.c')
				expect(result.current[0].value).toBe('c')
				expect(result.current[1].error).toBe(null)
				expect(result.current[1].touched).toBe(false)
			})

			it('runs onChange correctly', () => {
				result.current[0].onChange({ target: { value: 'd' } })
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
				result.current[0].onChange({ target: { value: 'c' } })
				rerender(INITIAL_PROPS)
				expect(result.current[1].error).toBe(null)
			})

			it('can change field name', () => {
				rerender({ name: 'a.b.d' })
				expect(result.current[0].id).toBe('a.b.d')
				expect(result.current[0].value).toBe('d')
				expect(result.current[1].error).toBe(null)
			})
		})
	})()
}
