import {FormProvider, useCreateForm, useSubmitHandler} from '@formulier/react'
import * as React from 'react'
import * as Field from '../fields'

interface FormState {
	fieldA: string
	fieldB: string
}

export function ToggleFieldsForm() {
	const form = useCreateForm<FormState>({
		initialValues: {
			fieldA: 'Value A',
			fieldB: 'Value B',
		},
	})

	const onSubmit = useSubmitHandler(form, values => {
		alert(JSON.stringify(values, null, 2))
	})

	const [renderFieldA, setRenderFieldA] = React.useState(true)

	const toggleField = () => {
		setRenderFieldA(current => !current)
	}

	return (
		<div>
			<h1>ToggleFieldsForm</h1>

			<form onSubmit={onSubmit}>
				<FormProvider form={form}>
					<div className="column">
						{renderFieldA ? (
							<Field.TextField name="fieldA" label="Field A" />
						) : (
							<Field.TextField name="fieldB" label="Field B" />
						)}

						<button type="button" onClick={toggleField}>
							Toggle field
						</button>

						<button type="submit">Submit</button>
					</div>
				</FormProvider>
			</form>
		</div>
	)
}
