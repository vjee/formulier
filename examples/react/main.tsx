import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, NavLink, Outlet, Navigate, RouteObject } from 'react-router-dom'
import { PersonForm } from './forms/person-form'
import { SwitchFieldTypeForm } from './forms/switch-field-type-form'
import { ArrayFieldForm } from './forms/array-field-form'
import { NestedArrayFieldForm } from './forms/nested-array-field-form'

createRoot(document.querySelector('#root')!).render(<App />)

const formRoutes: RouteObject[] = [
	{ path: 'person-form', element: <PersonForm /> },
	{ path: 'switch-field-type-form', element: <SwitchFieldTypeForm /> },
	{ path: 'array-field-form', element: <ArrayFieldForm /> },
	{ path: 'nested-array-field-form', element: <NestedArrayFieldForm /> },
]

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Navigate to={formRoutes[0].path} />,
			},
			...formRoutes,
		],
	},
]

const router = createBrowserRouter(routes)

function App() {
	return (
		<StrictMode>
			<RouterProvider router={router}></RouterProvider>
		</StrictMode>
	)
}

function Root() {
	return (
		<>
			<aside>
				<ul>
					{formRoutes.map(route => (
						<li key={route.path}>
							<NavLink to={route.path}>
								{({ isActive }) => (
									<>
										{isActive && '➡️ '}
										{route.path.split('-').join(' ')}
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
