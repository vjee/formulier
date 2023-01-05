import './commands'
import * as React from 'react'
import {mount} from 'cypress/react18'

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			mount: typeof mount
		}
	}
}

Cypress.Commands.add('mount', (element: React.ReactNode, options) => {
	return mount(<React.StrictMode>{element}</React.StrictMode>, options)
})
