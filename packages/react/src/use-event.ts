import * as React from 'react'

export function useEvent<Handler extends CallableFunction>(handler: Handler) {
	const handlerRef = React.useRef(handler)
	handlerRef.current = handler
	return React.useCallback((...args: any[]) => {
		const fn = handlerRef.current
		return fn(...args)
	}, []) as unknown as Handler
}
