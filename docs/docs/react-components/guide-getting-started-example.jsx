import * as React from 'react'
import { Form, useForm, useFormField, useFormContext } from '@formulier/react'

export default function Example() {
	const form = useForm({ firstName: '', lastName: '', email: '' })

	return (
		<Form
			form={form}
			onSubmit={values => {
				alert(JSON.stringify(values, null, 2))
			}}
		>
			<InputField name="firstName" label="First name" />
			<InputField name="lastName" label="Last name" />
			<InputField name="email" label="Email" type="email" />

			<button type="submit">Submit</button>
		</Form>
	)
}

function InputField({ name, label, type = 'text' }) {
	const form = useFormContext()
	const [field] = useFormField(form, { name })

	return (
		<div className="field">
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<input
				className="input"
				type={type}
				{...field}
				value={field.value || ''}
				onChange={event => field.onChange(event.target.value)}
			/>
		</div>
	)
}
