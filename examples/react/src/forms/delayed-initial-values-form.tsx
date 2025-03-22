import * as React from 'react'
import {FormProvider, useCreateForm, useSubmitHandler} from '@formulier/react'
import * as Field from '../fields'

interface FormState {
	firstName: string
	lastName: string
}

export function DelayedInitialValuesForm() {
	const [data, setData] = React.useState<FormState | null>(null)
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setData({firstName: 'John', lastName: 'Doe'})
			setLoading(false)
		}, 400)

		return () => clearTimeout(timeout)
	}, [setData])

	const form = useCreateForm<FormState>({
		initialValues: {
			firstName: data?.firstName || '',
			lastName: data?.lastName || '',
		},
	})

	const onSubmit = useSubmitHandler(form, values => {
		alert(JSON.stringify(values, null, 2))
	})

	return (
		<div>
			<h1>DelayedInitialValuesForm</h1>

			<span>Data:</span>
			<pre>{JSON.stringify(data, null, 4)}</pre>

			{!loading ? (
				<form onSubmit={onSubmit}>
					<FormProvider form={form}>
						<Field.TextField name="firstName" label="First name" />
						<Field.TextField name="lastName" label="Last name" />

						<button type="submit">Submit</button>
					</FormProvider>
				</form>
			) : (
				'Loading...'
			)}
		</div>
	)
}
