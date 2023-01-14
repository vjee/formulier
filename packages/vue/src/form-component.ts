import {Formulier, Primitives, Values} from '@formulier/core'
import {PropType, defineComponent, h, inject, provide, withModifiers} from 'vue'
import {createError} from './error'

export const FORM_INJECTION_KEY = Symbol()

export function defineFormComponent<V extends Values = Values, P extends Primitives = Primitives>() {
	return defineComponent({
		name: 'Form',

		props: {
			form: {
				type: Object as PropType<Formulier<V, P>>,
				required: true,
			},
		},

		emits: {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			submit: (values: V) => true,
		},

		setup(props, {slots, emit}) {
			provide(FORM_INJECTION_KEY, props.form)

			const onSubmit = () => {
				const valid = props.form.validateFields()
				if (valid) {
					emit('submit', props.form.getState().values as V)
				}

				props.form.incrementSubmitCount()
			}

			return () => h('form', {onSubmit: withModifiers(onSubmit, ['prevent'])}, slots.default?.())
		},
	})
}

export function useFormInstance<V extends Values, P extends Primitives = Primitives>() {
	const form = inject(FORM_INJECTION_KEY) as Formulier<V, P> | undefined
	if (!form) {
		throw createError(
			'useFormInstance()',
			'Cannot use `useFormInstance` outside of `Form` component. (`defineFormComponent()`)',
		)
	}
	return form
}
