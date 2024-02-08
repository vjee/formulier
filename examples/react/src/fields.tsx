import {useFormInstance, useFormField} from '@formulier/react'
import * as React from 'react'

export function TextField({name, label, info = null}: {name: string; info?: string | null; label: string}) {
	const form = useFormInstance()
	const [field, meta] = useFormField(form, {name})

	const {id, value, onChange, onBlur} = field
	const {error} = meta

	return (
		<Field id={id} label={label} error={error} info={info}>
			<input
				type="text"
				id={id}
				name={name}
				value={value || ''}
				onChange={event => onChange(event.target.value)}
				onBlur={onBlur}
				aria-describedby={!error ? `${id}-info` : `${id}-info ${id}-error`}
				aria-invalid={!!error}
			/>
		</Field>
	)
}

export function IntegerField({name, label}: {name: string; label: string}) {
	const form = useFormInstance()
	const [field, meta] = useFormField(form, {name})

	const {id, value, onChange, onBlur} = field
	const {error} = meta

	return (
		<Field id={id} label={label} error={error}>
			<input
				type="number"
				step="1"
				id={id}
				name={name}
				value={value || ''}
				onChange={event => onChange(parseInt(event.target.value, 10))}
				onBlur={onBlur}
				aria-describedby={!error ? `${id}-info` : `${id}-info ${id}-error`}
				aria-invalid={!!error}
			/>
		</Field>
	)
}

export function SelectField({name, label, children}: {name: string; label: string; children: React.ReactNode}) {
	const form = useFormInstance()
	const [field, meta] = useFormField(form, {name})

	const {id, value, onChange, onBlur} = field
	const {error} = meta

	return (
		<Field id={id} label={label} error={error}>
			<select
				id={id}
				name={name}
				value={value || ''}
				onChange={event => onChange(event.target.value)}
				onBlur={onBlur}
				aria-describedby={!error ? `${id}-info` : `${id}-info ${id}-error`}
				aria-invalid={!!error}
			>
				{children}
			</select>
		</Field>
	)
}

export function CheckboxField({name, label}: {name: string; label: string}) {
	const form = useFormInstance()
	const [field, meta] = useFormField(form, {name})

	const {id, value, onChange, onBlur} = field
	const {error} = meta

	return (
		<Field id={id} label={label} error={error} displayHorizontal>
			<input
				type="checkbox"
				id={id}
				name={name}
				checked={value || false}
				onChange={event => onChange(event.target.checked)}
				onBlur={onBlur}
				aria-describedby={!error ? `${id}-info` : `${id}-info ${id}-error`}
				aria-invalid={!!error}
			/>
		</Field>
	)
}

export function Field({
	id,
	label,
	error,
	info,
	children,
	displayHorizontal = false,
}: {
	id: string
	label: string
	error: string | null
	info?: string | null
	children: React.ReactNode
	displayHorizontal?: boolean
}) {
	return (
		<div className={`field ${displayHorizontal ? 'horizontal' : ''}`}>
			<label htmlFor={id}>{label}</label>
			<br />
			{children}

			{error ? (
				<p id={`${id}-error`} role="alert">
					{error}
				</p>
			) : null}
			{info ? <p id={`${id}-info`}>{info}</p> : null}
		</div>
	)
}
