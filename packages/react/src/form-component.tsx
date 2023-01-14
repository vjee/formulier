import * as React from 'react'
import {Formulier, Primitives, Values} from '@formulier/core'
import {FormProvider} from './context'

interface FormProps<V extends Values, P extends Primitives>
	extends Omit<JSX.IntrinsicElements['form'], 'ref' | 'onSubmit'> {
	form: Formulier<V, P>
	onSubmit: (values: V) => void
}

const Form = React.forwardRef(function Form<V extends Values, P extends Primitives>(
	props: FormProps<V, P>,
	forwardedRef: React.Ref<HTMLFormElement>,
) {
	const {form, onSubmit, ...formProps} = props

	return (
		<FormProvider form={form}>
			<form
				{...formProps}
				ref={forwardedRef}
				onSubmit={event => {
					event.preventDefault()

					const valid = form.validateFields()
					if (valid) {
						onSubmit(form.getState().values as V)
					}

					form.incrementSubmitCount()
				}}
			/>
		</FormProvider>
	)
})

Form.displayName = 'Form'

const TypedForm = Form as <V extends Values, P extends Primitives>(
	props: FormProps<V, P> & React.RefAttributes<HTMLFormElement>,
) => React.ReactElement

export {TypedForm as Form}
