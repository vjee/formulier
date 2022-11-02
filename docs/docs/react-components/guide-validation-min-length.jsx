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
			<InputField name="firstName" label="First name" minLength={2} />
			<InputField name="lastName" label="Last name" minLength={2} />
			<InputField name="email" label="Email" type="email" />

			<button type="submit">Submit</button>
		</Form>
	)
}

function InputField({ name, label, type = 'text', minLength }) {
	const form = useFormContext()

	const validate = React.useCallback(
		value => {
			if (minLength !== undefined) {
				if (typeof value === 'string' && value.length < minLength) {
					return `Value should be at least ${minLength} characters long!`
				}
			}
			return null
		},
		[minLength],
	)

	const [field, meta] = useFormField(form, { name, validate })

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
			{meta.error && <span className="error">{meta.error}</span>}
		</div>
	)
}
