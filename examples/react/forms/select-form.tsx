import { Form, useForm } from '@formulier/react'
import * as Field from '../field'

interface FormState {
	color: string
}

export function SelectForm() {
	const form = useForm<FormState>({
		color: '',
	})

	return (
		<div>
			<h1>SelectForm</h1>

			<Form form={form} onSubmit={values => alert(JSON.stringify(values, null, 2))}>
				<div className="column">
					<Field.SelectField name="color" label="Color">
						<option value="">Select a color</option>
						<option value="cyan">Cyan</option>
						<option value="magenta">Magenta</option>
						<option value="yellow">Yellow</option>
					</Field.SelectField>

					<button type="submit">Submit</button>
				</div>
			</Form>
		</div>
	)
}
