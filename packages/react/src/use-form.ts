import * as React from 'react'
import { Nullable, Primitives, Values, stateUtils } from '@formulier/core'
import { ReactFormulier } from './form'
import { useFormSelector } from './use-form-selector'

export function useForm<V extends Values, P extends Primitives = Primitives>(
	initialValues: Nullable<V, P>,
): ReactFormulier<V, P> {
	const [form] = React.useState(() => new ReactFormulier(initialValues))

	const unregisterQueue = useFormSelector(form, state => state.unregisterQueue, stateUtils.isEqual)

	React.useEffect(() => {
		if (unregisterQueue.length) {
			unregisterQueue.forEach(fieldName => {
				const element = form.getState().fieldElementRegistry[fieldName]
				const isMounted = !!element && element.isConnected

				if (!isMounted) {
					form.withoutNotify(() => form.unregisterField(fieldName))
				}
			})

			form.clearUnregisterQueue()
		}
	}, [form, unregisterQueue])

	return form
}
