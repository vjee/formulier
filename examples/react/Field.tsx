import { useFormContext, useFormField } from '@formulier/react'
import { ReactNode } from 'react'

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

export function Field({
	name,
	label,
	error,
	children,
}: {
	name: string
	label: string
	error: string | null
	children: ReactNode
}) {
	return (
		<div className="field">
			<label className="field-label" htmlFor={name}>
				{label}
			</label>
			<div className="field-input">{children}</div>
			{error ? <span className="field-error">{error}</span> : null}
		</div>
	)
}
