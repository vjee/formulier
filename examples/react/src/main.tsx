import * as React from 'react'
import {createRoot} from 'react-dom/client'
import type {RouteObject} from 'react-router-dom'
import {createBrowserRouter, RouterProvider, NavLink, Outlet, Navigate} from 'react-router-dom'
import {PersonForm} from './forms/person-form'
import {ValidationForm} from './forms/validation-form'
import {SwitchFieldTypeForm} from './forms/switch-field-type-form'
import {CheckboxForm} from './forms/checkbox-form'
import {SelectForm} from './forms/select-form'
import {ArrayFieldForm} from './forms/array-field-form'
import {NestedArrayFieldForm} from './forms/nested-array-field-form'
import {ToggleFieldsForm} from './forms/toggle-fields-form'
import {DelayedInitialValuesForm} from './forms/delayed-initial-values-form'

createRoot(document.querySelector('#root')!).render(<App />)

const formRoutes: RouteObject[] = [
	{path: 'person-form', element: <PersonForm />},
	{path: 'validation-form', element: <ValidationForm />},
	{path: 'switch-field-type-form', element: <SwitchFieldTypeForm />},
	{path: 'checkbox-form', element: <CheckboxForm />},
	{path: 'select-form', element: <SelectForm />},
	{path: 'array-field-form', element: <ArrayFieldForm />},
	{path: 'nested-array-field-form', element: <NestedArrayFieldForm />},
	{path: 'toggle-fields-form', element: <ToggleFieldsForm />},
	{path: 'delayed-initial-values-form', element: <DelayedInitialValuesForm />},
]

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Navigate to={formRoutes[0].path!} />,
			},
			...formRoutes,
		],
	},
]

const router = createBrowserRouter(routes)

function App() {
	return (
		<React.StrictMode>
			<RouterProvider router={router}></RouterProvider>
		</React.StrictMode>
	)
}

function Root() {
	return (
		<>
			<aside>
				<ul>
					{formRoutes.map(route => (
						<li key={route.path}>
							<NavLink to={route.path!}>
								{({isActive}) => (
									<>
										{isActive && '➡️ '}
										{route.path!.split('-').join(' ')}
									</>
								)}
							</NavLink>
						</li>
					))}
				</ul>
			</aside>

			<main>
				<Outlet />
			</main>
		</>
	)
}
