<script setup lang="ts">
import {defineFormComponent, useCreateForm, useFormFieldArray} from '@formulier/vue'
import TextField from '../text-field.vue'

interface FormState {
	galaxies: Galaxy[]
}

interface Galaxy {
	name: string
}

const Form = defineFormComponent<FormState>()
const form = useCreateForm<FormState>({
	initialValues: {
		galaxies: [],
	},
})
const [galaxies, {push, remove, move}] = useFormFieldArray(form, 'galaxies')

function onSubmit(values: FormState) {
	return alert(JSON.stringify(values, null, 2))
}
</script>

<template>
	<div>
		<h1>ArrayFieldForm</h1>

		<Form :form="form" @submit="onSubmit">
			<div className="column">
				<h2>Galaxies</h2>

				<div v-for="(_, index) of galaxies" className="box row" key="{index}">
					<div className="column">
						<button type="button" @click="() => move(index, index - 1)" :disabled="index <= 0">⬆️</button>

						<button type="button" @click="() => move(index, index + 1)" :disabled="index >= galaxies.length - 1">
							⬇️
						</button>

						<button type="button" @click="() => remove(index)">🗑</button>
					</div>

					<div className="column">
						<TextField :name="`galaxies[${index}].name`" label="Galaxy name" />
					</div>
				</div>

				<button type="button" @click="() => push({name: ''})">➕ Add galaxy</button>
			</div>

			<button type="submit">Submit</button>
		</Form>
	</div>
</template>
