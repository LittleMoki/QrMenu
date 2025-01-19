import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { api } from './api'

export const useMenuItemData = () => {
	return useQuery({
		queryKey: ['menuItem'],
		queryFn: () => axios.get(`${api}/menu-item`),
		select: data => data.data,
	})
}

export const useMenuItemMutationPost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['menuItemPost'],
		mutationFn: data => axios.post(`${api}/menu-item`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries(['menuItem'])
		},
	})
}

export const useMenuItemMutationPut = menuId => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['menuItemPut'],
		mutationFn: data => axios.put(`${api}/menu-item/${menuId}`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries(['menuItem'])
		},
	})
}

export const useMenuItemMutationDelete = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['menuItemDelete'],
		mutationFn: menuId => axios.delete(`${api}/menu-item/${menuId}`),
		onSuccess: () => {
			queryClient.invalidateQueries(['menuItem'])
		},
	})
}
