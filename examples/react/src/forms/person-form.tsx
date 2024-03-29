import {FormProvider, useCreateForm, useSubmitHandler} from '@formulier/react'
import * as React from 'react'
import * as Field from '../fields'

interface FormState {
	firstName: string
	lastName: string
	age: number
}

export function PersonForm() {
	const form = useCreateForm<FormState>({
		initialValues: {
			firstName: 'John',
			lastName: null,
			age: 20,
		},
	})

	const onSubmit = useSubmitHandler(form, values => {
		alert(JSON.stringify(values, null, 2))
	})

	const [showLastName, setShowLastName] = React.useState(true)

	return (
		<div>
			<h1>PersonForm</h1>

			<form onSubmit={onSubmit}>
				<FormProvider form={form}>
					<div className="column">
						<Field.TextField name="firstName" label="First name" />
						{showLastName ? <Field.TextField name="lastName" label="Last name" /> : null}
						<Field.IntegerField name="age" label="Age" />

						<button type="button" onClick={() => setShowLastName(show => !show)}>
							Toggle lastName
						</button>

						<button type="submit">Submit</button>
					</div>
				</FormProvider>
			</form>
		</div>
	)
}
