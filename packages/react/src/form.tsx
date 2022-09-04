import { Nullable, Primitives, Values } from '@formulier/core'
import { ReactElement, Ref, RefAttributes, createContext, forwardRef, useContext } from 'react'
import { ReactFormulier } from './use-form'
import { createError } from './error'

interface FormContextT<V extends Values> {
	store: ReactFormulier<V>
}

const FormContext = createContext<FormContextT<Values> | undefined>(undefined)

interface FormulierProps<V extends Values, P extends Primitives>
	extends Omit<JSX.IntrinsicElements['form'], 'ref' | 'onSubmit'> {
	form: ReactFormulier<V, P>
	onSubmit: (values: Nullable<V, P>) => void
}

const Form = forwardRef(function Form<V extends Values, P extends Primitives>(
	props: FormulierProps<V, P>,
	forwardedRef: Ref<HTMLFormElement>,
) {
	const { form, onSubmit, ...formProps } = props

	return (
		<FormContext.Provider value={{ store: form as ReactFormulier<Values> }}>
			<form
				{...formProps}
				ref={forwardedRef}
				onSubmit={event => {
					event.preventDefault()

					const valid = form.validateFields()
					if (valid) {
						onSubmit(form.getState().values)
					}

					form.incrementSubmitCount()
				}}
			/>
		</FormContext.Provider>
	)
})

Form.displayName = 'Form'

const TypedForm = Form as <V extends Values, P extends Primitives>(
	props: FormulierProps<V, P> & RefAttributes<HTMLFormElement>,
) => ReactElement

export { TypedForm as Form }

export function useFormContext<V extends Values>() {
	const value = useContext(FormContext) as FormContextT<V> | undefined
	if (!value) {
		throw createError('<Forn />', 'Cannot use `useFormContext` outside of `Form` component.')
	}
	return value.store
}
