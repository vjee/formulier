import {FieldValidator, Formulier, GetFieldType, Primitives, Values} from '@formulier/core'
import {FormFieldValueOptions, useFormFieldValue} from './use-form-field-value'
import {ShallowRef, WritableComputedRef, computed, onBeforeUnmount} from 'vue'
import {useFormSelector} from './use-form-selector'

export interface FieldOptions<V extends Values, F extends string> {
	name: F
	validate?: FieldValidator
	valueOptions?: FormFieldValueOptions<V, F>
}

export type UseFormFieldResult<V extends Values, F extends string> = [FieldInputProps<V, F>, FieldMeta]

export interface FieldInputProps<V extends Values, F extends string> {
	id: string
	value: WritableComputedRef<GetFieldType<V, F> | null | undefined>
	onChange: (value: any) => void
	onBlur: () => void
}

export interface FieldMeta {
	error: ShallowRef<string | null>
	touched: ShallowRef<boolean>
}

export function useFormField<V extends Values, P extends Primitives, F extends string>(
	form: Formulier<V, P>,
	options: FieldOptions<V, F>,
): UseFormFieldResult<V, F> {
	const {name, validate, valueOptions} = options
	const id = name

	const fieldValue = useFormFieldValue(form, name, valueOptions)
	const error = useFormSelector(form, state => state.errors[name] || null)
	const touched = useFormSelector(form, state => state.touched[name] ?? false)
	const hasSubmitted = useFormSelector(form, state => state.submitCount > 0)

	form.registerField(name, validate)

	onBeforeUnmount(() => form.unregisterField(name))

	const onChange = (value: any) => {
		form.setFieldValue(name, value)
		if (touched || hasSubmitted.value) form.validateField(name)
	}

	const onBlur = () => {
		form.validateField(name)
		form.touchField(name)
	}

	const value = computed({
		get: () => fieldValue.value,
		set: onChange,
	})

	const field: FieldInputProps<V, F> = {id, value, onChange, onBlur}
	const meta: FieldMeta = {error, touched}

	return [field, meta]
}
