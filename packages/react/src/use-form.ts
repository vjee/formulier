import * as React from 'react'
import { Nullable, Primitives, Values, stateUtils } from '@formulier/core'
import { ReactFormulier } from './store'
import { useFormSelector } from './use-form-selector'

export function useForm<V extends Values, P extends Primitives = Primitives>(
	initialValues: Nullable<V, P>,
): ReactFormulier<V, P> {
	const [form] = React.useState(() => new ReactFormulier(initialValues))

	const unregisterList = useFormSelector(form, state => state.unregisterList, stateUtils.isEqual)

	React.useEffect(() => {
		if (unregisterList.length) {
			unregisterList.forEach(fieldName => {
				const element = form.getState().fieldElements[fieldName]
				const isMounted = !!element && element.isConnected

				if (!isMounted) {
					form.withoutNotify(() => form.unregisterField(fieldName))
				}
			})

			form.clearUnregisterList()
		}
	}, [form, unregisterList])

	return form
}
