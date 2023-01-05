import * as React from 'react'
import {FieldValidator, Formulier, GetFieldType, Primitives, Values, stateUtils} from '@formulier/core'
import {FormFieldValueOptions, useFormFieldValue} from './use-form-field-value'
import {useEvent} from './use-event'
import {useFormSelector} from './use-form-selector'

export interface FieldOptions<V extends Values, F extends string> {
	name: F
	validate?: FieldValidator
	valueOptions?: FormFieldValueOptions<V, F>
}

export type UseFormFieldResult<V extends Values, F extends string> = [FieldInputProps<V, F>, FieldMeta]

export interface FieldInputProps<V extends Values, F extends string> {
	id: string
	value: GetFieldType<V, F> | null | undefined
	onChange: (value: GetFieldType<V, F> | null | undefined) => void
	onBlur: () => void
}

export interface FieldMeta {
	error: string | null
	touched: boolean
}

type StateBeforeCleanup = {name: string; value: any} | undefined

export function useFormField<V extends Values, P extends Primitives, F extends string>(
	form: Formulier<V, P>,
	options: FieldOptions<V, F>,
): UseFormFieldResult<V, F> {
	const {name, validate, valueOptions} = options
	const id = name

	const value = useFormFieldValue(form, name, valueOptions)
	const error = useFormSelector(form, state => state.errors[name]) || null
	const touched = useFormSelector(form, state => state.touched[name]) ?? false
	const hasSubmitted = useFormSelector(form, state => state.submitCount > 0)

	const stateBeforeCleanupRef = React.useRef<StateBeforeCleanup>(undefined)

	React.useEffect(() => {
		form.registerField(name, validate)

		const state = stateBeforeCleanupRef.current
		if (state !== undefined && state.value !== undefined && state.name === name) {
			form.setFieldValue(state.name, state.value)
		}

		return () => {
			const value = stateUtils.getPath(form.getState().values, name)
			stateBeforeCleanupRef.current = {name, value}
			form.unregisterField(name)
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

	const field: FieldInputProps<V, F> = {id, value, onChange, onBlur}
	const meta: FieldMeta = {error, touched}

	return [field, meta]
}
