<template>
	<div class="wrapper">
		<div class="header">
			<span class="title">Try out:</span>

			<button type="button" class="button" title="Reload" @click="onRefresh">
				<refresh-icon />
			</button>
		</div>

		<div ref="containerRef" class="container" id="react-root" />
	</div>
</template>

<script setup>
import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import RefreshIcon from './refresh-icon.vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
})

onMounted(() => {
	mountComponent()
})

onBeforeUnmount(() => {
	unmountComponent()
})

const components = import.meta.glob('../docs/react-components/*.tsx', { eager: true })
const containerRef = ref()
let reactRoot = null

function mountComponent() {
	const Component = components[`../docs/react-components/${props.name}.tsx`].default
	const rootElement = document.querySelector('#react-root')
	reactRoot = ReactDOMClient.createRoot(rootElement)
	reactRoot.render(React.createElement(Component))
}

function unmountComponent() {
	reactRoot?.unmount()
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
	padding: 24px;
}

.container :deep() {
	color: var(--vp-c-text-1);
	font-size: 14px;
}

.container :deep(label) {
	display: inline-block;
	width: 128px;
}

.container :deep(label)::after {
	content: ':';
}

.container :deep(input) {
	all: revert;
	margin-bottom: 8px;
	font-size: 14px;
}

.container :deep(button) {
	all: revert;
	margin-left: 128px;
	font-size: 14px;
}
</style>
