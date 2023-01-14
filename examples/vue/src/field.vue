<script setup lang="ts">
defineProps<{
	name: string
	label: string
	error: string | null
	displayHorizontal?: boolean
}>()
</script>

<template>
	<div :class="{field: true, horizontal: displayHorizontal}">
		<label class="field-label" :for="name">{{ label }}</label>
		<div class="field-input"><slot /></div>
		<span v-if="error" class="field-error">{{ error }}</span>
	</div>
</template>
