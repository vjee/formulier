import { Form, useForm } from '@formulier/react'
import { useState } from 'react'
import * as Field from '../Field'

interface FormState {
	firstName: string
	lastName: string
	age: number
}

export function PersonForm() {
	const form = useForm<FormState>({
		firstName: 'John',
		lastName: null,
		age: 20,
	})
	const [showLastName, setShowLastName] = useState(true)

	return (
		<div>
			<h1>PersonForm</h1>

			<Form form={form} onSubmit={values => alert(JSON.stringify(values, null, 2))}>
				<div className="column">
					<Field.TextField name="firstName" label="First name" />
					{showLastName ? <Field.TextField name="lastName" label="Last name" /> : null}
					<Field.IntegerField name="age" label="Age" />

					<button type="button" onClick={() => setShowLastName(show => !show)}>
						Toggle lastName
					</button>

					<button type="submit">Submit</button>
				</div>
			</Form>
		</div>
	)
}