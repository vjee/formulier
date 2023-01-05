import {useFormContext, useFormField} from '@formulier/react'
import * as React from 'react'

export function TextField({name, label}: {name: string; label: string}) {
	const form = useFormContext()
	const [field, meta] = useFormField(form, {name})

	const {id, value, onChange, onBlur} = field
	const {error} = meta

	return (
		<Field name={name} label={label} error={error}>
			<input type="text" id={id} value={value || ''} onChange={event => onChange(event.target.value)} onBlur={onBlur} />
		</Field>
	)
}

export function IntegerField({name, label}: {name: string; label: string}) {
	const form = useFormContext()
	const [field, meta] = useFormField(form, {name})

	const {id, value, onChange, onBlur} = field
	const {error} = meta

	return (
		<Field name={name} label={label} error={error}>
			<input
				type="number"
				step="1"
				id={id}
				value={value || ''}
				onChange={event => onChange(parseInt(event.target.value, 10))}
				onBlur={onBlur}
			/>
		</Field>
	)
}

export function SelectField({name, label, children}: {name: string; label: string; children: React.ReactNode}) {
	const form = useFormContext()
	const [field, meta] = useFormField(form, {name})

	const {id, value, onChange, onBlur} = field
	const {error} = meta

	return (
		<Field name={name} label={label} error={error}>
			<select id={id} value={value || ''} onChange={event => onChange(event.target.value)} onBlur={onBlur}>
				{children}
			</select>
		</Field>
	)
}

export function CheckboxField({name, label}: {name: string; label: string}) {
	const form = useFormContext()
	const [field, meta] = useFormField(form, {name})

	const {id, value, onChange, onBlur} = field
	const {error} = meta

	return (
		<Field name={name} label={label} error={error} displayHorizontal>
			<input
				type="checkbox"
				id={id}
				checked={value || false}
				onChange={event => onChange(event.target.checked)}
				onBlur={onBlur}
			/>
		</Field>
	)
}

export function Field({
	name,
	label,
	error,
	children,
	displayHorizontal = false,
}: {
	name: string
	label: string
	error: string | null
	children: React.ReactNode
	displayHorizontal?: boolean
}) {
	return (
		<div className={`field ${displayHorizontal ? 'horizontal' : ''}`}>
			<label className="field-label" htmlFor={name}>
				{label}
			</label>
			<div className="field-input">{children}</div>
			{error ? <span className="field-error">{error}</span> : null}
		</div>
	)
}
