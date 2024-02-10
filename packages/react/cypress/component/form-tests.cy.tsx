import * as React from 'react'

import {FormProvider, useCreateForm, useFormField, useFormInstance} from '../../src'

function Form({children}: {children: React.ReactNode}) {
	const form = useCreateForm({
		initialValues: {field: 'value'},
	})

	return <FormProvider form={form}>{children}</FormProvider>
}

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

describe('Form Tests', () => {
	const inputSelector = '[data-testid="input"]'
	const errorSelector = '[data-testid="error"]'

	it('renders a basic field', () => {
		cy.mount(
			<Form>
				<Field name="field" />
			</Form>,
		)
		cy.get(inputSelector).should('have.value', 'value')
	})

	it('updates the value of the field', () => {
		cy.mount(
			<Form>
				<Field name="field" />
			</Form>,
		)
		cy.get(inputSelector).type('{backspace}{backspace}encia')
		cy.get(inputSelector).should('have.value', 'valencia')
	})

	it('should not run validation initially', () => {
		cy.mount(
			<Form>
				<Field name="field" validate={value => (value !== 'valencia' ? 'Value should be "valencia"' : null)} />
			</Form>,
		)
		cy.get(inputSelector).type('{backspace}{backspace}')
		cy.get(errorSelector).should('not.exist')
	})

	it('should run validation after blur', () => {
		cy.mount(
			<Form>
				<Field name="field" validate={value => (value !== 'valencia' ? 'Value should be "valencia"' : null)} />
			</Form>,
		)
		cy.get(inputSelector).type('{backspace}{backspace}')
		cy.get(inputSelector).blur()
		cy.get(errorSelector).should('have.text', 'Value should be "valencia"')
	})

	it('should run validation continually once blurred', () => {
		cy.mount(
			<Form>
				<Field name="field" validate={value => (value !== 'valencia' ? 'Value should be "valencia"' : null)} />
			</Form>,
		)
		cy.get(inputSelector).focus()
		cy.get(inputSelector).blur()
		cy.get(inputSelector).type('{backspace}{backspace}')
		cy.get(errorSelector).should('have.text', 'Value should be "valencia"')
		cy.get(inputSelector).type('en')
		cy.get(errorSelector).should('have.text', 'Value should be "valencia"')
		cy.get(inputSelector).type('cia')
		cy.get(errorSelector).should('not.exist')
	})

	it('should clear value after unmount', () => {
		function Test() {
			const [show, setShow] = React.useState(true)

			return (
				<Form>
					{show && (
						<Field name="field" validate={value => (value !== 'valencia' ? 'Value should be "valencia"' : null)} />
					)}
					<button data-testid="toggle" type="button" onClick={() => setShow(show => !show)}>
						Toggle field
					</button>
				</Form>
			)
		}

		cy.mount(<Test />)
		cy.get(inputSelector).should('have.value', 'value')
		cy.get('[data-testid="toggle"]').click()
		cy.get(inputSelector).should('not.exist')
		cy.get('[data-testid="toggle"]').click()
		cy.get(inputSelector).should('exist')
		cy.get(inputSelector).should('have.value', '')
	})
})
