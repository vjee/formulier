import {Form, useCreateForm} from '@formulier/react'
import * as React from 'react'
import * as Field from '../fields'

interface FormState {
	field: string | number
}

export function SwitchFieldTypeForm() {
	const form = useCreateForm<FormState>({
		initialValues: {
			field: 7,
		},
	})

	const [type, setType] = React.useState<'text' | 'integer' | null>('integer')

	const toggleType = () => {
		form.setFieldValue('field', null)
		setType(type => (type === 'text' ? 'integer' : 'text'))
	}

	const hide = () => {
		setType(type => (type !== null ? null : 'integer'))
	}

	return (
		<div>
			<h1>SwitchFieldTypeForm</h1>

			<Form form={form} onSubmit={values => alert(JSON.stringify(values, null, 2))}>
				<div className="column">
					{type === 'text' && <Field.TextField name="field" label="Text field" />}
					{type === 'integer' && <Field.IntegerField name="field" label="Integer field" />}

					<button type="button" onClick={hide}>
						{type === null ? 'Show' : 'Hide'}
					</button>

					<button type="button" onClick={toggleType}>
						Toggle type
					</button>

					<button type="submit">Submit</button>
				</div>
			</Form>
		</div>
	)
}
