import * as React from 'react'
import {describe, expect, it} from 'vitest'
import {render} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'

import {FormProvider, useCreateForm, useFormInstance} from '../src/form.js'
import {useFormField} from '../src/field.js'

const user = userEvent.setup()

function Field({name, validate}: {name: string; validate?: (value: unknown) => string | null}) {
	const form = useFormInstance()
	const [field, meta] = useFormField(form, {name, validate})
	return (
		<>
			<input
				data-testid="input"
				{...field}
				value={field.value || ''}
				onChange={event => field.onChange(event.target.value)}
			/>
			{meta.error ? <span data-testid="error">{meta.error}</span> : null}
		</>
	)
}

describe('Form', () => {
	it('renders a basic field', () => {
		const Test = () => {
			const form = useCreateForm({initialValues: {field: 'value'}})
			return (
				<FormProvider form={form}>
					<Field name="field" />
				</FormProvider>
			)
		}
		const {getByTestId} = render(<Test />)
		expect(getByTestId('input')).toHaveValue('value')
	})

	it('updates the initial values as long as no fields are rendered', async () => {
		const Test = () => {
			const [show, setShow] = React.useState(false)
			const [initialValues, setInitialValues] = React.useState({field: 'foo'})
			const form = useCreateForm({initialValues})
			return (
				<FormProvider form={form}>
					<button type="button" data-testid="show" onClick={() => setShow(true)} />
					<button type="button" data-testid="bar" onClick={() => setInitialValues({field: 'bar'})} />
					<button type="button" data-testid="baz" onClick={() => setInitialValues({field: 'baz'})} />
					{show && <Field name="field" />}
				</FormProvider>
			)
		}
		const {getByTestId} = render(<Test />)
		await user.click(getByTestId('bar'))
		await user.click(getByTestId('show'))
		expect(getByTestId('input')).toHaveValue('bar')
		await user.click(getByTestId('baz'))
		expect(getByTestId('input')).toHaveValue('bar')
	})

	it('updates the value of the field', async () => {
		const Test = () => {
			const form = useCreateForm({initialValues: {field: 'value'}})
			return (
				<FormProvider form={form}>
					<Field name="field" />
				</FormProvider>
			)
		}
		const {getByTestId} = render(<Test />)
		await user.type(getByTestId('input'), '{backspace}{backspace}encia')
		expect(getByTestId('input')).toHaveValue('valencia')
	})

	it('should not run validation initially', async () => {
		const Test = () => {
			const form = useCreateForm({initialValues: {field: 'value'}})
			return (
				<FormProvider form={form}>
					<Field name="field" validate={value => (value !== 'valencia' ? 'Value should be "valencia"' : null)} />
				</FormProvider>
			)
		}
		const {getByTestId, queryByTestId} = render(<Test />)
		await user.type(getByTestId('input'), '{backspace}{backspace}encia')
		expect(queryByTestId('error')).not.toBeInTheDocument()
	})

	it('should run validation after blur', async () => {
		const Test = () => {
			const form = useCreateForm({initialValues: {field: 'value'}})
			return (
				<FormProvider form={form}>
					<Field name="field" validate={value => (value !== 'valencia' ? 'Value should be "valencia"' : null)} />
				</FormProvider>
			)
		}
		const {getByTestId} = render(<Test />)
		await user.type(getByTestId('input'), '{backspace}{backspace}{tab}')
		expect(getByTestId('error')).toHaveTextContent('Value should be "valencia"')
	})

	it('should run validation continually once blurred', async () => {
		const Test = () => {
			const form = useCreateForm({initialValues: {field: 'value'}})
			return (
				<FormProvider form={form}>
					<Field name="field" validate={value => (value !== 'valencia' ? 'Value should be "valencia"' : null)} />
				</FormProvider>
			)
		}
		const {getByTestId, queryByTestId} = render(<Test />)
		await user.click(getByTestId('input'))
		await user.type(getByTestId('input'), '{tab}{shift>}{tab}{/shift}')
		await user.type(getByTestId('input'), '{backspace}{backspace}')
		expect(getByTestId('error')).toHaveTextContent('Value should be "valencia"')
		await user.type(getByTestId('input'), 'en')
		expect(getByTestId('error')).toHaveTextContent('Value should be "valencia"')
		await user.type(getByTestId('input'), 'cia')
		expect(queryByTestId('error')).not.toBeInTheDocument()
	})

	it('should clear value after unmount', async () => {
		function Test() {
			const form = useCreateForm({initialValues: {field: 'value'}})
			const [show, setShow] = React.useState(true)
			return (
				<FormProvider form={form}>
					{show && (
						<Field name="field" validate={value => (value !== 'valencia' ? 'Value should be "valencia"' : null)} />
					)}
					<button data-testid="toggle" type="button" onClick={() => setShow(show => !show)}>
						Toggle field
					</button>
				</FormProvider>
			)
		}
		const {getByTestId, queryByTestId} = render(<Test />)
		expect(getByTestId('input')).toHaveValue('value')
		await user.click(getByTestId('toggle'))
		expect(queryByTestId('input')).not.toBeInTheDocument()
		await user.click(getByTestId('toggle'))
		expect(queryByTestId('input')).toBeInTheDocument()
		expect(getByTestId('input')).toHaveValue('')
	})
})
