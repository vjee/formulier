<template>
	<div class="wrapper">
		<div class="header">
			<span class="title">Live Result:</span>

			<button type="button" class="button" title="Reload" @click="onRefresh">
				<refresh-icon />
			</button>
		</div>

		<div ref="containerRef" class="container" :id="ROOT_ID" />
	</div>
</template>

<script setup>
import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { defineProps, ref, onMounted, onBeforeUnmount, markRaw } from 'vue'
import RefreshIcon from './refresh-icon.vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
})

const components = import.meta.glob('./react-components/*.tsx', { eager: true })

const ROOT_ID = 'react-root'

const reactRootRef = ref()
const containerRef = ref()

onMounted(() => {
	mountComponent()
})

onBeforeUnmount(() => {
	unmountComponent()
})

function mountComponent() {
	const Component = components[`./react-components/${props.name}.tsx`].default
	const rootElement = document.querySelector('#' + ROOT_ID)
	const reactRoot = ReactDOMClient.createRoot(rootElement)
	reactRoot.render(React.createElement(Component))
	reactRootRef.value = markRaw(reactRoot)
}

function unmountComponent() {
	reactRootRef.value?.unmount()
}

function onRefresh() {
	if (containerRef.value) {
		const { height } = containerRef.value.getBoundingClientRect()
		containerRef.value.style.setProperty('height', `${height}px`)
	}

	unmountComponent()
	mountComponent()

	setTimeout(() => {
		if (containerRef.value) {
			containerRef.value.style.removeProperty('height')
		}
	}, 10)
}
</script>

<style scoped>
.wrapper {
	margin: 16px 0;
}

.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 8px;
}

.button {
	color: var(--vp-c-text-2);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border-radius: 8px;
	border: 1px solid var(--vp-c-divider);
	transition: border-color 0.25s;
}

.button:hover {
	border-color: var(--vp-c-brand);
}

.title {
	color: var(--vp-c-text-1);
	font-weight: bold;
	display: block;
}

.container {
	background-color: var(--vp-c-bg-alt);
	border-radius: 8px;
	padding: 16px;
}

.container :deep() {
	color: var(--vp-c-text-1);
}

.container :deep(label) {
	display: inline-block;
	width: 128px;
}

.container :deep(input) {
	border: 1px solid;
	margin-bottom: 8px;
	padding: 4px 8px;
}

.container :deep(button) {
	border: 1px solid;
	padding: 4px 8px;
}
</style>
