import * as React from 'react'
import { FieldValidator, GetFieldType, Primitives, Values } from '@formulier/core'
import { FormFieldValueOptions, useFormFieldValue } from './use-form-field-value'
import { ReactFormulier } from './form'
import { useEvent } from './use-event'
import { useFormSelector } from './use-form-selector'

export interface FieldInputProps<V extends Values, F extends string> {
	ref: React.RefCallback<Element>
	id: string
	value: GetFieldType<V, F> | null | undefined
	onChange: (value: GetFieldType<V, F> | null | undefined) => void
	onBlur: () => void
}

export interface FieldMeta {
	error: string | null
	touched: boolean
}

export interface FieldOptions<V extends Values, F extends string> {
	name: F
	validate?: FieldValidator
	valueOptions?: FormFieldValueOptions<V, F>
}

export function useFormField<V extends Values, P extends Primitives, F extends string>(
	form: ReactFormulier<V, P>,
	options: FieldOptions<V, F>,
): [FieldInputProps<V, F>, FieldMeta] {
	const { name, validate, valueOptions } = options
	const id = name

	const value = useFormFieldValue(form, name, valueOptions)
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

	const onChange = useEvent((value: any) => {
		form.setFieldValue(name, value)
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
