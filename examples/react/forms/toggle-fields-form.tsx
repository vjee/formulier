import { Form, useForm } from '@formulier/react'
import * as React from 'react'
import * as Field from '../field'

interface FormState {
	fieldA: string
	fieldB: string
}

export function ToggleFieldsForm() {
	const form = useForm<FormState>({
		fieldA: 'Value A',
		fieldB: 'Value B',
	})

	const [renderFieldA, setRenderFieldA] = React.useState(true)

	const toggleField = () => {
		setRenderFieldA(current => !current)
	}

	return (
		<div>
			<h1>ToggleFieldsForm</h1>

			<Form form={form} onSubmit={values => alert(JSON.stringify(values, null, 2))}>
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
			</Form>
		</div>
	)
}
