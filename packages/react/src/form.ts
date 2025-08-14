import * as React from 'react'
import {useSyncExternalStoreWithSelector} from 'use-sync-external-store/with-selector'

import {Formulier} from '@formulier/core'
import {invariant, useEvent} from './utils.js'

import type {FormulierOptions, Primitives, Values} from '@formulier/core'
import type {FormContext, FormProviderProps, Selector} from './types.js'

const formContext = React.createContext<FormContext<Values, Primitives> | undefined>(undefined)

function FormProvider<V extends Values, P = Primitives>({form, children}: FormProviderProps<V, P>) {
	const value = React.useMemo(() => ({form: form as Formulier<Values>}), [form])
	return React.createElement(formContext.Provider, {value}, children)
}

function useFormInstance<V extends Values, P = Primitives>() {
	const value = React.useContext(formContext) as FormContext<V, P> | undefined
	invariant(value, `useFormInstance must be used inside of FormProvider`)
	return value.form
}

function useOptionalFormInstance<V extends Values, P = Primitives>() {
	const value = React.useContext(formContext) as FormContext<V, P> | undefined
	return value?.form || null
}

function useCreateForm<V extends Values, P = Primitives>(options: FormulierOptions<V, P>): Formulier<V, P> {
	const [form] = React.useState(() => new Formulier(options))
	if (!form.hasMounted) form.setValues(options.initialValues)

	return form
}

function useFormSelector<V extends Values, P, Result>(
	form: Formulier<V, P>,
	selector: Selector<V, P, Result>,
	equalityFn?: (a: Result, b: Result) => boolean,
) {
	return useSyncExternalStoreWithSelector(
		form.store.subscribe,
		form.store.getState,
		form.store.getState,
		selector,
		equalityFn,
	)
}

function useSubmitHandler<V extends Values, P>(form: Formulier<V, P>, onSubmit: (values: V) => void) {
	return useEvent((event: {preventDefault?: () => void}) => {
		event.preventDefault?.()

		const valid = form.validateFields()
		if (valid) {
			onSubmit(form.store.getState().values as V)
		}

		form.incrementSubmitCount()
	})
}

export {FormProvider, useFormInstance, useOptionalFormInstance, useCreateForm, useFormSelector, useSubmitHandler}
