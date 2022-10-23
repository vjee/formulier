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

if (import.meta.vitest) {
	const { describe, it, expect } = import.meta.vitest

	;(async () => {
		const { renderHook } = await import('@testing-library/react')
		const { useFormField } = await import('.')

		const INITIAL_VALUES = { a: { b: { c: 'c', d: 'd' } } }

		describe('useForm', () => {
			const { result } = renderHook(() => useForm(INITIAL_VALUES))

			it('renders hook', () => {
				expect(result.current.getState).toBeDefined()
			})

			it('unregisters field values when unmounted', () => {
				const { rerender: fieldRerender, unmount: fieldUnmount } = renderHook(
					options => useFormField(result.current, options),
					{ initialProps: { name: 'a.b.c' } },
				)
				expect(result.current.getState().values.a.b.c).toBe('c')
				fieldRerender({ name: 'a.b.d' })
				expect(result.current.getState().values.a.b.c).toBe(undefined)
				expect(result.current.getState().values.a.b.d).toBe('d')
				fieldUnmount()
				expect(result.current.getState().values.a.b.d).toBe(undefined)
			})
		})
	})()
}
