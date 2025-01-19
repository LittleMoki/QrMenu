import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { api } from './api'

export const useMenuCategoryData = () => {
	return useQuery({
		queryKey: ['menuCategory'],
		queryFn: () => axios.get(`${api}/menu-category`),
		select: data => data.data,
	})
}

export const useMenuCategoryDataById = id => {
	return useQuery({
		queryKey: ['menuCategoryGetId'],
		queryFn: () => axios.get(`${api}/menu-category/${id}`),
		select: data => data.data,
	})
}

export const useMenuCategoryDataMutationPost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['menuCategoryPost'],
		mutationFn: data => axios.post(`${api}/menu-category`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries({ queryKey: ['menuCategory'] })
		},
	})
}

export const useMenuCategoryDataMutationPut = menuId => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['menuCategoryPut'],
		mutationFn: data => axios.put(`${api}/menu-category/${menuId}`, data),
		onSuccess: () => {
			// Используем queryClient для вызова invalidateQueries
			queryClient.invalidateQueries({
				queryKey: ['menuCategory'],
			})
			queryClient.invalidateQueries({
				queryKey: ['menuCategoryGetId'],
			})
		},
	})
}

export const useMenuCategoryDataMutationDelete = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['menuCategoryDelete'],
		mutationFn: menuId => axios.delete(`${api}/menu-category/${menuId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['menuCategory'] })
		},
	})
}
