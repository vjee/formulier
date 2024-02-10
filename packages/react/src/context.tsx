import * as React from 'react'
import {Formulier, Primitives, Values} from '@formulier/core'
import {createError} from './error'

interface FormContextT<V extends Values, P extends Primitives> {
	form: Formulier<V, P>
}

const FormContext = React.createContext<FormContextT<Values, Primitives> | undefined>(undefined)

interface FormProviderProps<V extends Values, P extends Primitives> {
	form: Formulier<V, P>
	children: React.ReactNode
}

export function FormProvider<V extends Values, P extends Primitives = Primitives>({
	form,
	children,
}: FormProviderProps<V, P>) {
	return <FormContext.Provider value={{form: form as Formulier<Values>}}>{children}</FormContext.Provider>
}

export function useFormInstance<V extends Values, P extends Primitives = Primitives>() {
	const value = React.useContext(FormContext) as FormContextT<V, P> | undefined
	if (!value) {
		throw createError(
			'useFormInstance()',
			'Cannot use `useFormInstance` outside of `Form` or `FormProvider` component.',
		)
	}
	return value.form
}

export function useOptionalFormInstance<V extends Values, P extends Primitives = Primitives>() {
	const value = React.useContext(FormContext) as FormContextT<V, P> | undefined
	return value?.form
}
