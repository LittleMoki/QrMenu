import Laytout from '@/component/Laytout'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/model/HomePage'

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
				path: 'about',
				element: <h1>About Page</h1>,
			},
		],
	},
])

export default router
