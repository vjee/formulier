import {FormProvider, useCreateForm, useSubmitHandler} from '@formulier/react'
import * as Field from '../fields'

interface FormState {
	firstName: string
	age: number
}

export function WithFormFieldNameHelperForm() {
	const form = useCreateForm<FormState>({
		initialValues: {
			firstName: 'John',
			age: 20,
		},
	})

	const onSubmit = useSubmitHandler(form, values => {
		alert(JSON.stringify(values, null, 2))
	})

	return (
		<div>
			<h1>WithFormFieldNameHelperForm</h1>

			<form onSubmit={onSubmit}>
				<FormProvider form={form}>
					<div className="column">
						<Field.TextField name={form.field('firstName')} label="First name" />
						<Field.IntegerField name={form.field('age')} label="Age" />

						<button type="submit">Submit</button>
					</div>
				</FormProvider>
			</form>
		</div>
	)
}
