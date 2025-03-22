import * as React from 'react'
import {mount} from 'cypress/react'

import './commands.js'

declare var Cypress: any

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount
		}
	}
}

Cypress.Commands.add('mount', (element: React.ReactNode, options) => {
	return mount(<React.StrictMode>{element}</React.StrictMode>, options)
})
