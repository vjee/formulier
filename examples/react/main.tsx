import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, NavLink, Outlet, Navigate, RouteObject } from 'react-router-dom'
import { PersonForm } from './forms/person-form'
import { SwitchFieldTypeForm } from './forms/switch-field-type-form'
import { CheckboxForm } from './forms/checkbox-form'
import { SelectForm } from './forms/select-form'
import { ArrayFieldForm } from './forms/array-field-form'
import { NestedArrayFieldForm } from './forms/nested-array-field-form'
import { ToggleFieldsForm } from './forms/toggle-fields-form'

createRoot(document.querySelector('#root')!).render(<App />)

const formRoutes: RouteObject[] = [
	{ path: 'person-form', element: <PersonForm /> },
	{ path: 'switch-field-type-form', element: <SwitchFieldTypeForm /> },
	{ path: 'checkbox-form', element: <CheckboxForm /> },
	{ path: 'select-form', element: <SelectForm /> },
	{ path: 'array-field-form', element: <ArrayFieldForm /> },
	{ path: 'nested-array-field-form', element: <NestedArrayFieldForm /> },
	{ path: 'toggle-fields-form', element: <ToggleFieldsForm /> },
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
								{({ isActive }) => (
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
