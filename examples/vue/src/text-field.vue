<script setup lang="ts">
import {useFormField, useFormInstance} from '@formulier/vue'
import Field from './field.vue'

const props = defineProps<{name: string; label: string}>()

const form = useFormInstance()
const [field, meta] = useFormField(form, {name: props.name})

const {id, value, onBlur} = field
const {error} = meta
</script>

<template>
	<Field :name="name" :label="label" :error="error">
		<input type="text" :id="id" v-model="value" @blur="onBlur" />
	</Field>
</template>
