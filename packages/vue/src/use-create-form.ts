import {Formulier, FormulierOptions, Primitives, Values} from '@formulier/core'

export function useCreateForm<V extends Values, P extends Primitives = Primitives>(
	options: FormulierOptions<V, P>,
): Formulier<V, P> {
	return new Formulier(options)
}
