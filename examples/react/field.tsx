import { useFormContext, useFormField } from '@formulier/react'
import * as React from 'react'

export function TextField({ name, label }: { name: string; label: string }) {
	const form = useFormContext()
	const [field, meta] = useFormField(form, { name })

	return (
		<Field name={name} label={label} error={meta.error}>
			<input type="text" {...field} value={(field.value as any) || ''} />
		</Field>
	)
}

export function IntegerField({ name, label }: { name: string; label: string }) {
	const form = useFormContext()
	const [field, meta] = useFormField(form, { name })

	return (
		<Field name={name} label={label} error={meta.error}>
			<input type="number" step="1" {...field} value={(field.value as any) || ''} />
		</Field>
	)
}

export function SelectField({ name, label, children }: { name: string; label: string; children: React.ReactNode }) {
	const form = useFormContext()
	const [field, meta] = useFormField(form, { name })

	return (
		<Field name={name} label={label} error={meta.error}>
			<select {...field} value={(field.value as any) || ''}>
				{children}
			</select>
		</Field>
	)
}

export function CheckboxField({ name, label }: { name: string; label: string }) {
	const form = useFormContext()
	const [field, meta] = useFormField(form, { name })

	return (
		<Field name={name} label={label} error={meta.error} displayHorizontal>
			<input
				type="checkbox"
				{...field}
				value={undefined}
				checked={field.value || false}
				onChange={event => field.onChange({ target: { value: event.target.checked } })}
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
