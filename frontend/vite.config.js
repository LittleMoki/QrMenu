import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '0.0.0.0', // Позволяет доступ со всех устройств
		port: 5173,
		proxy: {
			'/api': {
				target: 'http://31.128.46.248:3000', // Backend адрес
				changeOrigin: true,
				secure: false,
			},
		},
	},
})
