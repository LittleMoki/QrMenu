import HomePage from '@/model/HomePage'
import { createBrowserRouter } from 'react-router-dom'
import Cart from './component/Cart'
import LayoutSetting from './component/LayoutSetting'
import Layout from './component/Laytout'
import {
	AuthProvider,
	ProtectedRoute,
	ProtectedUsersAndComponents,
} from './lib/auth'
import Auth from './model/Auth'
import Products from './model/Products'
import SettingsPage from './model/SettingsPage'

const router = createBrowserRouter([
	{
		path: '/', // Add this line to match the root path
		element: (
			<AuthProvider>
				<Layout />
			</AuthProvider>
		),
		children: [
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: '/', // Set a child route for the root path
						element: <HomePage />,
					},
					{
						path: '/cart',
						element: <Cart />,
					},
					{
						path: '/:id',
						element: <Products />,
					},
				],
			},
		],
	},
	{
		path: '/',
		element: (
			<AuthProvider>
				<LayoutSetting />
			</AuthProvider>
		),
		children: [
			{
				element: <ProtectedRoute />,
				children: [
					{
						path: '/settings',
						element: <SettingsPage />,
					},
				],
			},
			{
				element: <ProtectedUsersAndComponents />,
				children: [
					{
						path: '/users',
						element: <h1>Пользователи</h1>,
					},
					{
						path: '/components',
						element: <h1>Компоненты</h1>,
					},
				],
			},
			{
				path: '/auth',
				element: <Auth />,
			},
		],
	},
])

export default router
