import * as React from 'react'
import {useSyncExternalStoreWithSelector} from 'use-sync-external-store/with-selector.js'

import {Formulier} from '@formulier/core'
import {invariant, useEvent} from './utils.js'

import type {FormulierOptions, Primitives, Values} from '@formulier/core'
import type {FormContext, FormProviderProps, Selector} from './types.js'

const formContext = React.createContext<FormContext<Values, Primitives> | undefined>(undefined)

function FormProvider<V extends Values, P extends Primitives = Primitives>({form, children}: FormProviderProps<V, P>) {
	return <formContext.Provider value={{form: form as Formulier<Values>}}>{children}</formContext.Provider>
}

function useFormInstance<V extends Values, P extends Primitives = Primitives>() {
	const value = React.useContext(formContext) as FormContext<V, P> | undefined
	invariant(value, `useFormInstance must be used inside of FormProvider`)
	return value.form
}

function useOptionalFormInstance<V extends Values, P extends Primitives = Primitives>() {
	const value = React.useContext(formContext) as FormContext<V, P> | undefined
	return value?.form || null
}

function useCreateForm<V extends Values, P extends Primitives = Primitives>(
	options: FormulierOptions<V, P>,
): Formulier<V, P> {
	const [form] = React.useState(() => new Formulier(options))
	return form
}

function useFormSelector<V extends Values, P extends Primitives, Result>(
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

function useSubmitHandler<V extends Values, P extends Primitives>(
	form: Formulier<V, P>,
	onSubmit: (values: V) => void,
) {
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
