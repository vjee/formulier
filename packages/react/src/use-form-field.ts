import { FieldValidator, GetFieldType, Primitives, Values } from '@formulier/core'
import { RefCallback, useCallback, useEffect } from 'react'
import { ReactFormulier } from './use-form'
import { useEvent } from './use-event'
import { useFormFieldValue } from './use-form-field-value'
import { useFormSelector } from './use-form-selector'

export interface FieldInputProps<V extends Values, F extends string> {
	ref: RefCallback<Element>
	id: string
	value: GetFieldType<V, F> | null | undefined
	onChange: (event: { target: { value: any } }) => void
	onBlur: () => void
}

export interface FieldMeta {
	error: string | null
	touched: boolean
}

export function useFormField<V extends Values, P extends Primitives, F extends string>(
	form: ReactFormulier<V, P>,
	{ name, validate }: { name: F; validate?: FieldValidator },
): [FieldInputProps<V, F>, FieldMeta] {
	const id = name

	const value = useFormFieldValue(form, name)
	const error = useFormSelector(form, state => state.errors[name]) || null
	const touched = useFormSelector(form, state => state.touched[name]) ?? false
	const hasSubmitted = useFormSelector(form, state => state.submitCount > 0)

	const ref: RefCallback<Element> = useCallback(
		element => {
			form.withoutNotify(() => {
				element ? form.registerElement(name, element) : form.unregisterElement(name)
			})
		},
		[form, name],
	)

	useEffect(() => {
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
