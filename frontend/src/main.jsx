import { NextUIProvider } from '@nextui-org/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routes.jsx'

// Рендерим приложение
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	</StrictMode>
)
