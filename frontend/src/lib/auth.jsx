import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { createContext, useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { api as BaseApi } from '../api/api'
export const AuthContext = createContext()

const api = axios.create({
	baseURL: BaseApi, // Замените на свой API URL
})
export const AuthProvider = ({ children }) => {
	const queryClient = useQueryClient()

	const { data: user, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			const { data } = await api.get('/auth/me', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
			return data
		},
		enabled: !!localStorage.getItem('token'),
	})

	const loginMutation = useMutation({
		mutationFn: async ({ phone, password }) => {
			const { data } = await api.post('/auth/login', { phone, password })
			return data
		},
		onSuccess: data => {
			localStorage.setItem('token', data.accessToken)
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})

	const registerMutation = useMutation({
		mutationFn: async ({ phone, firstName, secondName, password }) => {
			const { data } = await api.post('/auth/register', {
				phone,
				firstName,
				secondName,
				password,
			})
			return data
		},
		onSuccess: data => {
			localStorage.setItem('token', data.accessToken)
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})

	const logoutMutation = useMutation({
		mutationFn: async () => {
			localStorage.removeItem('token')
			queryClient.removeQueries({ queryKey: ['user'] })
		},
	})

	return (
		<AuthContext.Provider
			value={{
				user,
				login: loginMutation.mutate,
				register: registerMutation.mutate,
				logout: logoutMutation.mutate,
				isLoading:
					isLoading || loginMutation.isLoading || registerMutation.isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

export const ProtectedRoute = () => {
	const { user, isLoading } = useAuth()

	if (isLoading) return <div>Loading...</div>

	if (!user) {
		return <Navigate to='/auth' replace />
	}

	return <Outlet />
}
