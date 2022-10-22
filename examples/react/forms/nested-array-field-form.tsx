import { Form, useForm, useFormFieldArray, useFormFieldValue, useFormContext } from '@formulier/react'
import * as Field from '../Field'

interface Fiend {
	name: string
	age: number
	pets: Pet[]
}

interface Pet {
	name: string
}

interface FormState {
	friends: Fiend[]
}

export function NestedArrayFieldForm() {
	const form = useForm<FormState>({
		friends: [
			{ name: 'Peter', age: null, pets: [] },
			{ name: 'Freddy', age: 20, pets: [{ name: 'Alfred' }] },
		],
	})

	return (
		<div>
			<h1>NestedArrayFieldForm</h1>

			<Form form={form} onSubmit={values => alert(JSON.stringify(values, null, 2))}>
				<Friends />

				<button type="submit">Submit</button>
			</Form>
		</div>
	)
}

function Friends() {
	const form = useFormContext<FormState>()
	const [friends, { push, remove, move }] = useFormFieldArray(form, 'friends')

	return (
		<div className="column">
			<h2>Friends</h2>

			{friends.map((_, friendIndex) => {
				const handleUp = () => move(friendIndex, friendIndex - 1)
				const handleDown = () => move(friendIndex, friendIndex + 1)
				const handleRemove = () => remove(friendIndex)

				const canMoveUp = friendIndex > 0
				const canMoveDown = friendIndex < friends.length - 1

				return (
					<div className="box row" key={friendIndex}>
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
							<Field.TextField name={`friends[${friendIndex}].name`} label="Friend's name" />
							<Field.IntegerField name={`friends[${friendIndex}].age`} label="Friend's age" />
						</div>

						<Pets friendIndex={friendIndex} />
					</div>
				)
			})}

			<button type="button" onClick={() => push({ name: '', age: null, pets: [] })}>
				➕ Add galaxy
			</button>
		</div>
	)
}

function Pets({ friendIndex }: { friendIndex: number }) {
	const form = useFormContext<FormState>()
	const [pets, { push, remove, move }] = useFormFieldArray(form, `friends[${friendIndex}].pets`)

	return (
		<div className="column">
			<h3>Pets</h3>

			{pets.map((_, petIndex) => {
				const handleUp = () => move(petIndex, petIndex - 1)
				const handleDown = () => move(petIndex, petIndex + 1)
				const handleRemove = () => remove(petIndex)

				const canMoveUp = petIndex > 0
				const canMoveDown = petIndex < pets.length - 1

				return (
					<div className="box row" key={petIndex}>
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
							<Field.TextField name={`friends[${friendIndex}].pets[${petIndex}].name`} label="Friend's pet's name" />
						</div>
					</div>
				)
			})}

			<button type="button" onClick={() => push({ name: '' })}>
				➕ Add pet
			</button>
		</div>
	)
}
