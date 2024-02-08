import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {FieldValidator, Formulier, GetFieldType, Primitives, Values} from '@formulier/core'
import {FormFieldValueOptions, useFormFieldValue} from './use-form-field-value'
import {useEvent} from './use-event'
import {useFormSelector} from './use-form-selector'

export interface FieldOptions<V extends Values, F extends string> {
	name: F
	validate?: FieldValidator
	valueOptions?: FormFieldValueOptions<V, F>
	flushSyncOnChange?: boolean
	flushSyncOnBlur?: boolean
}

export type UseFormFieldResult<V extends Values, F extends string> = [FieldInputProps<V, F>, FieldMeta]

export interface FieldInputProps<V extends Values, F extends string> {
	id: string
	name: string
	value: GetFieldType<V, F> | null | undefined
	onChange: (value: GetFieldType<V, F> | null | undefined) => void
	onBlur: () => void
}

export interface FieldMeta {
	error: string | null
	touched: boolean
}

const callCallback = (cb: CallableFunction) => void cb()

export function useFormField<V extends Values, P extends Primitives, F extends string>(
	form: Formulier<V, P>,
	options: FieldOptions<V, F>,
): UseFormFieldResult<V, F> {
	const id = React.useId()
	const rerender = React.useReducer(x => x + 1, 0)[1]
	const {name, validate, valueOptions, flushSyncOnChange = false, flushSyncOnBlur = false} = options

	const value = useFormFieldValue(form, name, valueOptions)
	const error = useFormSelector(form, state => state.errors[name]) || null
	const touched = useFormSelector(form, state => state.touched[name]) ?? false
	const hasSubmitted = useFormSelector(form, state => state.submitCount > 0)

	React.useEffect(() => {
		const unregisterField = form.registerField(name, validate)
		const removeInstance = form.addInstance(name, id)

		return () => {
			removeInstance()
			queueMicrotask(() => {
				ReactDOM.flushSync(rerender)
				if (!form.hasInstance(name)) unregisterField()
			})
		}
	}, [form, name, id, validate, rerender])

	const onChange = useEvent((value: any) => {
		const maybeFlushSync = flushSyncOnChange ? ReactDOM.flushSync : callCallback
		maybeFlushSync(() => {
			form.setFieldValue(name, value)
			if (touched || hasSubmitted) form.validateField(name)
		})
	})

	const onBlur = useEvent(() => {
		const maybeFlushSync = flushSyncOnBlur ? ReactDOM.flushSync : callCallback
		maybeFlushSync(() => {
			form.validateField(name)
			form.touchField(name)
		})
	})

	const field: FieldInputProps<V, F> = {id, name, value, onChange, onBlur}
	const meta: FieldMeta = {error, touched}

	return [field, meta]
}
