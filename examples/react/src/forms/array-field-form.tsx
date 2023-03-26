import {FormProvider, useCreateForm, useFormFieldArray, useFormInstance, useSubmitHandler} from '@formulier/react'
import * as Field from '../fields'

interface FormState {
	galaxies: Galaxy[]
}

interface Galaxy {
	name: string
}

export function ArrayFieldForm() {
	const form = useCreateForm<FormState>({
		initialValues: {
			galaxies: [{name: 'Andromeda Galaxy'}, {name: 'Butterfly Galaxies'}],
		},
	})

	const onSubmit = useSubmitHandler(form, values => {
		alert(JSON.stringify(values, null, 2))
	})

	return (
		<div>
			<h1>ArrayFieldForm</h1>

			<form onSubmit={onSubmit}>
				<FormProvider form={form}>
					<Galaxies />

					<button type="submit">Submit</button>
				</FormProvider>
			</form>
		</div>
	)
}

function Galaxies() {
	const form = useFormInstance<FormState>()
	const [galaxies, {push, remove, move}] = useFormFieldArray(form, 'galaxies')

	return (
		<div className="column">
			<h2>Galaxies</h2>

			{galaxies.map((_, index) => {
				const handleUp = () => move(index, index - 1)
				const handleDown = () => move(index, index + 1)
				const handleRemove = () => remove(index)

				const canMoveUp = index > 0
				const canMoveDown = index < galaxies.length - 1

				return (
					<div className="box row" key={index}>
						<div className="column">
							<button type="button" onClick={handleUp} disabled={!canMoveUp}>
								⬆️
							</button>

							<button type="button" onClick={handleDown} disabled={!canMoveDown}>
								⬇️
							</button>

							<button type="button" onClick={handleRemove}>
								🗑
							</button>
						</div>

						<div className="column">
							<Field.TextField name={`galaxies[${index}].name`} label="Galaxy name" />
						</div>
					</div>
				)
			})}

			<button type="button" onClick={() => push({name: ''})}>
				➕ Add galaxy
			</button>
		</div>
	)
}
