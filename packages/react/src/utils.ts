import * as React from 'react'

function useEvent<Handler extends (...args: any[]) => void>(handler: Handler) {
	const handlerRef = React.useRef(handler)
	handlerRef.current = handler
	return React.useCallback((...args: any[]) => {
		const fn = handlerRef.current
		return fn(...args)
	}, []) as unknown as Handler
}

function invariant(condition: unknown, message: string): asserts condition {
	if (!condition) throw new Error(`@formulier/react ${message}`)
}

export {useEvent, invariant}
