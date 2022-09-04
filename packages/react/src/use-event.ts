import { useCallback, useLayoutEffect, useRef } from 'react'

export function useEvent<Handler extends CallableFunction>(handler: Handler) {
	const handlerRef = useRef(handler)
	useLayoutEffect(() => {
		handlerRef.current = handler
	})
	return useCallback((...args: any[]) => {
		const fn = handlerRef.current
		return fn(...args)
	}, []) as unknown as Handler
}
