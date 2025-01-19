import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { api } from './api'

export const useMenuData = () => {
	return useQuery({
		queryKey: ['menu'],
		queryFn: () => axios.get(`${api}/menu`),
		select: data => data.data,
	})
}

export const useMenuDataMutationPost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['menuPost'],
		mutationFn: data => axios.post(`${api}/menu`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries({ queryKey: ['menu'] })
		},
	})
}

export const useMenuDataMutationPut = menuId => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['menuPut'],
		mutationFn: data => axios.put(`${api}/menu/${menuId}`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries({ queryKey: ['menu'] })
		},
	})
}

export const useMenuDataMutationDelete = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['menuDelete'],
		mutationFn: menuId => axios.delete(`${api}/menu/${menuId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['menu'] })
		},
	})
}
