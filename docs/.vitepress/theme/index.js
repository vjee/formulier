import Theme from 'vitepress/theme'
import './vars.css'

import ReactComponent from '../react-component.vue'

export default {
	...Theme,
	enhanceApp({ app }) {
		app.component('react-component', ReactComponent)
	},
}
