import * as React from 'react'
import { Formulier, Nullable, Primitives, Values } from '@formulier/core'

export function useForm<V extends Values, P extends Primitives = Primitives>(
	initialValues: Nullable<V, P>,
): Formulier<V, P> {
	const [form] = React.useState(() => new Formulier(initialValues))
	return form
}
