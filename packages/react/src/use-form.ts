import * as React from 'react'
import {Formulier, FormulierOptions, Primitives, Values} from '@formulier/core'

export function useForm<V extends Values, P extends Primitives = Primitives>(
	options: FormulierOptions<V, P>,
): Formulier<V, P> {
	const [form] = React.useState(() => new Formulier(options))
	return form
}
