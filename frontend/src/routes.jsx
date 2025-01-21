import Laytout from '@/component/Laytout'
import HomePage from '@/model/HomePage'
import { createBrowserRouter } from 'react-router-dom'
import Cart from './component/Cart'
import LayoutSetting from './component/LayoutSetting'
import Products from './model/Products'
import QrCodePage from './model/QrCodePage'
import SettingsPage from './model/SettingsPage'

const router = createBrowserRouter([
	{
		path: '/', // Add this line to match the root path
		element: <Laytout />,
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
	{
		path: '/',
		element: <LayoutSetting />,
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
])

export default router
