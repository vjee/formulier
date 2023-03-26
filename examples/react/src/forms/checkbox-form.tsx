import {FormProvider, useCreateForm, useSubmitHandler} from '@formulier/react'
import * as Field from '../fields'

interface FormState {
	optionsAsObject: {a: Boolean; b: Boolean; c: boolean}
	optionsAsArray: [a: boolean, c: boolean, d: boolean]
}

export function CheckboxForm() {
	const form = useCreateForm<FormState>({
		initialValues: {
			optionsAsObject: {a: false, b: true, c: true},
			optionsAsArray: [true, false, false],
		},
	})

	const onSubmit = useSubmitHandler(form, values => {
		alert(JSON.stringify(values, null, 2))
	})

	return (
		<div>
			<h1>CheckboxForm</h1>

			<form onSubmit={onSubmit}>
				<FormProvider form={form}>
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
				</FormProvider>
			</form>
		</div>
	)
}
