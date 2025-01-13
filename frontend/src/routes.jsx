import Laytout from '@/component/Laytout'
import HomePage from '@/model/HomePage'
import { createBrowserRouter } from 'react-router-dom'
import Products from './model/Products'

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
				path: '/:id',
				element: <Products />,
			},
		],
	},
])

export default router
