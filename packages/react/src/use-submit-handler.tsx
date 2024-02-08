import {Formulier, Primitives, Values} from '@formulier/core'
import {useEvent} from './use-event'

export function useSubmitHandler<V extends Values, P extends Primitives>(
	form: Formulier<V, P>,
	onSubmit: (values: V) => void,
) {
	return useEvent((event: {preventDefault?: () => void}) => {
		event.preventDefault?.()

		const valid = form.validateFields()
		if (valid) {
			onSubmit(form.store.getState().values as V)
		}

		form.incrementSubmitCount()
	})
}
