import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {arrayUtils, stateUtils} from '@formulier/core'
import {invariant, useEvent} from './utils'
import {useFormSelector} from './form'

import type {Formulier, Primitives, Values} from '@formulier/core'
import type {
	FieldArrayItem,
	FieldArrayMethods,
	FieldInputProps,
	FieldMeta,
	FieldOptions,
	FormFieldArrayOptions,
	FormFieldValueOptions,
	UseFormFieldArrayResult,
	UseFormFieldResult,
	UseFormFieldValueResult,
} from './types'

const callCallback = (cb: CallableFunction) => void cb()

function useFormField<V extends Values, P extends Primitives, F extends string>(
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

function useFormFieldArray<V extends Values, F extends string, P extends Primitives>(
	form: Formulier<V>,
	name: F,
	options?: FormFieldArrayOptions<V, F>,
): UseFormFieldArrayResult<FieldArrayItem<V, F>, P> {
	const {valueOptions} = options || {}
	const items = useFormFieldValue(form, name, valueOptions) as unknown[]
	invariant(Array.isArray(items), `Field "${name}" is not an array.`)

	const update = (value: unknown) => void form.setFieldValue(name, value)

	const arrayMethods: FieldArrayMethods<unknown> = {
		push: useEvent(item => update(arrayUtils.push(items, item))),
		insert: useEvent((item, index) => update(arrayUtils.insert(items, item, index))),
		remove: useEvent(index => update(arrayUtils.remove(items, index))),
		move: useEvent((fromIndex, toIndex) => update(arrayUtils.move(items, fromIndex, toIndex))),
		swap: useEvent((fromIndex, toIndex) => update(arrayUtils.swap(items, fromIndex, toIndex))),
	}

	return [items, arrayMethods] as any
}

function useFormFieldValue<V extends Values, P extends Primitives, F extends string>(
	form: Formulier<V, P>,
	name: F,
	options?: FormFieldValueOptions<V, F>,
): UseFormFieldValueResult<V, F> {
	const {fallback, equalityFn = stateUtils.isEqual} = options || {}
	return useFormSelector(form, state => stateUtils.getPath(state.values, name, fallback), equalityFn)
}

export {useFormField, useFormFieldArray, useFormFieldValue}
