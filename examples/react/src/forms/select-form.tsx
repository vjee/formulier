import {FormProvider, useCreateForm, useSubmitHandler} from '@formulier/react'
import * as Field from '../fields'

interface FormState {
	color: string
}

export function SelectForm() {
	const form = useCreateForm<FormState>({
		initialValues: {
			color: '',
		},
	})

	const onSubmit = useSubmitHandler(form, values => {
		alert(JSON.stringify(values, null, 2))
	})

	return (
		<div>
			<h1>SelectForm</h1>

			<form onSubmit={onSubmit}>
				<FormProvider form={form}>
					<div className="column">
						<Field.SelectField name="color" label="Color">
							<option value="">Select a color</option>
							<option value="cyan">Cyan</option>
							<option value="magenta">Magenta</option>
							<option value="yellow">Yellow</option>
						</Field.SelectField>

						<button type="submit">Submit</button>
					</div>
				</FormProvider>
			</form>
		</div>
	)
}
