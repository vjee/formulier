import { Form, useForm } from '@formulier/react'
import * as Field from '../field'

interface FormState {
	optionsAsObject: { a: Boolean; b: Boolean; c: boolean }
	optionsAsArray: [a: boolean, c: boolean, d: boolean]
}

export function CheckboxForm() {
	const form = useForm<FormState>({
		initialValues: {
			optionsAsObject: { a: false, b: true, c: true },
			optionsAsArray: [true, false, false],
		},
	})

	return (
		<div>
			<h1>CheckboxForm</h1>

			<Form form={form} onSubmit={values => alert(JSON.stringify(values, null, 2))}>
				<div className="column">
					<h2>Saved in object</h2>
					<Field.CheckboxField name="optionsAsObject.a" label="A" />
					<Field.CheckboxField name="optionsAsObject.b" label="B" />
					<Field.CheckboxField name="optionsAsObject.c" label="C" />

					<h2>Saved in array</h2>
					<Field.CheckboxField name="optionsAsArray[0]" label="A" />
					<Field.CheckboxField name="optionsAsArray[1]" label="B" />
					<Field.CheckboxField name="optionsAsArray[2]" label="C" />

					<button type="submit">Submit</button>
				</div>
			</Form>
		</div>
	)
}
