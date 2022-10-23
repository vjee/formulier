import * as React from 'react'
import { Primitives, Values } from '@formulier/core'
import { ReactFormulier } from './store'
import { createError } from './error'

interface FormContextT<V extends Values, P extends Primitives> {
	store: ReactFormulier<V, P>
}

const FormContext = React.createContext<FormContextT<Values, Primitives> | undefined>(undefined)

interface FormProviderProps<V extends Values, P extends Primitives> {
	form: ReactFormulier<V, P>
	children: React.ReactNode
}

export function FormProvider<V extends Values, P extends Primitives>({ form, children }: FormProviderProps<V, P>) {
	return <FormContext.Provider value={{ store: form as ReactFormulier<Values> }}>{children}</FormContext.Provider>
}

export function useFormContext<V extends Values, P extends Primitives>() {
	const value = React.useContext(FormContext) as FormContextT<V, P> | undefined
	if (!value) {
		throw createError('useFormContext()', 'Cannot use `useFormContext` outside of `Form` or `FormProvider` component.')
	}
	return value.store
}
