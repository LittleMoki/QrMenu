import HomePage from '@/model/HomePage'
import { createBrowserRouter } from 'react-router-dom'
import Auth from './model/Auth'
import Cart from './component/Cart'
import LayoutSetting from './component/LayoutSetting'
import Layout from './component/Laytout'
import { AuthProvider, ProtectedRoute } from './lib/auth'
import Products from './model/Products'
import QrCodePage from './model/QrCodePage'
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
						path: '/qrcode',
						element: <QrCodePage />,
					},
					{
						path: '/settings',
						element: <SettingsPage />,
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
